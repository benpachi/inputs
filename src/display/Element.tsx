import { getPath } from "../interface/display-item"; 
import type { DisplayItem } from "../interface/display-item";

const Element = ({element, isSelected, onMouseDown}: {
  element: DisplayItem, 
  isSelected: boolean,
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {

  return (  
    <g 
      onMouseDown={(e) => onMouseDown(e, element.id)}
      width={element.width} 
      height={element.height} 
      overflow="visible"
      transform={`
        translate(${element.x - element.width/2}, ${element.y - element.height/2}) 
        rotate(${element.rotation} ${element.width/2} ${element.height/2})
      `}
      filter={isSelected ? 'drop-shadow(0 0 4px #000000)' : undefined}
    >
      <path 
        d={getPath(element)}
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </g>
  );
}
 
export default Element;