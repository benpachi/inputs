import Element from "./Element";
import { useDisplay } from "../context/DisplayContext";

const Display = () => {
  const { elements, selectElement } = useDisplay();

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