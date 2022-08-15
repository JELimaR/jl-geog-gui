import { NextPage } from "next";
import SVGComponent from "../components/SVGComponent";
import Point from "../Logic/BuildingModel/Geom/Point";
import JDiagram, { IJDiagramInfo, LoaderDiagram } from "../Logic/BuildingModel/Voronoi/JDiagram";
import VoronoiDiagramCreator from "../Logic/GACServer/GACVoronoi/VoronoiDiagramCreator";

const TAM: number = 580;
const SIZE: Point = new Point(TAM, TAM / 2);

const handleClickFunc = (p: Point) => {
	console.log(p);
};

interface IMapaProps {
	diag: IJDiagramInfo
}
const Mapa = (props: IMapaProps) => {

	const ld: LoaderDiagram = new LoaderDiagram(props.diag.cells, props.diag.edges, props.diag.vertices);
	console.log(ld.cells.length)
	const diag: JDiagram = new JDiagram(ld);
	const cellsArr = [...diag.cells.values()];

	return (
		<div>
			<h1>Mapa</h1>
			<SVGComponent SIZE={SIZE} handleClickFunc={handleClickFunc} cellArr={cellsArr} />
		</div>
	)

}

export const getServerSideProps = () => {
	const vdc = new VoronoiDiagramCreator();
	const diagram = vdc.createRandomDiagram(10000);
	return {
		props: {
			diag: diagram.getInterface()
		}
	}
}

export default Mapa;