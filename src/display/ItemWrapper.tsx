import type { DisplayItem } from '../types/display-item';
import Rectangle from "./item-components/Rectangle";
import Ellipse from "./item-components/Ellipse";
import DButton from "./item-components/DButton";
import Plus from "./item-components/Plus";
import DPad from "./item-components/DPad";
import { useEffect, useRef } from 'react';
import { useBBox } from './hooks/useBoundingBox';

const ItemWrapper = ({ canvasItem, onMouseDown, onBBoxChange }: {
    canvasItem: DisplayItem, 
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    onBBoxChange: (id: string, bbox: DOMRect | null) => void;
  }) => {

  const elementRef = useRef<SVGGElement>(null);
  const bbox = useBBox(elementRef);

  useEffect(() => {
    onBBoxChange(canvasItem.id, bbox);
  }, [bbox, canvasItem.id, onBBoxChange])

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
      ref={elementRef}
      transform={`translate(${canvasItem.x}, ${canvasItem.y})`}
      onMouseDown={(e) => (onMouseDown(e, canvasItem.id))}
      overflow="visible"
    >
      {renderCanvasItem()}
    </g>
  );
}
 
export default ItemWrapper;