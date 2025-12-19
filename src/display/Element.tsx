import type { Shape } from "../shapes/shape";

const Element = ({element}: {element: Shape}) => {
  return (  
    <svg 
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