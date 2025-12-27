import { useDisplay } from "../context/DisplayContext";

const Config = () => {
  const { addElement, removeElement, updateElement, setSelectedIndex, selectedIndex, elements } = useDisplay();
  const selectedElement = elements[selectedIndex];

  //Would a reducer be better here?
  const handleChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, x: Number(e.target.value)});
    }
  }
  const handleChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, y: Number(e.target.value)});
    }
  }
  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, width: Number(e.target.value)});
    }
  }
  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, height: Number(e.target.value)});
    }
  }
  const handleChangeRotation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      updateElement(selectedIndex, {...selectedElement, rotation: Number(e.target.value)});
    }
  }

  return ( 
    <div className='config-card'>
      {/* need something better than having defaults in here lol */}
      <button onClick={() => setSelectedIndex(addElement({name: "Circle", width: 50, height: 50, rotation: 0, x: 50, y: 50, type: "ellipse"}))}>add circle</button>
      <button onClick={() => setSelectedIndex(addElement({name: "Square", width: 50, height: 50, rotation: 0, x: 50, y: 50, type: "rectangle"}))}>add square</button>
      <div className='config-controls'>
        <label htmlFor="element">Select element</label>
        <select 
          value={selectedIndex} 
          id="elementSelector" 
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {elements.map((element, index) => (
            <option key={index} value={index}>#{index}. {element.name}</option>
          ))}
        </select>

        {selectedElement ? 
        <div className="config-controls">
          <label>X position</label>
          <input value={selectedElement.x} onChange={handleChangeX} type="number" />
          <label>Y position</label>
          <input value={selectedElement.y} onChange={handleChangeY} type="number" />
          <label>Width</label>
          <input value={selectedElement.width} onChange={handleChangeWidth} type="number" />
          <label>Height</label>
          <input value={selectedElement.height} onChange={handleChangeHeight} type="number" />
          <label>Rotation</label>
          <input value={selectedElement.rotation} onChange={handleChangeRotation} type="number" />
          <button onClick={() => {
            removeElement(selectedIndex);
            setSelectedIndex(0);
          }}>Delete</button>
        </div>
         : <p>Cannot find element</p>}
      </div>
    </div>
  );
}
 
export default Config;