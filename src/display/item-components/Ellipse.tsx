import type { CanvasEllipse } from "../../interface/canvas-item";

const Ellipse = ({ canvasItem }: {
  canvasItem: CanvasEllipse,
}) => {
  return (
    <path 
      d={
        `M 0 ${canvasItem.height/2} ` +
        `A ${canvasItem.width/2} ${canvasItem.height/2} 0 0 0 ${canvasItem.width} ${canvasItem.height/2} ` +
        `A ${canvasItem.width/2} ${canvasItem.height/2} 0 0 0 0 ${canvasItem.height/2} Z`
      }
      fill={canvasItem.fillColor}
      stroke={canvasItem.strokeColor}
      strokeWidth={canvasItem.strokeWidth}
    />
  );
}
 
export default Ellipse;