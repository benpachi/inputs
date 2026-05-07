import { useItems, useItemsDispatch } from "../context/useItems";
import { useState } from "react";
import ItemWrapper from "./ItemWrapper";
import type { Point } from "../util/point";

const Canvas = () => {
  const {items, selectedIds} = useItems();
  const dispatch = useItemsDispatch();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDownOnItem = (e: React.MouseEvent, id: string)  => {
    e.stopPropagation();
    if (!items.find((item) => item.id === id)) return;

    if (!selectedIds.includes(id)) {
      if (e.shiftKey) {
        dispatch({ type: 'added_selection', id: id });
      } else {
        dispatch({ type: 'set_single_selection', id: id });
      }
    }

    setIsDragging(true);
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) return;

    const { movementX, movementY } = e.nativeEvent;

    moveSelectedItems({ 
      x: -movementX, 
      y: -movementY 
    });
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  }

  const moveSelectedItems = (vector: Point) => {
    for (const id of selectedIds) {
      console.log(id);
      const selectedItem = items.find((item) => item.id === id);
      if (selectedItem) {
        console.log('hello');
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
      onMouseDown={() => dispatch({ type: 'cleared_selections' })}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      className='canvas' 
      width='640' 
      height='360'
    >
      {items.map((item) => 
        <ItemWrapper key={item.id} isSelected={selectedIds.includes(item.id)} onMouseDown={handleMouseDownOnItem} canvasItem={item}/>
      )}
    </svg>
  );
}
 
export default Canvas;