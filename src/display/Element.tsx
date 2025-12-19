import type { Shape } from "../shapes/shape";

const Element = ({element, index, selectElement}: {
  element: Shape, 
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
      <path d={element.getPath()}/>
    </svg>
  );
}
 
export default Element;