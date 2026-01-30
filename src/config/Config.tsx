import { useDisplay } from "../context/DisplayContext";
import type { DPadItem, EllipseItem, RectangleItem, PlusItem, ConnectedDPadItem } from "../interface/display-item";
import InputComponent from "./InputComponent";

const Config = () => {
  const { addElement, removeElement, updateElement, setSelectedID, selectedID, elements } = useDisplay();
  const selectedElement = elements.find((element) => element.id === selectedID);
  
  const DEFAULT_ELEMENT = {
    rotation: 0,
    label: '',
    width: 50,
    height: 50,
    x: 200,
    y: 150,
    fillColor: "#000000",
    strokeColor: "#ff0000",
    strokeWidth: 5,
  } 
  
  const DEFAULT_DPAD = {
    rotation: 0,
    label: '',
    pointLength: 25,
    armWidth: 50,
    armLength: 50,
    x: 200,
    y: 150,
    fillColor: "#000000",
    strokeColor: "#ff0000",
    strokeWidth: 5, 
  }

  const DEFAULT_PLUS = {
    rotation: 0,
    label: '',
    armWidth: 33,
    armLength: 50,
    x: 200,
    y: 150,
    fillColor: "#000000",
    strokeColor: "#ff0000",
    strokeWidth: 5, 
  }

  const handleChange = (field: string, value: string | number) => {
    if (selectedElement) {
      updateElement(selectedElement.id, {...selectedElement, [field]: value});
    }
  }

  const extraFields: React.ReactElement[] = [];
  if (selectedElement) {
    switch (selectedElement.type) {
      case 'ellipse':
        extraFields.push(              
          <div className='flexrow'>
            <InputComponent field='width' value={(selectedElement as EllipseItem).width} onChange={handleChange} type='number' />
            <InputComponent field='height' value={(selectedElement as EllipseItem).height} onChange={handleChange} type='number' />
          </div>
        );
        break;
      case 'rectangle':
        extraFields.push(              
          <div className='flexrow'>
            <InputComponent field='width' value={(selectedElement as RectangleItem).width} onChange={handleChange} type='number' />
            <InputComponent field='height' value={(selectedElement as RectangleItem).height} onChange={handleChange} type='number' />
          </div>
        );
        break;
      case 'd-pad':
        extraFields.push(
          <div className="flexrow">
            <InputComponent field='pointLength' value={(selectedElement as DPadItem).pointLength} onChange={handleChange} type='number' />
            <InputComponent field='armLength' value={(selectedElement as DPadItem).armLength} onChange={handleChange} type='number' />
            <InputComponent field='armWidth' value={(selectedElement as DPadItem).armWidth} onChange={handleChange} type='number' />
          </div>
        );
        break;
      case 'plus':
        extraFields.push(
          <div className="flexrow">
            <InputComponent field='armLength' value={(selectedElement as PlusItem).armLength} onChange={handleChange} type='number' />
            <InputComponent field='armWidth' value={(selectedElement as PlusItem).armWidth} onChange={handleChange} type='number' />
          </div>
        );
        break;
      case 'connected d-pad':
        extraFields.push(
          <div className="flexrow">
            <InputComponent field='armLength' value={(selectedElement as ConnectedDPadItem).armLength} onChange={handleChange} type='number' />
            <InputComponent field='armWidth' value={(selectedElement as ConnectedDPadItem).armWidth} onChange={handleChange} type='number' />
          </div>
        );
        break;
    }
  }

  return ( 
    <div className='config-card'>
      <div className='config-controls'>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Ellipse", type: "ellipse", ...DEFAULT_ELEMENT}))}>add ellipse</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Rectangle", type: "rectangle", ...DEFAULT_ELEMENT}))}>add rectangle</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "D-pad", type: "d-pad", ...DEFAULT_DPAD}))}>add d-pad</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Plus", type: "plus", ...DEFAULT_PLUS}))}>add plus</button>
          <button onClick={() => setSelectedID(addElement({id: crypto.randomUUID(), name: "Connected D-pad", type: "connected d-pad", ...DEFAULT_PLUS}))}>add connected d-pad</button>
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
            <InputComponent field='x' value={selectedElement.x} onChange={handleChange} type='number' />
            <InputComponent field='y' value={selectedElement.y} onChange={handleChange} type='number' />
          </div>
          {extraFields}
          <div className="flexrow">
            <InputComponent field='rotation' value={selectedElement.rotation} onChange={handleChange} type='number' />
            <InputComponent field='strokeWidth' value={selectedElement.strokeWidth} onChange={handleChange} type='number' />
          </div>
          <div className="flexrow">
            <InputComponent field='fillColor' value={selectedElement.fillColor} onChange={handleChange} type='color' />
            <InputComponent field='strokeColor' value={selectedElement.strokeColor} onChange={handleChange} type='color' />
          </div>
          <p>watch your luminance in the color picker!</p>
          <button onClick={() => { setSelectedID(addElement({...selectedElement, x: selectedElement.x+10, y: selectedElement.y+10, id: crypto.randomUUID()})) }}>Duplicate</button>
          <button onClick={() => { removeElement(selectedElement.id); setSelectedID(''); }}>Delete</button>
        </div>
         : <p>No element selected</p>}
      </div>
    </div>
  );
}
 
export default Config;