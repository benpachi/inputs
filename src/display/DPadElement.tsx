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
      width={element.width}
      height={element.height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      <path 
        d={
          `M 0 0` +
          `L ${element.width} 0 ` +
          `L ${element.width} ${element.height - (element.width/2)} ` +
          `L ${element.width/2} ${element.height} ` +
          `L 0 ${element.height - (element.width/2)} ` +
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