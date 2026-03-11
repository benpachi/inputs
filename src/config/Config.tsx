import { useItems, useItemsDispatch } from "../context/ItemsContext";
import InputField from "./InputField";

const Config = () => {
  const {items, selectedIds} = useItems();
  const dispatch = useItemsDispatch();
  const selectedItem = items.find((item) => item.id === selectedIds[0]);
  
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
    borderRadius: 0
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
    borderRadius: 0
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
    borderRadius: 0
  }

  const handleChange = (field: string, value: string | number) => {
    if (selectedItem) {
      dispatch({type: 'changed', item: {...selectedItem, [field]: value}});
    }
  }

  const extraFields: React.ReactElement[] = [];
  if (selectedItem) {
    if ('width' in selectedItem) {
      extraFields.push(<InputField field='width' value={(selectedItem).width} onChange={handleChange} type='number' />);
    }
    if ('height' in selectedItem) {
      extraFields.push(<InputField field='height' value={(selectedItem).height} onChange={handleChange} type='number' />);
    }
    if ('pointLength' in selectedItem) {
      extraFields.push(<InputField field='pointLength' value={(selectedItem).pointLength} onChange={handleChange} type='number' />);
    }
    if ('armLength' in selectedItem) {
      extraFields.push(<InputField field='armLength' value={(selectedItem).armLength} onChange={handleChange} type='number' />);
    }
    if ('armWidth' in selectedItem) {
      extraFields.push(<InputField field='armWidth' value={(selectedItem).armWidth} onChange={handleChange} type='number' />);
    }
  }

  return ( 
    <div className='config-card'>
      <div className='config-controls'>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <button onClick={() => dispatch({type: 'added', item: {id: crypto.randomUUID(), name: "Ellipse", kind: "ellipse", ...DEFAULT_ELEMENT}})}>add ellipse</button>
          <button onClick={() => dispatch({type: 'added', item: {id: crypto.randomUUID(), name: "Rectangle", kind: "rectangle", ...DEFAULT_ELEMENT}})}>add rectangle</button>
          <button onClick={() => dispatch({type: 'added', item: {id: crypto.randomUUID(), name: "D-Button", kind: "d-button", ...DEFAULT_DPAD}})}>add d-button</button>
          <button onClick={() => dispatch({type: 'added', item: {id: crypto.randomUUID(), name: "Plus", kind: "plus", ...DEFAULT_PLUS}})}>add plus</button>
          <button onClick={() => dispatch({type: 'added', item: {id: crypto.randomUUID(), name: "D-Pad", kind: "d-pad", ...DEFAULT_PLUS}})}>add d-pad</button>
        </div>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <label htmlFor="canvasItemSelector">Select canvas item </label>
          <select 
            value={selectedIds[0]} 
            id="canvasItemSelector" 
            onChange={(e) => dispatch({type: 'selected', itemId: e.target.value})}
          >
            <option value="">(none)</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        {selectedItem ? 
        <div className="config-controls">
          <div className="flexrow">
            <InputField field='x' value={selectedItem.x} onChange={handleChange} type='number' />
            <InputField field='y' value={selectedItem.y} onChange={handleChange} type='number' />
          </div>
          {extraFields}
          <div className="flexrow">
            <InputField field='rotation' value={selectedItem.rotation} onChange={handleChange} type='number' />
            <InputField field='strokeWidth' value={selectedItem.strokeWidth} onChange={handleChange} type='number' />
          </div>
          <div className="flexrow">
            <InputField field='fillColor' value={selectedItem.fillColor} onChange={handleChange} type='color' />
            <InputField field='strokeColor' value={selectedItem.strokeColor} onChange={handleChange} type='color' />
          </div>
          <p>watch your luminance in the color picker!</p>
          <button onClick={() => { dispatch({type: 'added', item: {...selectedItem, x: selectedItem.x+10, y: selectedItem.y+10, id: crypto.randomUUID()}}) }}>Duplicate</button>
          <button onClick={() => { dispatch({type: 'deleted', itemId: selectedItem.id}) }}>Delete</button>
        </div>
         : <p>No canvas item selected</p>}
      </div>
    </div>
  );
}
 
export default Config;