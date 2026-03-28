import { useState } from "react";
import type { ActiveBinding, StickMoveBinding } from "../types/binding";
import { useGamepads } from "../context/GamepadsContext";

const ActiveBindField = ({ onChange, value }: {
  value?: ActiveBinding;
  onChange: (field: string, value: ActiveBinding | null) => void;
}) => {
  const [listening, setListening] = useState(false);
  const gamepads = useGamepads();
  const gamepad = gamepads[0];

  const leftStick: StickMoveBinding = { kind: "stick", xIndex: 0, yIndex: 1 };
  const rightStick: StickMoveBinding = { kind: "stick", xIndex: 2, yIndex: 3 };

  let currentBinding = "None";
  if (!value) {
    currentBinding = "None";
  } else if (value.kind === "button") {
    currentBinding = value.index.toString();
  } else if (value.kind === "stick") {
    if (value.xIndex === 0) {
      currentBinding = "Move left stick";
    } else {
      currentBinding = "Move right stick";
    }
  }

  if (listening && gamepad) {
    for (let i = 0; i < gamepad.buttons.length; i++) {
      if (gamepad.buttons[i].value >= 0.5) {
        onChange('activeBinding', { kind: 'button', index: i });
        setListening(false);
        break;
      }
    }
    for (let i = 0; i < gamepad.axes.length; i++) {
      if (Math.abs(gamepad.axes[i]) >= 0.25) {
        if (i === 0 || i === 1) {
          onChange('activeBinding', leftStick);
          setListening(false);
          break;
        }
        if (i === 2 || i === 3) {
          onChange('activeBinding', rightStick);
          setListening(false);
          break;
        }
      }
    }
  }

  return (
    <label>
      {`Bound to: ${currentBinding}`} <br />
      <button
        onClick={() => setListening(!listening)}
      > 
        {listening ? "Waiting for input..." : "Bind input"}
      </button>
      <button
        onClick={() => onChange('activeBinding', null)}
      >
        {"Clear binding"}
      </button>
    </label>
  );
}
 
export default ActiveBindField;