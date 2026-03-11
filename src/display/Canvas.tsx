import { useItems, useItemsDispatch } from "../context/ItemsContext";
import { useState } from "react";
import type { CanvasItem } from "../interface/canvas-item";
import Rectangle from "./item-components/Rectangle";
import Ellipse from "./item-components/Ellipse";
import DButton from "./item-components/DButton";
import Plus from "./item-components/Plus";
import DPad from "./item-components/DPad";

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

  const renderCanvasItem = (item: CanvasItem) => {
    const props = {
      key: item.id,
      isSelected: selectedId === item.id,
      onMouseDown: handleMouseDown,
    };
    switch (item.kind) {
      case 'rectangle':
        return <Rectangle {...props} canvasItem={item} />
      case 'ellipse':
        return <Ellipse {...props} canvasItem={item} />
      case 'd-button':
        return <DButton {...props} canvasItem={item} />
      case 'plus':
        return <Plus {...props} canvasItem={item} />
      case 'd-pad':
        return <DPad {...props} canvasItem={item} />
      default:
        const _exhaustiveCheck: never = item;
        return _exhaustiveCheck;
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
        {items.map((item) => renderCanvasItem(item))}
      </svg>
    </div>
  );
}
 
export default Canvas;