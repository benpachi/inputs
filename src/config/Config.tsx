import { useDisplay } from "../context/DisplayContext";
import type { DisplayItem } from "../interface/display-item";

const Config = () => {
  const { addElement, removeElement, updateElement, setSelectedID, selectedID, elements } = useDisplay();
  const selectedElement = elements.find((el) => el.id === selectedID);
  
  const DEFAULT_ELEMENT = {
    rotation: 0,
    width: 50,
    height: 50,
    x: 50,
    y: 50,
    fillColor: "#000000",
    strokeColor: "#ff0000",
    strokeWidth: 5,
  } 

  const handleChange = (field: keyof DisplayItem, value: DisplayItem[keyof DisplayItem]) => {
    if (selectedElement) {
      updateElement(selectedElement.id, {...selectedElement, [field]: value});
    }
  }

  return ( 
    <div className='config-card'>
      <div className='config-controls'>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Ellipse", type: "ellipse", ...DEFAULT_ELEMENT}))}>add ellipse</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Rectangle", type: "rectangle", ...DEFAULT_ELEMENT}))}>add rectangle</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "D-pad", type: "d-pad", ...DEFAULT_ELEMENT}))}>add d-pad</button>
        </div>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <label htmlFor="elementSelector">Select element </label>
          <select 
            value={selectedID} 
            id="elementSelector" 
            onChange={(e) => setSelectedID(e.target.value)}
          >
            <option value="">(none)</option>
            {elements.map((element) => (
              <option key={element.id} value={element.id}>{element.name}</option>
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
          <p>watch your luminance in the color picker!</p>
          <button onClick={() => { removeElement(selectedElement.id); setSelectedID(''); }}>Delete</button>
        </div>
         : <p>No element selected</p>}
      </div>
    </div>
  );
}
 
export default Config;