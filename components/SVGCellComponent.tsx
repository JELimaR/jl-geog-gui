import IDrawingParameters from '../Logic/AbstractDrawing/IDrawingParameters';
import Point from '../Logic/BuildingModel/Geom/Point';
import JCell from '../Logic/BuildingModel/Voronoi/JCell';


interface ISVGCellComponentProps {
	cell: JCell;
	func: (c: JCell) => IDrawingParameters;
}
const SVGCellComponent = (props: ISVGCellComponentProps) => {
	const ide: IDrawingParameters = props.func(props.cell);
	const pointsString: string = props.cell.voronoiVertices.map((p: Point) => `${p.x}, ${p.y}`).join(' ');

	return (
		<polygon fill= { ide.fillColor } points = { pointsString } />
	)
}

export default SVGCellComponent;