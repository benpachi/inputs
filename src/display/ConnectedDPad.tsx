import ElementGroup from "./ElementGroup";
import type { ConnectedDPadItem } from "../interface/display-item";

const ConnectedDPadElement = ({element, isSelected, onMouseDown}: {
  element: ConnectedDPadItem,
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  //Scale arm length so that changing arm width doesn't affect overall dimensions
  const scaledArmLength = element.armLength - element.armWidth/2;
  const width = scaledArmLength*2 + element.armWidth;
  const height = scaledArmLength*2 + element.armWidth;
  //Correction for tiny gaps between dpad paths.
  const nudge = 0.5;

  return (
    <ElementGroup
      element={element}
      width={width}
      height={height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      {/* West */}
      <path 
        d={
          `M ${width/2 + nudge} ${height/2} ` +
          `L ${scaledArmLength + nudge} ${scaledArmLength} ` +
          `L 0 ${scaledArmLength} ` +
          `L 0 ${height - scaledArmLength}` +
          `L ${scaledArmLength + nudge} ${height - scaledArmLength} ` +
          `L ${width/2 + nudge} ${height/2} Z` 
        }
        fill={'blue'}
      />
      {/* North */}
      <path 
        d={
          `M ${width/2} ${height/2 - nudge} ` +
          `L ${scaledArmLength} ${scaledArmLength - nudge} ` +
          `L ${scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} ${scaledArmLength - nudge} ` +
          `L ${width/2} ${height/2 - nudge} Z` 
        }
        fill={'yellow'}
      />
      {/* East */}
      <path 
        d={
          `M ${width/2 - nudge} ${height/2} ` +
          `L ${width - scaledArmLength - nudge} ${height - scaledArmLength} ` +
          `L ${width} ${height - scaledArmLength} ` +
          `L ${width} ${scaledArmLength} ` +
          `L ${width - scaledArmLength - nudge} ${scaledArmLength} ` +
          `L ${width/2 - nudge} ${height/2}`
        }
        fill={'green'}
      />
      {/* South */}
      <path 
        d={
          `M ${width/2} ${height/2 - nudge} ` +
          `L ${scaledArmLength} ${height - scaledArmLength - nudge} ` +
          `L ${scaledArmLength} ${height} ` +
          `L ${width - scaledArmLength} ${height} ` +
          `L ${width - scaledArmLength} ${height - scaledArmLength - nudge} ` +
          `L ${width/2} ${height/2 - nudge} Z` 
        }
        fill={'purple'}
      />
      {/* Stroke */}
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
        fill={'transparent'}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default ConnectedDPadElement;