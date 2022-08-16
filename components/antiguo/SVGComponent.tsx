import chroma from 'chroma-js';
import SVGCellComponent from './SVGCellComponent';

import useSVGNavigation from '../../hooks/useSVGNavigation';
import SVGNavigationComponent from './SVGNavigationComponent';
import SVGDrawingMap from '../../Logic/SVGDrawing/SVGDrawingMap';
import Point from '../../Logic/BuildingModel/Geom/Point';
import JCell from '../../Logic/BuildingModel/Voronoi/JCell';
import React from 'react';
// import axios from 'axios';


const colorScale: chroma.Scale = chroma.scale('Spectral').domain([1, 0]);

const sdm: SVGDrawingMap = new SVGDrawingMap(new Point(360, 180));

interface ISVGComponentProps {
  SIZE: Point;
  handleClickFunc: (p: Point) => void;
	cellArr: JCell[];
}
const SVGComponent = (props: ISVGComponentProps) => {
  let navigation = useSVGNavigation(sdm.panzoom);
  // const [cellArr, setCellArr] = useState<JCell[]>([]);

  /*
  console.log(panzoom);
  console.log(panzoom.scale);
  console.log(
    'pointsBuffCenterLimits',
    panzoom.pointsBuffCenterLimits.map((p: JPoint) => p.toSVGString())
  );
  console.log(
    'pointsBuffDrawLimits',
    panzoom.pointsBuffDrawLimits.map((p: JPoint) => p.toSVGString())
  );
  */

  // const cellArr: JCell[] = [...jwm.diagram.cells.values()];

  const handleClickInSVG = (e: any /*React.MouseEvent<SVGElement>*/) => {
    e.preventDefault();
    let pt: SVGPoint = e.currentTarget.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let cursorpt = pt.matrixTransform(e.currentTarget.getScreenCTM().inverse());
    props.handleClickFunc(new Point(cursorpt.x, cursorpt.y));
  };

  return (
    <React.Fragment>
      <svg
        viewBox={navigation.viewBox}
        width={props.SIZE.x}
        height={props.SIZE.y}
        onDoubleClick={navigation.handleDoubleClick}
        onClick={handleClickInSVG}
        onWheel={navigation.handleWheel}
      >
        <polygon points="-180,-90 -180,90 180,90 180,-90 " fill={'#00000010'} />
        {props.cellArr.map((cell: JCell) => {
          /*
          if (!sdm.panzoom.isCellIn(cell)) {
            return;
          }
          */
          return (
            <SVGCellComponent
              key={cell.id}
              cell={cell}
              func={(cell: JCell) => {
                // let h = Math.round(cell.height * 20) / 20;
                const color = chroma.random().hex();
                return {
                  fillColor: color,
                  strokeColor: color,
                };
              }}
            />
          );
        })}
        {/*<polygon
        points={panzoom.pointsBuffDrawLimits
          .map((p: JPoint) => p.toSVGString())
          .join(' ')}
        fill={'none'}
        stroke={'#FF0000'}
        />*/}
        {/*<polygon
        points={panzoom.pointsBuffCenterLimits
          .map((p: JPoint) => p.toSVGString())
          .join(' ')}
        fill={'none'}
        stroke={'#0000FF'}
        />*/}
      </svg>
      <SVGNavigationComponent
        handlePan={navigation.handlePanButtons}
        handleZoom={navigation.handleZoomButtons}
      />
    </React.Fragment>
  );
};

export default SVGComponent;
