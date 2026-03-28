import { useItems, useItemsDispatch } from "../context/ItemsContext";
import ActiveBindField from "./ActiveBindField";
import InputField from "./InputField";
import MoveBindField from "./MoveBindField";

const Config = () => {
  const {items, selectedId} = useItems();
  const dispatch = useItemsDispatch();
  const selectedItem = items.find((item) => item.id === selectedId);

  const handleChange = (field: string, value: any) => {
    if (selectedItem) {
      dispatch({type: 'changed', item: {...selectedItem, [field]: value}});
    }
  }

  const extraFields: React.ReactElement[] = [];
  if (selectedItem) {
    if ('width' in selectedItem) {
      extraFields.push(<InputField key='width' field='width' value={(selectedItem).width} onChange={handleChange} type='number' />);
    }
    if ('height' in selectedItem) {
      extraFields.push(<InputField key='height' field='height' value={(selectedItem).height} onChange={handleChange} type='number' />);
    }
    if ('pointLength' in selectedItem) {
      extraFields.push(<InputField key='pointLength' field='pointLength' value={(selectedItem).pointLength} onChange={handleChange} type='number' />);
    }
    if ('armLength' in selectedItem) {
      extraFields.push(<InputField key='armLength' field='armLength' value={(selectedItem).armLength} onChange={handleChange} type='number' />);
    }
    if ('armWidth' in selectedItem) {
      extraFields.push(<InputField key='armWidth' field='armWidth' value={(selectedItem).armWidth} onChange={handleChange} type='number' />);
    }
    if ('radius' in selectedItem) {
      extraFields.push(<InputField key='radius' field='radius' value={(selectedItem).radius} onChange={handleChange} type='number' />)
    }
  }

  return ( 
    <div className='config-card'>
      <div className='config-controls'>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <button onClick={() => dispatch({type: 'added', kind: 'ellipse'})}>add ellipse</button>
          <button onClick={() => dispatch({type: 'added', kind: 'rectangle'})}>add rectangle</button>
          <button onClick={() => dispatch({type: 'added', kind: 'd-button'})}>add d-button</button>
          <button onClick={() => dispatch({type: 'added', kind: 'plus'})}>add plus</button>
          <button onClick={() => dispatch({type: 'added', kind: 'd-pad'})}>add d-pad</button>
        </div>
        <div className="flexrow" style={{justifyContent: 'start'}}>
          <label htmlFor="canvasItemSelector">Select canvas item </label>
          <select 
            value={selectedId} 
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
            <InputField field='fillOff' value={selectedItem.fillOff} onChange={handleChange} type='color' />
            <InputField field='fillOn' value={selectedItem.fillOn} onChange={handleChange} type='color' />
            <InputField field='strokeOff' value={selectedItem.strokeOff} onChange={handleChange} type='color' />
            <InputField field='strokeOn' value={selectedItem.strokeOn} onChange={handleChange} type='color' />
          </div>
          <div className="flexrow">
            <MoveBindField value={selectedItem.moveBinding} onChange={handleChange} />
            {('activeBinding' in selectedItem) && <ActiveBindField field='activeBinding' value={selectedItem.activeBinding} onChange={handleChange} /> }
            {('upActiveBinding' in selectedItem) && <ActiveBindField field='upActiveBinding' value={selectedItem.upActiveBinding} onChange={handleChange} /> }
            {('rightActiveBinding' in selectedItem) && <ActiveBindField field='rightActiveBinding' value={selectedItem.rightActiveBinding} onChange={handleChange} /> }
            {('downActiveBinding' in selectedItem) && <ActiveBindField field='downActiveBinding' value={selectedItem.downActiveBinding} onChange={handleChange} /> }
            {('leftActiveBinding' in selectedItem) && <ActiveBindField field='leftActiveBinding' value={selectedItem.leftActiveBinding} onChange={handleChange} /> }
            {('strokeActiveBinding' in selectedItem) && <ActiveBindField field='strokeActiveBinding' value={selectedItem.strokeActiveBinding} onChange={handleChange} /> }
          </div>
          <button onClick={() => { dispatch({ type: 'duplicated', item: selectedItem }) }}>Duplicate</button>
          <button onClick={() => { dispatch({ type: 'deleted', itemId: selectedItem.id}) }}>Delete</button>
        </div>
         : <p>No canvas item selected</p>}
      </div>
    </div>
  );
}
 
export default Config;