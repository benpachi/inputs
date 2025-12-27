import Element from "./Element";
import { useDisplay } from "../context/DisplayContext";
import { useState } from "react";

const Display = () => {
  const { elements, selectedIndex, updateElement, selectElement } = useDisplay();
  const [isDragging, setIsDragging] = useState(false);
  const selectedElement = elements[selectedIndex];

  const handleElementMouseDown = (e: React.MouseEvent, index: number)  => {
    selectElement(index);
    setIsDragging(true);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const { offsetX, offsetY } = e.nativeEvent;

    updateElement(selectedIndex, {...selectedElement, x: offsetX, y: offsetY});
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  }

  return ( 
    <div className='display-panel'>
      <svg 
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className='canvas' 
        width='400' 
        height='300'
      >
        {elements.map((element, index) => (
          <Element
            onMouseDown={handleElementMouseDown}
            element={element}
            index={index}
            key={index}
          />
        ))}
      </svg>
    </div>
  );
}
 
export default Display;