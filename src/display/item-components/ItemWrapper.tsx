import type { CanvasItem } from '../../interface/canvas-item';
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import DButton from "./DButton";
import Plus from "./Plus";
import DPad from "./DPad";

const ItemWrapper = ({ canvasItem, isSelected, onMouseDown }: {
    canvasItem: CanvasItem, 
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
  
  const renderCanvasItem = (item: CanvasItem) => {
    switch (item.kind) {
      case 'rectangle':
        return <Rectangle item={item} />
      case 'ellipse':
        return <Ellipse item={item} />
      case 'd-button':
        return <DButton item={item} />
      case 'plus':
        return <Plus item={item} />
      case 'd-pad':
        return <DPad item={item} />
      default:
        const _exhaustiveCheck: never = item;
        return _exhaustiveCheck;
    }
  }
  
  return (
    <g
      onMouseDown={(e) => onMouseDown(e, canvasItem.id)}
      overflow="visible"
      transform={`
        translate(${canvasItem.x}, ${canvasItem.y}) 
        rotate(${canvasItem.rotation})
      `}
      filter={isSelected ? 'drop-shadow(0 0 4px #000000)' : undefined}
    >
      {renderCanvasItem(canvasItem)}
    </g>
  );
}
 
export default ItemWrapper;