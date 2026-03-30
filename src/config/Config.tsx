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
        <div className="config-content">
          <div className="config-left">
            <div className="config-section">
              <div className="config-section-title">Add Item</div>
              <div className="flexrow" style={{justifyContent: 'flex-start', flexWrap: 'wrap', gap: '8px'}}>
                <button onClick={() => dispatch({type: 'added', kind: 'ellipse'})}>Ellipse</button>
                <button onClick={() => dispatch({type: 'added', kind: 'rectangle'})}>Rectangle</button>
                <button onClick={() => dispatch({type: 'added', kind: 'd-button'})}>D-Button</button>
                <button onClick={() => dispatch({type: 'added', kind: 'plus'})}>Plus</button>
                <button onClick={() => dispatch({type: 'added', kind: 'd-pad'})}>D-Pad</button>
              </div>
            </div>

            <div className="config-section">
              <div className="config-section-title">Select Item</div>
              <div className="flexrow">
                <select
                  value={selectedId}
                  onChange={(e) => dispatch({type: 'selected', itemId: e.target.value})}
                >
                  <option value="">(none)</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedItem ? (
              <>
                <div className="config-section">
                  <div className="config-section-title">Orientation</div>
                  <div className="config-grid">
                    <InputField field='x' value={selectedItem.x} onChange={handleChange} type='number' />
                    <InputField field='y' value={selectedItem.y} onChange={handleChange} type='number' />
                    <InputField field='rotation' value={selectedItem.rotation} onChange={handleChange} type='number' />
                  </div>
                </div>
                <div className="config-section">
                  <div className="config-section-title">Dimensions</div>
                  <div className="config-grid">
                    {extraFields}
                    <InputField field='strokeWidth' value={selectedItem.strokeWidth} onChange={handleChange} type='number' />
                  </div>
                </div>
                <div className="config-section">
                  <div className="config-section-title">Colours (unpressed)</div>
                  <div className="config-grid four">
                    <InputField field='fillOff' value={selectedItem.fillOff} onChange={handleChange} type='color' />
                    <InputField field='strokeOff' value={selectedItem.strokeOff} onChange={handleChange} type='color' />
                  </div>
                </div>
                <div className="config-section">
                  <div className="config-section-title">Colours (pressed)</div>
                  <div className="config-grid four">
                    <InputField field='fillOn' value={selectedItem.fillOn} onChange={handleChange} type='color' />
                    <InputField field='strokeOn' value={selectedItem.strokeOn} onChange={handleChange} type='color' />
                  </div>
                </div>

                <div className="config-section">
                  <div className="config-section-title">Actions</div>
                  <div className="flexrow" style={{gap: '8px'}}>
                    <button onClick={() => { dispatch({ type: 'duplicated', item: selectedItem }) }}>Duplicate</button>
                    <button onClick={() => { dispatch({ type: 'deleted', itemId: selectedItem.id }) }}>Delete</button>
                  </div>
                </div>
              </>
            ) : (
              <p>No canvas item selected</p>
            )}
          </div>

          {selectedItem && (
            <div className="config-section">
              <div className="config-section-title">Bindings</div>
              <div className="config-grid full">
                <MoveBindField value={selectedItem.moveBinding} onChange={handleChange} />
                {('activeBinding' in selectedItem) && <ActiveBindField field='activeBinding' value={selectedItem.activeBinding} onChange={handleChange} /> }
                {('upActiveBinding' in selectedItem) && <ActiveBindField field='upActiveBinding' value={selectedItem.upActiveBinding} onChange={handleChange} /> }
                {('rightActiveBinding' in selectedItem) && <ActiveBindField field='rightActiveBinding' value={selectedItem.rightActiveBinding} onChange={handleChange} /> }
                {('downActiveBinding' in selectedItem) && <ActiveBindField field='downActiveBinding' value={selectedItem.downActiveBinding} onChange={handleChange} /> }
                {('leftActiveBinding' in selectedItem) && <ActiveBindField field='leftActiveBinding' value={selectedItem.leftActiveBinding} onChange={handleChange} /> }
                {('strokeActiveBinding' in selectedItem) && <ActiveBindField field='strokeActiveBinding' value={selectedItem.strokeActiveBinding} onChange={handleChange} /> }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default Config;