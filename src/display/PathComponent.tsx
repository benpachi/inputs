import { useGamepads } from '../context/GamepadsContext';
import { type ActiveBinding, type MoveBinding } from '../types/binding';

interface PathProps {
  pathString: string;
  fillOff: string;
  fillOn: string;
  strokeOff: string;
  strokeOn: string;
  strokeWidth: number;
  activeBinding: ActiveBinding;
  moveBinding: MoveBinding;
  rotation: number;
}

// Renders a single path element that can respond to controller input.

const PathComponent = ({ pathString, fillOff, fillOn, strokeOff, strokeOn, strokeWidth, activeBinding, moveBinding, rotation }: PathProps) => {
  const gamepads = useGamepads();
  let gamepad = gamepads[0];

  let range = 50;
  let tiltFactor = 0.25;
  let deadzone = 0.25;

  let active = false;
  let tiltStrength = 0;
  let angle = 0;

  if (gamepad) {
    if (activeBinding) {
      if (activeBinding.kind === "button") {
        if (gamepad.buttons[activeBinding.index].value > 0) { active = true; }
      } else if (activeBinding.kind === "axis") {
        if (Math.abs(gamepad.axes[activeBinding.index]) > deadzone) { active = true; }
      }      
    }
    if (moveBinding) {
      let dx;
      let dy;
      const rawX = gamepad.axes[moveBinding.xAxis];
      const rawY = gamepad.axes[moveBinding.yAxis];

      const mag = Math.sqrt(rawX**2 + rawY**2);
      if (mag < deadzone) {
        dx = 0;
        dy = 0;
      } else if (mag > 1) {
        const scale = 1 / mag;
        dx = rawX * scale;
        dy = rawY * scale;
      } else {
        dx = rawX;
        dy = rawY;
      }
      tiltStrength = Math.sqrt(dx**2 + dy**2);
      angle = Math.atan2(dy, dx);
    }
  }

  return (
    <path 
      d={pathString}
      fill={active ? fillOn : fillOff}
      stroke={active ? strokeOn : strokeOff}
      strokeWidth={strokeWidth}
      transform={`
        rotate(${angle*(180/Math.PI)} 0 0) 
        scale(${1 - tiltStrength*tiltFactor} 1) 
        translate(${tiltStrength*range} 0) 
        rotate(${-angle*(180/Math.PI)} 0 0)
        rotate(${rotation} 0 0)
      `}
    />
  );
  /* 
    Transforms in the transform property are applied in order from bottom to top.
      1. Rotate according to item config
      2. Rotate by the negative of the angle to cancel out the rotation of step 5 so that it only affects positioning
      3. Translate the element according to the stick-tilt magnitude
      4. Apply scale to give illusion of 3D tilting
      5. Rotate element to position it according to the stick angle 
  */
}
 
export default PathComponent;