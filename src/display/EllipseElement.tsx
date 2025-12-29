import ElementGroup from "./ElementGroup";
import type { EllipseItem } from "../interface/display-item";

const EllipseElement = ({element, isSelected, onMouseDown}: {
  element: EllipseItem,
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
          `M 0 ${element.height/2} ` +
          `A ${element.width/2} ${element.height/2} 0 0 0 ${element.width} ${element.height/2} ` +
          `A ${element.width/2} ${element.height/2} 0 0 0 0 ${element.height/2} Z`
        }
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default EllipseElement;