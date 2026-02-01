import CanvasGroup from "./CanvasGroup";
import type { CanvasRectangle } from "../../interface/canvas-item";

const Rectangle = ({canvasItem, isSelected, onMouseDown}: {
  canvasItem: CanvasRectangle,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  return (
    <CanvasGroup
      canvasItem={canvasItem}
      width={canvasItem.width}
      height={canvasItem.height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
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
    </CanvasGroup>
  );
}
 
export default Rectangle;