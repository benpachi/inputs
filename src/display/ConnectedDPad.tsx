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
  const nudge = Math.SQRT1_2/10;

  return (
    <ElementGroup
      element={element}
      width={width}
      height={height}
      isSelected={isSelected}
      onMouseDown={onMouseDown}
    >
      {/* Can probably compact this with a map function but I'll worry about that when I add border radius */}
      {/* Left */}
      <path 
        d={
          `M ${width/2 + nudge} ${height/2} ` + 
          `L ${scaledArmLength + nudge} ${height - scaledArmLength} ` +
          `L 0 ${height - scaledArmLength} ` +
          `L 0 ${scaledArmLength}` +
          `L ${scaledArmLength + nudge} ${scaledArmLength} ` +
          `L ${width/2 + nudge} ${height/2} Z` 
        }
        fill={'green'}
      />
      {/* Up */}
      <path 
        d={
          `M ${width/2} ${height/2 + nudge} ` +
          `L ${scaledArmLength} ${scaledArmLength + nudge} ` +
          `L ${scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} ${scaledArmLength + nudge} ` +
          `L ${width/2} ${height/2 + nudge} Z` 
        }
        fill={'yellow'}
      />
      {/* Right */}
      <path 
        d={
          `M ${width/2 - nudge} ${height/2} ` +
          `L ${width - scaledArmLength - nudge} ${scaledArmLength} ` +
          `L ${width} ${scaledArmLength} ` +
          `L ${width} ${height - scaledArmLength} ` +
          `L ${width - scaledArmLength - nudge} ${height - scaledArmLength} ` +
          `L ${width/2 - nudge} ${height/2}`
        }
        fill={'purple'}
      />
      {/* Down */}
      <path 
        d={
          `M ${width/2} ${height/2 - nudge} ` +
          `L ${width - scaledArmLength} ${height - scaledArmLength - nudge} ` +
          `L ${width - scaledArmLength} ${height} ` +
          `L ${scaledArmLength} ${height} ` +
          `L ${scaledArmLength} ${height - scaledArmLength - nudge} ` +
          `L ${width/2} ${height/2 - nudge} Z` 
        }
        fill={'blue'}
      />
      {/* Stroke */}
      <path 
        d={
          // Left
          `M ${scaledArmLength} ${height - scaledArmLength}` +
          `L 0 ${height - scaledArmLength} ` +
          `L 0 ${scaledArmLength} ` +
          `L ${scaledArmLength} ${scaledArmLength} ` +
          // Up
          `L ${scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} 0 ` +
          `L ${width - scaledArmLength} ${scaledArmLength} ` +
          // Right
          `L ${width} ${scaledArmLength} ` +
          `L ${width} ${height - scaledArmLength} ` +
          `L ${width - scaledArmLength} ${height - scaledArmLength} ` +
          // Down
          `L ${width - scaledArmLength} ${height} ` +
          `L ${scaledArmLength} ${height} ` +
          `L ${scaledArmLength} ${height - scaledArmLength} Z`
        }
        fill={'transparent'}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </ElementGroup>
  );
}
 
export default ConnectedDPadElement;