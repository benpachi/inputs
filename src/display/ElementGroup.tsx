import type { ReactNode } from 'react';
import type { DisplayItem } from '../interface/display-item';

//Wrapper for display elements.
//Width and height are defined in the parent component in the case that width/height are uniquely derived.
//I feel like I'm gonna just refactor this later but let me be a dumbass.

const ElementGroup = ({ element, width, height, isSelected, onMouseDown, children }: {
    element: DisplayItem, 
    width: number,
    height: number,
    isSelected: boolean,
    onMouseDown: (e: React.MouseEvent, id: string) => void;
    children: ReactNode;
  }) => {
  return (
    <g
      onMouseDown={(e) => onMouseDown(e, element.id)}
      width={width} 
      height={height} 
      overflow="visible"
      transform={`
        translate(${element.x - width/2}, ${element.y - height/2}) 
        rotate(${element.rotation} ${width/2} ${height/2})
      `}
      filter={isSelected ? 'drop-shadow(0 0 4px #000000)' : undefined}
    >
      {children}
    </g>
  );
}
 
export default ElementGroup;