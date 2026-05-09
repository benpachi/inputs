import { useItems, useItemsDispatch } from "../context/useItems";
import { useState } from "react";
import ItemWrapper from "./ItemWrapper";
import type { Point } from "../util/point";

const Canvas = () => {
  const {items, selectedIds} = useItems();
  const dispatch = useItemsDispatch();
  const [isDraggingItems, setIsDraggingItems] = useState(false);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [dragCurrent, setDragCurrent] = useState({x: 0, y: 0});

  const handleMouseDownForItems = (e: React.MouseEvent, id: string)  => {
    e.stopPropagation();
    if (!items.find((item) => item.id === id)) return;

    if (!selectedIds.includes(id)) {
      if (e.shiftKey) {
        dispatch({ type: 'added_selection', id: id });
      } else {
        dispatch({ type: 'set_single_selection', id: id });
      }
    }

    setIsDraggingItems(true);
  }

  const handleMouseDownForCanvas = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch({ type: 'cleared_selections' });
    }
    setIsDraggingCanvas(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setDragStart({ x: offsetX, y: offsetY });
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDraggingItems) {
      const { movementX, movementY } = e.nativeEvent;

      moveSelectedItems({ 
        x: -movementX, 
        y: -movementY 
      });
    } else if (isDraggingCanvas) {
      const { offsetX, offsetY } = e.nativeEvent;
      setDragCurrent({x: offsetX, y: offsetY});
    }
  }

  const handleMouseUp = () => {
    setIsDraggingItems(false);
    setIsDraggingCanvas(false);
  }

  const moveSelectedItems = (vector: Point) => {
    for (const id of selectedIds) {
      const selectedItem = items.find((item) => item.id === id);
      if (selectedItem) {
        dispatch({
          type: 'changed_item',
          item: {
            ...selectedItem,
            x: selectedItem.x - vector.x,
            y: selectedItem.y - vector.y
          }
        })
      }

    }
  }

  return ( 
    <svg 
      onMouseDown={handleMouseDownForCanvas}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      className='canvas' 
      width='640' 
      height='360'
    >
      {items.map((item) => 
        <ItemWrapper 
          key={item.id}
          isSelected={selectedIds.includes(item.id)} 
          onMouseDown={handleMouseDownForItems} 
          canvasItem={item}/>
      )}
    </svg>
  );
}
 
export default Canvas;