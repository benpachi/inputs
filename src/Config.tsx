import { Shape } from "./shapes/shape";
import { Ellipse } from "./shapes/ellipse";
import { Rectangle } from "./shapes/rectangle";
import { useState } from "react";

const Config = ({addElement, updateElementList, selectElement, selectedElementIndex, selectedElement, elements}: {
  addElement: (shape: Shape) => void; 
  updateElementList: (index: number, updatedShape: Shape) => void;
  selectElement: (index: number) => void;
  selectedElementIndex: number;
  selectedElement?: Shape;
  elements: Shape[];
  }) => {

  const handleChangeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedElement) {
      const updated = selectedElement;
      updated.x = Number(e.target.value)
      updateElementList(selectedElementIndex, updated);
    }
  }

  const handleChangeY = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (selectedElement) {
      const updated = selectedElement;
      updated.y = Number(e.target.value)
      updateElementList(selectedElementIndex, updated);
    }
  }

  return ( 
    <div className='config-card'>
      <button onClick={() => addElement(new Ellipse)}>add circle</button>
      <button onClick={() => addElement(new Rectangle)}>add square</button>
      <div>
        <label htmlFor="element">Select element</label>
        <select 
          value={selectedElementIndex} 
          id="elementSelector" 
          onChange={(e) => selectElement(Number(e.target.value))}
        >
          {elements.map((element, index) => (
            <option key={index} value={index}>{element.name}</option>
          ))}
        </select>

        {selectedElement ? 
        <div>
          <input value={selectedElement.x} onChange={handleChangeX} type="number" />
          <input value={selectedElement.y} onChange={handleChangeY} type="number" />
        </div>
         : <p>cannot find element</p>}
      </div>
    </div>
  );
}
 
export default Config;