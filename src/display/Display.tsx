import { Shape } from "../shapes/shape";
import { Ellipse } from "../shapes/ellipse";
import Element from "./Element";

const Display = ({elements}: {elements: Shape[]}) => {
  return ( 
    <div className='display-card'>
      <svg className='canvas' width='400' height='300'>
        {elements.map((element, index) => (
          <Element 
            key={index}
          />
        ))}
      </svg>
    </div>
  );
}
 
export default Display;