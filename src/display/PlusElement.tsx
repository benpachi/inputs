import ElementGroup from "./ElementGroup";
import type { PlusItem } from "../interface/display-item";

const PlusElement = ({element, isSelected, onMouseDown}: {
  element: PlusItem,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  //Scale arm length so that changing arm width doesn't affect overall dimensions
  const scaledArmLength = element.armLength - element.armWidth/2;
  const width = scaledArmLength*2 + element.armWidth;
  const height = scaledArmLength*2 + element.armWidth;

  return (
    <ElementGroup
      element={element}
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
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default PlusElement;