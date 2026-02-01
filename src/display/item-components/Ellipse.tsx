import CanvasGroup from "./CanvasGroup";
import type { CanvasEllipse } from "../../interface/canvas-item";

const Ellipse = ({canvasItem, isSelected, onMouseDown}: {
  canvasItem: CanvasEllipse,
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
          `M 0 ${canvasItem.height/2} ` +
          `A ${canvasItem.width/2} ${canvasItem.height/2} 0 0 0 ${canvasItem.width} ${canvasItem.height/2} ` +
          `A ${canvasItem.width/2} ${canvasItem.height/2} 0 0 0 0 ${canvasItem.height/2} Z`
        }
        fill={canvasItem.fillColor}
        stroke={canvasItem.strokeColor}
        strokeWidth={canvasItem.strokeWidth}
      />
    </CanvasGroup>
  );
}
 
export default Ellipse;