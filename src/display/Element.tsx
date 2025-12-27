import { getPath } from "../interface/display-item"; 
import type { DisplayItem } from "../interface/display-item";

const Element = ({element, onMouseDown}: {
  element: DisplayItem, 
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  }) => {

  return (  
    <svg 
      onMouseDown={(e) => onMouseDown(e, element.id)}
      width={element.width} 
      height={element.height} 
      overflow="visible"
      transform={`
        translate(${element.x - element.width/2}, ${element.y - element.height/2}) 
        rotate(${element.rotation} ${element.width/2} ${element.height/2})
      `}
    >
      <path 
        d={getPath(element)}
        fill={element.fillColor}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
      />
    </svg>
  );
}
 
export default Element;