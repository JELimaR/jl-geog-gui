import { TypePan, TypeZoom } from '../hooks/useSVGNavigation';

interface ISVGNavigationComponentProps {
  handleZoom: (tz: TypeZoom) => void;
  handlePan: (tp: TypePan) => void;
}

const SVGNavigationComponent = (props: ISVGNavigationComponentProps) => {
  return (
  <svg>
    <path
      className="button"
      onClick={() => props.handlePan('t')}
      d="M25 5 l6 10 a20 35 0 0 0 -12 0z"
    />
    <path
      className="button"
      onClick={() => props.handlePan('l')}
      d="M5 25 l10 -6 a35 20 0 0 0 0 12z"
    />
    <path
      className="button"
      onClick={() => props.handlePan('b')}
      d="M25 45 l6 -10 a20, 35 0 0,1 -12,0z"
    />
    <path
      className="button"
      onClick={() => props.handlePan('r')}
      d="M45 25 l-10 -6 a35 20 0 0 1 0 12z"
    />

    <circle
      className="button"
      cx="25"
      cy="20.5"
      r="4"
      onClick={() => props.handleZoom('+')}
    />
    <circle
      className="button"
      cx="25"
      cy="29.5"
      r="4"
      onClick={() => props.handleZoom('-')}
    />
  </svg>)
}

export default SVGNavigationComponent;