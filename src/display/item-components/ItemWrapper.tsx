import type { CanvasItem } from '../../interface/canvas-item';
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import DButton from "./DButton";
import Plus from "./Plus";
import DPad from "./DPad";
import NewDPad from './NewDPad';

const ItemWrapper = ({ canvasItem, isSelected, onMouseDown }: {
    canvasItem: CanvasItem, 
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {
  
  const renderCanvasItem = (item: CanvasItem) => {
    switch (item.kind) {
      case 'rectangle':
        return <Rectangle canvasItem={item} />
      case 'ellipse':
        return <Ellipse canvasItem={item} />
      case 'd-button':
        return <DButton canvasItem={item} />
      case 'plus':
        return <Plus canvasItem={item} />
      case 'd-pad':
        return <NewDPad item={item} />
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