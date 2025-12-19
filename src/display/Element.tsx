import type { Shape } from "../shapes/shape";

const Element = ({element}: {element: Shape}) => {
  return (  
    <svg width="100" height="100">
      <path d={element.getPath()}/>
    </svg>
  );
}
 
export default Element;