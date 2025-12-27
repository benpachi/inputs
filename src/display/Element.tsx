import { getPath } from "../interface/display-item"; 
import type { DisplayItem } from "../interface/display-item";

const Element = ({element, index, onMouseDown}: {
  element: DisplayItem, 
  index: number,
  onMouseDown: (e: React.MouseEvent, index: number) => void;
  }) => {

  return (  
    <svg 
      onMouseDown={(e) => onMouseDown(e, index)}
      width={element.width} 
      height={element.height} 
      transform={`
        translate(${element.x - element.width/2}, ${element.y - element.height/2}) 
        rotate(${element.rotation} ${element.width/2} ${element.height/2})
      `}
    >
      <path 
        d={getPath(element)}
      />
    </svg>
  );
}
 
export default Element;