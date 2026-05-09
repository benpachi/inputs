import type { CanvasItem } from '../types/canvas-item';
import Rectangle from "./item-components/Rectangle";
import Ellipse from "./item-components/Ellipse";
import DButton from "./item-components/DButton";
import Plus from "./item-components/Plus";
import DPad from "./item-components/DPad";
import { useRef } from 'react';
import { useBBox } from './hooks/useBoundingBox';

const ItemWrapper = ({ canvasItem, isSelected, onMouseDown }: {
    canvasItem: CanvasItem, 
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {

  const elementRef = useRef<SVGGElement>(null);
  const bbox = useBBox(elementRef, canvasItem);

  const renderCanvasItem = () => {
    switch (canvasItem.kind) {
      case 'rectangle':
        return <Rectangle item={canvasItem} />
      case 'ellipse':
        return <Ellipse item={canvasItem} />
      case 'd-button':
        return <DButton item={canvasItem} />
      case 'plus':
        return <Plus item={canvasItem} />
      case 'd-pad':
        return <DPad item={canvasItem} />
      default: {
        const _exhaustiveCheck: never = canvasItem;
        return _exhaustiveCheck;
      }
    }
  }

  return (
    <>
      {bbox && isSelected ? 
        <g transform={`translate(${canvasItem.x}, ${canvasItem.y})`}>
          <rect 
            x={bbox.x - canvasItem.strokeWidth/2}
            y={bbox.y - canvasItem.strokeWidth/2}
            width={bbox.width + canvasItem.strokeWidth} 
            height={bbox.height + canvasItem.strokeWidth} 
            stroke='blue' 
            fill='transparent'
          />
        </g>
      : <></>}
      <g
        ref={elementRef}
        onMouseDown={(e) => onMouseDown(e, canvasItem.id)}
        overflow="visible"
        transform={`
          translate(${canvasItem.x}, ${canvasItem.y}) 
        `}
      >
        {renderCanvasItem()}
      </g>
    </>
  );
}
 
export default ItemWrapper;