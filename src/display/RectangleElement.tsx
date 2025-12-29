import ElementGroup from "./ElementGroup";
import type { RectangleItem } from "../interface/display-item";

const RectangleElement = ({element, isSelected, onMouseDown}: {
  element: RectangleItem,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  return (
    <ElementGroup
      element={element}
      width={element.width}
      height={element.height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      <path 
        d={
          `M 0 0 ` +
          `L ${element.width} 0 ` +
          `L ${element.width} ${element.height} ` +
          `L 0 ${element.height}` +
          `L 0 0 Z`
        }
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default RectangleElement;