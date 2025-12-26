import { getPath } from "../interface/display-item"; 
import type { DisplayItem } from "../interface/display-item";

const Element = ({element, index, selectElement}: {
  element: DisplayItem, 
  index: number,
  selectElement: (index: number) => void;
  }) => {

  return (  
    <svg 
      onClick={() => selectElement(index)}
      width={element.width} 
      height={element.height} 
      transform={
        `translate(${element.x - element.width/2}, ${element.y - element.height/2})`
      }
    >
      <path d={getPath(element)}/>
    </svg>
  );
}
 
export default Element;