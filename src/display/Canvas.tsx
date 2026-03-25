import { useItems, useItemsDispatch } from "../context/ItemsContext";
import { useState } from "react";
import ItemWrapper from "./ItemWrapper";

const Canvas = () => {
  const {items, selectedId} = useItems();
  const dispatch = useItemsDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const selectedItem = items.find((i) => i.id === selectedId);

  const handleMouseDown = (e: React.MouseEvent, id: string)  => {
    const { offsetX, offsetY } = e.nativeEvent;
    const item = items.find((i) => i.id === id);
    
    if (!item) return;
    
    setIsDragging(true);
    dispatch({ type: 'selected', itemId: id });
    setDragOffset({ 
      x: offsetX - item.x, 
      y: offsetY - item.y 
    });
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedItem) return;

    const { offsetX, offsetY } = e.nativeEvent;

    dispatch({
      type: 'changed', 
      item: {
        ...selectedItem, 
        x: offsetX - dragOffset.x, 
        y: offsetY - dragOffset.y,
      }
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
        {items.map((item) => 
          <ItemWrapper key={item.id} isSelected={selectedId === item.id} onMouseDown={handleMouseDown} canvasItem={item}/>
        )}
      </svg>
    </div>
  );
}
 
export default Canvas;