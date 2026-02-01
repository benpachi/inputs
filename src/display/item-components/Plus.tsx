import CanvasGroup from "./CanvasGroup";
import type { CanvasPlus } from "../../interface/canvas-item";

const Plus = ({canvasItem, isSelected, onMouseDown}: {
  canvasItem: CanvasPlus,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  //Scale arm length so that changing arm width doesn't affect overall dimensions
  const scaledArmLength = canvasItem.armLength - canvasItem.armWidth/2;
  const width = scaledArmLength*2 + canvasItem.armWidth;
  const height = scaledArmLength*2 + canvasItem.armWidth;

  return (
    <CanvasGroup
      canvasItem={canvasItem}
      width={width}
      height={height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      <path 
        d={
          `M 0 ${height - scaledArmLength}` +
          `L ${scaledArmLength} ${height - scaledArmLength} ` +
          `L ${scaledArmLength} ${height} ` +
          `L ${width - scaledArmLength} ${height} ` +
          `L ${width - scaledArmLength} ${height - scaledArmLength} ` +
          `L ${width} ${height - scaledArmLength} ` +
          `L ${width} ${scaledArmLength} ` +
          `L ${width - scaledArmLength} ${scaledArmLength} ` +
          `L ${width - scaledArmLength} 0 ` +
          `L ${scaledArmLength} 0 ` +
          `L ${scaledArmLength} ${scaledArmLength} ` +
          `L 0 ${scaledArmLength} ` +
          `L 0 ${height - scaledArmLength} Z`
        }
        fill={canvasItem.fillColor}
        stroke={canvasItem.strokeColor}
        strokeWidth={canvasItem.strokeWidth}
      />
    </CanvasGroup>
  );
}
 
export default Plus;