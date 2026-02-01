import type { ReactNode } from 'react';
import type { CanvasItem } from '../../interface/canvas-item';

//Wrapper for display components.
//Width and height are defined in the parent component in the case that width/height are uniquely derived.
//I feel like I'm gonna just refactor this later but let me be a dumbass.

const CanvasGroup = ({ canvasItem, width, height, isSelected, onMouseDown, children }: {
    canvasItem: CanvasItem, 
    width: number,
    height: number,
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    children: ReactNode;
  }) => {
  return (
    <g
      onMouseDown={(e) => onMouseDown(e, canvasItem.id)}
      width={width} 
      height={height} 
      overflow="visible"
      transform={`
        translate(${canvasItem.x - width/2}, ${canvasItem.y - height/2}) 
        rotate(${canvasItem.rotation} ${width/2} ${height/2})
      `}
      filter={isSelected ? 'drop-shadow(0 0 4px #000000)' : undefined}
    >
      {children}
      <text x={width/2} y={height/2} fill='white'>{canvasItem.label}</text>
    </g>
  );
}
 
export default CanvasGroup;