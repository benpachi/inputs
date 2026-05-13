import { type DisplayItem } from "../types/display-item";

// Draws the UI element indicating an item is selected.
const SelectionFrame = ({ item, bbox, onMouseDown }: {
  item: DisplayItem, 
  bbox: DOMRect | null,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
}) => {
  if (!bbox) return null;
  else return (
    <rect 
      x={bbox.x - item.strokeWidth/2}
      y={bbox.y - item.strokeWidth/2}
      transform={`translate(${item.x}, ${item.y})`}
      width={bbox.width + item.strokeWidth} 
      height={bbox.height + item.strokeWidth} 
      stroke='blue'
      fill='transparent'
      opacity='0.8'
      onMouseDown={(e) => onMouseDown(e, item.id)}
    />
  );
}
 
export default SelectionFrame;