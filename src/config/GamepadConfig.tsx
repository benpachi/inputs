import { useGamepads } from "../context/GamepadsContext";

const GamepadConfig = () => {
  const { gamepads, selectedIndex, deadzone, setSelectedIndex, setDeadzone } = useGamepads();

  const indices = Object.keys(gamepads);


  return (
  <div className={'config-section'} style={{padding: '20px', width: '50%'}}>    
    <label>Detected gamepads: </label>
    <select>
      {indices.map((index) => 
        <option key={index} value={index} onChange={() => setSelectedIndex(Number(index))}>Player {index}</option>
      )}
    </select>

    <br />    
    
    <label>{`Stick deadzone: ${Math.round(deadzone*100)}%`}</label> <br />
    <input value={deadzone} onChange={(e) => setDeadzone(Number(e.target.value))} type={'range'} min={0} max={1} step={0.01} />   
  </ div>
  );
}
 
export default GamepadConfig;