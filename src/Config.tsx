import { Shape } from "./shapes/shape";
import { Ellipse } from "./shapes/ellipse";
import { Rectangle } from "./shapes/rectangle";
import { useState } from "react";

const Config = ({addElement, removeElement, updateElementList, selectElement, selectedElementIndex, selectedElement, elements}: {
  addElement: (shape: Shape) => number; 
  removeElement: (index: number) => void;
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

  const handleChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (selectedElement) {
      const updated = selectedElement;
      updated.width = Number(e.target.value)
      updateElementList(selectedElementIndex, updated);
    }
  }
  const handleChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (selectedElement) {
      const updated = selectedElement;
      updated.height = Number(e.target.value)
      updateElementList(selectedElementIndex, updated);
    }
  }

  return ( 
    <div className='config-card'>
      <button onClick={() => selectElement(addElement(new Ellipse))}>add circle</button>
      <button onClick={() => selectElement(addElement(new Rectangle))}>add square</button>
      <div className='config-controls'>
        <label htmlFor="element">Select element</label>
        <select 
          value={selectedElementIndex} 
          id="elementSelector" 
          onChange={(e) => selectElement(Number(e.target.value))}
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
          <button onClick={() => {
            removeElement(selectedElementIndex);
            selectElement(0);
          }}>Delete</button>
        </div>
         : <p>Cannot find element</p>}
      </div>
    </div>
  );
}
 
export default Config;