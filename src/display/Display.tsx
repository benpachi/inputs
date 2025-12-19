import { Shape } from "../shapes/shape";
import Element from "./Element";

const Display = ({elements, selectElement}: {
  elements: Shape[];
  selectElement: (index: number) => void;
  }) => {

  return ( 
    <div className='display-card'>
      <svg className='canvas' width='400' height='300'>
        {elements.map((element, index) => (
          <Element
            selectElement={selectElement} 
            element={element}
            index={index}
            key={index}
          />
        ))}
      </svg>
    </div>
  );
}
 
export default Display;