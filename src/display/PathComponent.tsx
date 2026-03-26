import { useGamepads } from '../context/GamepadsContext';
import { type ActiveBinding, type MoveBinding } from '../types/binding';

interface PathProps {
  pathString: string;
  fill: string;
  activeFill: string;
  stroke: string;
  activeStroke: string;
  strokeWidth: number;
  activeBindings: ActiveBinding[];
  moveBinding: MoveBinding;
}

// Renders a single path element that can respond to controller input.

const PathComponent = ({ pathString, fill, activeFill, stroke, activeStroke, strokeWidth, activeBindings, moveBinding }: PathProps) => {
  const gamepads = useGamepads();
  //console.log(gamepads);

  let gamepad = gamepads[0];

  let active = false;
  let xPos = 0;
  let yPos = 0;
  if (gamepad) {
    activeBindings.forEach((binding: ActiveBinding) => {
      if (binding.kind === "button") {
        if (gamepad.buttons[binding.index].value > 0) {
          active = true;
        }
        return;
      } else if (binding.kind === "axis") {
        if (Math.abs(gamepad.axes[binding.index]) > 0.25) {
          active = true;
        }
        return;
      }
    });
    
    if (moveBinding) {
      console.log("hi");
      xPos = gamepad.axes[moveBinding.xAxis]*50;
      yPos = gamepad.axes[moveBinding.yAxis]*50;
    }
  }

  return (
    <path 
      d={pathString}
      fill={active ? activeFill : fill}
      stroke={active ? activeStroke : stroke}
      strokeWidth={strokeWidth}
      transform={`translate (${xPos} ${yPos})`}
    />
  );
}
 
export default PathComponent;