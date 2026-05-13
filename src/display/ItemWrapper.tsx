import type { DisplayItem } from '../types/display-item';
import Rectangle from "./item-components/Rectangle";
import Ellipse from "./item-components/Ellipse";
import DButton from "./item-components/DButton";
import Plus from "./item-components/Plus";
import DPad from "./item-components/DPad";
import { useRef } from 'react';
import { useBBox } from './hooks/useBoundingBox';

const ItemWrapper = ({ canvasItem, isSelected, onMouseDown }: {
    canvasItem: DisplayItem, 
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {

  const elementRef = useRef<SVGGElement>(null);
  const bbox = useBBox(elementRef);
  // getBBox() 'stroke: true' setting doesn't work, so for now I have to let this component be coupled with its associated item

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
    <g 
      transform={`translate(${canvasItem.x}, ${canvasItem.y})`}
      onMouseDown={(e) => (onMouseDown(e, canvasItem.id))}
      overflow="visible"
    >
      <g ref={elementRef} >
        {renderCanvasItem()}
      </g>
      {bbox && isSelected ? 
        <rect 
          x={bbox.x - canvasItem.strokeWidth/2}
          y={bbox.y - canvasItem.strokeWidth/2}
          width={bbox.width + canvasItem.strokeWidth} 
          height={bbox.height + canvasItem.strokeWidth} 
          stroke='blue'
          fill='transparent'
          opacity='0.8'
        /> : null
      }
    </g>
  );
}
 
export default ItemWrapper;