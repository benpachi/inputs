import { useItems, useItemsDispatch } from "../context/useItems";
import { useCallback, useState } from "react";
import ItemWrapper from "./ItemWrapper";
import { isPointInRect, type Point } from "../util/point";
import SelectionFrame from "./SelectionFrame";
import SelectionArea from "./SelectionArea";

const DisplayCanvas = ({width, height}: {
  width: number,
  height: number
}) => {
  const {items, selectedIds} = useItems();
  const dispatch = useItemsDispatch();

  const [itemBBoxes, setItemBBoxes] = useState<Record<string, DOMRect | null>>({});
  const handleBBoxChange = useCallback((id: string, bbox: DOMRect | null) => {
    setItemBBoxes(prev => ({ ...prev, [id]: bbox }));
  }, []);

  const [isDraggingItems, setIsDraggingItems] = useState(false);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});
  const [dragCurrent, setDragCurrent] = useState({x: 0, y: 0});
  const [capturedItemIds, setCapturedItemIds] = useState([] as string[]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch({ type: 'cleared_selections' });
    }
    setIsDraggingCanvas(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setDragStart({ x: offsetX, y: offsetY });
    setDragCurrent({ x: offsetX, y: offsetY });
  }

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

    setIsDraggingItems(true);
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

      const newCapturedItemIds = items.filter(item => 
        isPointInRect({ x: item.x, y: item.y }, dragStart, {x: offsetX, y: offsetY})
        ).map(item => item.id);
      
      const toSelect = newCapturedItemIds.filter(id => !capturedItemIds.includes(id));
      const toDeselect = !e.shiftKey ? capturedItemIds.filter(id => !newCapturedItemIds.includes(id)) : [];

      toSelect.forEach((id) => dispatch({type: 'added_selection', id: id}));
      toDeselect.forEach((id) => dispatch({type: 'removed_selection', id: id}));

      setCapturedItemIds(newCapturedItemIds);
      setDragCurrent({x: offsetX, y: offsetY});
    }
  }

  const handleMouseUp = () => {
    setIsDraggingItems(false);
    setIsDraggingCanvas(false);
    setDragStart({x: 0, y: 0});
    setDragCurrent({x: 0, y: 0});
    setCapturedItemIds([]);
  }

  const handleMouseLeave = () => {
    setIsDraggingItems(false);
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
        });
      }
    }
  }

  const itemComponents: React.ReactElement[] = [];
  const selectionFrames: React.ReactElement[] = [];

  items.forEach((item) => {
    itemComponents.push(
      <ItemWrapper key={item.id} canvasItem={item} onMouseDown={handleMouseDownOnItem} onBBoxChange={handleBBoxChange} />    
    );
    if (selectedIds.includes(item.id)) {
      selectionFrames.push(
        <SelectionFrame key={`sel-${item.id}`} item={item} bbox={itemBBoxes[item.id]} onMouseDown={handleMouseDownOnItem} />
      );
    }
  });

  return ( 
    <svg 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className='canvas' 
      width={width}
      height={height}
    >
      {itemComponents}
      {selectionFrames}
      {isDraggingCanvas ? <SelectionArea p1={dragStart} p2={dragCurrent} /> : null}
    </svg>
  );
}
 
export default DisplayCanvas;