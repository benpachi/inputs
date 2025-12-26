import type { DisplayItem } from "../interface/display-item";
import Element from "./Element";

const Display = ({elements, selectElement}: {
  elements: DisplayItem[];
  selectElement: (index: number) => void;
  }) => {

  return ( 
    <div className='display-panel'>
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