import Element from "./Element";
import { useDisplay } from "../context/DisplayContext";
import { useState } from "react";

const Display = () => {
  const { elements, selectedIndex, updateElement, setSelectedIndex } = useDisplay();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const selectedElement = elements[selectedIndex];

  const handleElementMouseDown = (e: React.MouseEvent, index: number)  => {
    const { offsetX, offsetY } = e.nativeEvent;
    
    setIsDragging(true);
    setSelectedIndex(index);
    setDragOffset({ 
      //Don't use selectedElement because setSelectedIndex is async
      x: offsetX - elements[index].x, 
      y: offsetY - elements[index].y 
    });
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const { offsetX, offsetY } = e.nativeEvent;

    updateElement(selectedIndex, {
      ...selectedElement, 
      x: offsetX - dragOffset.x, 
      y: offsetY - dragOffset.y,
    });
  }

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 })
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