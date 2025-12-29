import ElementGroup from "./ElementGroup";
import type { DPadItem } from "../interface/display-item";

const DPadElement = ({element, isSelected, onMouseDown}: {
  element: DPadItem,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  return (
    <ElementGroup
      element={element}
      width={element.armWidth}
      height={element.armLength + element.pointLength}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      <path 
        d={
          `M 0 0` +
          `L ${element.armWidth} 0 ` +
          `L ${element.armWidth} ${element.armLength} ` +
          `L ${element.armWidth/2} ${element.pointLength + element.armLength} ` +
          `L 0 ${element.armLength} ` +
          `L 0 0 Z`
        }
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default DPadElement;