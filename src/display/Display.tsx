import { useDisplay } from "../context/DisplayContext";
import { useState } from "react";
import type { DisplayItem } from "../interface/display-item";
import RectangleElement from "./RectangleElement";
import EllipseElement from "./EllipseElement";
import DPadElement from "./DPadElement";
import PlusElement from "./PlusElement";

const Display = () => {
  const { elements, selectedID, setSelectedID, updateElement } = useDisplay();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const selectedElement = elements.find((el) => el.id === selectedID);

  const handleElementMouseDown = (e: React.MouseEvent, id: string)  => {
    const { offsetX, offsetY } = e.nativeEvent;
    const element = elements.find((el) => el.id === id);
    
    if (!element) return;
    
    setIsDragging(true);
    setSelectedID(id);
    setDragOffset({ 
      x: offsetX - element.x, 
      y: offsetY - element.y 
    });
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const { offsetX, offsetY } = e.nativeEvent;

    updateElement(selectedID, {
      ...selectedElement, 
      x: offsetX - dragOffset.x, 
      y: offsetY - dragOffset.y,
    });
  }

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 })
  }

  const renderElement = (element: DisplayItem) => {
    const props = {
      key: element.id,
      element,
      isSelected: selectedID === element.id,
      onMouseDown: handleElementMouseDown,
    };

    switch (element.type) {
      case 'rectangle':
        return <RectangleElement {...props} element={element} />
      case 'ellipse':
        return <EllipseElement {...props} element={element} />
      case 'd-pad':
        return <DPadElement {...props} element={element} />
      case 'plus':
        return <PlusElement {...props} element={element} />
    }
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
        {elements.map((element) => renderElement(element))}
      </svg>
    </div>
  );
}
 
export default Display;