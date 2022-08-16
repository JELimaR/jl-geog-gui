import React, { ReactNode } from 'react';

export class Viewbox {
  constructor(
    private _xmin: number,
    private _ymin: number,
    private _xmax: number,
    private _ymax: number,
  ) { }

  get xmin(): number { return this._xmin }
  get ymin(): number { return this._ymin }

  get xwin(): number { return this._xmax - this._xmin }
  get ywin(): number { return this._ymax - this._ymin }

  getString(): string {
    return `${this._xmin} ${this._ymin} ${this.xwin} ${this.ywin}`
  }
}

interface ISVGComponentProps {
  handleClickFunc: (p: SVGPoint) => void;
  children: ReactNode[];
  viewbox: Viewbox;
  hrefImage?: string;
  size: {
    width: number;
    height: number;
  }
}
const SVGComponent = (props: ISVGComponentProps) => {

  const handleClickInSVG = (e: any /*React.MouseEvent<SVGElement>*/) => {
    e.preventDefault();
    let pt: SVGPoint = e.currentTarget.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    let cursorpt = pt.matrixTransform(e.currentTarget.getScreenCTM().inverse());
    // console.log(cursorpt)
    props.handleClickFunc(cursorpt);
  };

  return (
    <svg
      viewBox={props.viewbox.getString()}
      width={props.size.width}
      height={props.size.height}
      onClick={handleClickInSVG}
    >
      <polygon points="-180,-90 -180,90 180,90 180,-90 " fill={'#00000010'} />
      {
        props.hrefImage &&
        <image
          x={props.viewbox.xmin}
          y={props.viewbox.ymin}
          width={props.viewbox.xwin}
          height={props.viewbox.ywin}
          href={props.hrefImage}
        />
      }
      {props.children}
    </svg>
  );
};

export default SVGComponent;
