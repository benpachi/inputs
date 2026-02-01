import CanvasGroup from "./CanvasGroup";
import type { CanvasDButton } from "../../interface/canvas-item";

const DButton = ({canvasItem, isSelected, onMouseDown}: {
  canvasItem: CanvasDButton,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  return (
    <CanvasGroup
      canvasItem={canvasItem}
      width={canvasItem.armWidth}
      height={canvasItem.armLength + canvasItem.pointLength}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
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
    </CanvasGroup>
  );
}
 
export default DButton;