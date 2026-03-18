import type { CanvasDButton } from "../../interface/canvas-item";

const DButton = ({canvasItem }: {
  canvasItem: CanvasDButton
}) => {
  return (
    <path 
      d={
        `M 0 0` +
        `L ${canvasItem.armWidth} 0 ` +
        `L ${canvasItem.armWidth} ${canvasItem.armLength} ` +
        `L ${canvasItem.armWidth/2} ${canvasItem.pointLength + canvasItem.armLength} ` +
        `L 0 ${canvasItem.armLength} ` +
        `L 0 0 Z`
      }
      fill={canvasItem.fillColor}
      stroke={canvasItem.strokeColor}
      strokeWidth={canvasItem.strokeWidth}
    />
  );
}
 
export default DButton;