import type { CanvasRectangle } from "../../interface/canvas-item";

const Rectangle = ({ canvasItem }: {
  canvasItem: CanvasRectangle,
}) => {
  return (
    <path 
      d={
        `M 0 0 ` +
        `L ${canvasItem.width} 0 ` +
        `L ${canvasItem.width} ${canvasItem.height} ` +
        `L 0 ${canvasItem.height}` +
        `L 0 0 Z`
      }
      fill={canvasItem.fillColor}
      stroke={canvasItem.strokeColor}
      strokeWidth={canvasItem.strokeWidth}
    />
  );
}
 
export default Rectangle;