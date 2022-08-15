
import JDiagram from "../../BuildingModel/Voronoi/JDiagram";
import InformationFilesManager from '../../DataFileLoadAndSave/InformationFilesManager';
import JCell from "../../BuildingModel/Voronoi/JCell";
import MapGenerator from "../MapGenerator";
import Point from "../../BuildingModel/Geom/Point";
import NaturalMap from "../../BuildingModel/NaturalMap";
import IslandMap from "../../BuildingModel/MapContainerElements/Natural/IslandMap";
import RegionMap from "../../BuildingModel/MapContainerElements/RegionMap";
import PriorityQueue from "../../BuildingModel/Geom/PriorityQueue";
import RandomNumberGenerator from "../../BuildingModel/Geom/RandomNumberGenerator";
import JCellClimate from "../../BuildingModel/Voronoi/CellInformation/JCellClimate";

let totalAreaMedia = 0;

const cellCostCalc = (cell: JCell): number => {
  const randFunc = RandomNumberGenerator.makeRandomFloat(cell.id)
  if (cell.info.cellHeight.heightType !== 'land')
    return Infinity;
  return (1 - cell.info.cellClimate.annualPrecip / JCellClimate.maxAnnual) * 0.5 +
    Math.abs(cell.info.cellClimate.tmed - 10) / 40 * 0.5 + 0.01 * randFunc();
}

const cellComparatorMinorCost = (a: JCell, b: JCell) => cellCostCalc(a) - cellCostCalc(b);

export default class InitCultureMapGenerator extends MapGenerator<RegionMap[]> {
  /*private*/ _initCells: JCell[] = [];
  constructor(d: JDiagram) {
    super(d);
  }

  generate(nm: NaturalMap): RegionMap[] {
    // const dim = InformationFilesManager.instance;

    let out: RegionMap[] = [];

    console.log('calculate and setting cultures')
    console.time(`set initial Cultures`);

    nm.diagram.forEachCell((c: JCell) => totalAreaMedia += c.areaSimple);

    const cellsOpts: JCell[] = [];
    nm.islands.forEach((isl: IslandMap) => {
      if (isl.area >= 1000000) {
        isl.forEachCell((c: JCell) => cellsOpts.push(c));
      }
    })

    out = this.generateCulturesList(cellsOpts);

    console.timeEnd(`set initial Cultures`);
    return out;
  }

  private generateCulturesList(cellsOpts: JCell[]): RegionMap[] {
    this.setInitCells(cellsOpts);
    const out: RegionMap[] = [];
    this._initCells.forEach((ic: JCell) => {
      const cul = new RegionMap(this.diagram);
      out.push(cul);
      cul.addCell(ic);
      ic.mark();
    })

    for (let i = 1; i < 800; i++) {
      out.forEach((cul: RegionMap) => {
        const pq = new PriorityQueue<JCell>(cellComparatorMinorCost);
        cul.getNeightboursCells().forEach((cell: JCell) => {
          if (cell.info.isLand) pq.add(cell);
        })
        let ncell1 = pq.poll() as JCell;
        while (!pq.isEmpty() && ncell1.isMarked()) {
          ncell1 = pq.poll() as JCell;
        }
        if (!ncell1.isMarked()) cul.addCell(ncell1);
        ncell1.mark();
      })
    }

    this.diagram.dismarkAllCells();

    return out;
  }

  private setInitCells(options: JCell[]) {
    console.log(totalAreaMedia)
    for (let i = 0; i < 12; i++) {
      let minCost = Infinity;
      let cellMinCost = options[0];
      options.forEach((c: JCell) => {
        const cellCost = this.evalCellCostForInitCulture(c);
        if (cellCost < minCost) {
          minCost = cellCost;
          cellMinCost = c;
        }
      })
      this._initCells.push(cellMinCost);
    }
  }

  private evalCellCostForInitCulture(cell: JCell): number {
    const dist = this.calcMinDistanceFromInitCells(cell);
    return (dist === Infinity ? 0 : (21000 - dist) / 21000) * 0.9 + cellCostCalc(cell) * 0.1;
  }

  private calcMinDistanceFromInitCells(cell: JCell): number {
    let out = Infinity;
    this._initCells.forEach((ic: JCell) => {
      const dist = Point.geogDistance(ic.center, cell.center); // ver que distancia usar
      if (dist < out)
        out = dist
    })
    return out;
  }

}