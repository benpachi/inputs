import { useDisplay } from "../context/DisplayContext";
import type { DisplayItem } from "../interface/display-item";

const Config = () => {
  const { addElement, removeElement, updateElement, setSelectedIndex, selectedIndex, elements } = useDisplay();
  const selectedElement = elements[selectedIndex];
  
  const DEFAULT_ELEMENT = {
    rotation: 0,
    width: 50,
    height: 50,
    x: 50,
    y: 50,
    //fun fact if you set the colors to #000000 the luminance will be stuck at 0 in the color picker LOL?
    //like what do you even do about that i'm crashing out
    fillColor: "#121212",
    strokeColor: "#bad666",
    strokeWidth: 5,
  } 

  const handleChange = (field: keyof DisplayItem, value: DisplayItem[keyof DisplayItem]) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, [field]: value});
    }
  }

  return ( 
    <div className='config-card'>
      <div className='config-controls'>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          {/* need something better than having the defaults in here lol */}
          <button onClick={() => setSelectedIndex(addElement({name: "Ellipse", type: "ellipse", ...DEFAULT_ELEMENT}))}>add ellipse</button>
          <button onClick={() => setSelectedIndex(addElement({name: "Rectangle", type: "rectangle", ...DEFAULT_ELEMENT}))}>add rectangle</button>
        </div>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <label htmlFor="elementSelector">Select element </label>
          <select 
            value={selectedIndex} 
            id="elementSelector" 
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
          >
            {elements.map((element, index) => (
              <option key={index} value={index}>#{index}. {element.name}</option>
            ))}
          </select>
        </div>

        {selectedElement ? 
        <div className="config-controls">
          <div className="flexrow">
            <label>
              X position
              <input value={selectedElement.x} onChange={(e) => handleChange('x', Number(e.target.value))} type="number" />
            </label>
            <label>
              Y position
              <input value={selectedElement.y} onChange={(e) => handleChange('y', Number(e.target.value))} type="number" />
            </label>
          </div>
          <div className="flexrow">
            <label>
              Width
              <input value={selectedElement.width} onChange={(e) => handleChange('width', Number(e.target.value))} type="number" />
            </label>
            <label>
              Height
              <input value={selectedElement.height} onChange={(e) => handleChange('height', Number(e.target.value))} type="number" />
            </label>
          </div>
          <div className="flexrow">
            <label>
              Rotation
              <input value={selectedElement.rotation} onChange={(e) => handleChange('rotation', Number(e.target.value))} type="number" />
            </label>
            <label>
              Stroke width
              <input value={selectedElement.strokeWidth} onChange={(e) => handleChange('strokeWidth', Number(e.target.value))} type="number" />
            </label>
          </div>
          <div className="flexrow">
            <label>
              Fill color
              <input value={selectedElement.fillColor} onChange={(e) => handleChange('fillColor', e.target.value)} type="color" />
            </label>
            <label>
              Stroke color
              <input value={selectedElement.strokeColor} onChange={(e) => handleChange('strokeColor', e.target.value)} type="color" />
            </label>
          </div>
          <button onClick={() => { removeElement(selectedIndex); setSelectedIndex(0); }}>Delete</button>
        </div>
         : <p>Cannot find element</p>}
      </div>
    </div>
  );
}
 
export default Config;