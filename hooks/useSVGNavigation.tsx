import React from 'react';
import { IAPanzoom } from '../Logica/Drawing/APanzoom';
import SVGPanzoom from '../Logica/SVGDrawing/SVGPanzoom';

/**
 * usar timer para el double click
 */
export type TypeZoom = '+' | '-';
export type TypePan = 'r' | 'l' | 't' | 'b';

interface ISVGNavigation {
  viewBox: string;
  handleZoomButtons: (tz: TypeZoom) => void;
  handlePanButtons: (tp: TypePan) => void;
  handleWheel: (e: any) => void;
  handleDoubleClick: (e: any) => void;
  /*
  handelOnMouseDown: (e: any) => void;
  handelOnMouseUp: (e: any) => void;
  handelOnMouseMove: (e: any) => void;
  */
}
const useSVGNavigation = (panzoom: SVGPanzoom): ISVGNavigation => {
  const [panning, setPanning] = React.useState<boolean>(false);
  const [iniPos, setIniPos] = React.useState({ x: 0, y: 0 });
  const initViewBox: React.MutableRefObject<IAPanzoom> =
    React.useRef<IAPanzoom>({
      zoom: panzoom.zoom,
      center: { x: panzoom.centerX, y: panzoom.centerY },
    });
  const [viewBox, setViewBox] = React.useState<string>(panzoom.getViewBox());

  const handleZoomButtons = (tz: TypeZoom) => {
    if (tz === '+') {
      panzoom.zoomValue++;
    } else if (tz === '-') {
      panzoom.zoomValue--;
    }
    updatePanzoom();
    console.log('new', panzoom);
  };

  const handlePanButtons = (tp: TypePan) => {
    switch (tp) {
      case 't':
        panzoom.centerY -= panzoom.getYstep();
        break;
      case 'b':
        panzoom.centerY += panzoom.getYstep();
        break;
      case 'l':
        panzoom.centerX -= panzoom.getXstep();
        break;
      case 'r':
        panzoom.centerX += panzoom.getXstep();
        break;
      default:
        break;
    }
    updatePanzoom();
    console.log('new', panzoom);
  };

  const getPointFromMouseEvent = (e: any): { x: number; y: number } => {
    let pt: SVGPoint = e.currentTarget.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let center = pt.matrixTransform(e.currentTarget.getScreenCTM().inverse());
    return { x: center.x, y: center.y };
  };
  const handleWheel = (e: any /*React.MouseEvent<SVGElement>*/) => {
    let center = getPointFromMouseEvent(e);
    const curr: number = panzoom.zoom;
    panzoom.zoomValue -= Math.round(e.deltaY / 266.6);
    if (curr !== panzoom.zoom) {
      panzoom.centerX = center.x;
      panzoom.centerY = center.y;
    }
    updatePanzoom();
    console.log('new', panzoom);
  };

  const handleDoubleClick = (e: any /*React.MouseEvent<SVGElement>*/) => {
    e.preventDefault();
    panzoom.zoomValue = initViewBox.current.zoom;
    panzoom.centerX = initViewBox.current.center.x;
    panzoom.centerY = initViewBox.current.center.y;
    updatePanzoom();
  };

  /*
  const handelOnMouseDown = (e: any) => {
    e.preventDefault();
    getPointFromMouseEvent(e);
    setIsPanning(true);
    setIniPos({ x: e.clientX, y: e.clientY });
    console.log('down', { x: e.clientX, y: e.clientY });
  };

  const handelOnMouseUp = (e: any) => {
    console.log('up', { x: e.clientX, y: e.clientY });
    e.preventDefault();
    panzoom.centerX -= (e.clientX - iniPos.x) / 4;
    panzoom.centerY -= (e.clientY - iniPos.y) / 4;
    updatePanzoom();
    console.log('new', panzoom);
    setIsPanning(false);
    setIniPos({ x: 0, y: 0 });
  };

  const handelOnMouseMove = (e: any) => {
    if (isPanning) {
      console.log('move');

      panzoom.centerX -= (e.clientX - iniPos.x) / 4;
      panzoom.centerY -= (e.clientY - iniPos.y) / 4;
      updatePanzoom();
      console.log('new', panzoom);
    }
  };
  */

  const updatePanzoom = () => {
    setViewBox(panzoom.getViewBox());
  };

  return {
    viewBox,
    handlePanButtons,
    handleZoomButtons,
    handleWheel,
    handleDoubleClick,
  };
};

export default useSVGNavigation;