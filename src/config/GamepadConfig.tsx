import { useGamepads } from "../context/GamepadsContext";

const GamepadConfig = () => {
  const { gamepads, index, deadzone, setIndex, setDeadzone } = useGamepads();
  const gamepad = gamepads[index];


  return (
  <div style={{padding: '20px'}}>
    {gamepad ? 
      <>
        <label>{`Stick deadzone: ${Math.round(deadzone*100)}%`}</label> <br />
        <input value={deadzone} onChange={(e) => setDeadzone(Number(e.target.value))} type={'range'} min={0} max={1} step={0.01} />    
      </>
    : <h2>No gamepad detected.</h2>
    }
  </ div>
  );
}
 
export default GamepadConfig;