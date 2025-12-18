import { Shape } from "./shapes/shape";
import { Ellipse } from "./shapes/ellipse";

const Config = ({addElement}: {addElement: (shape: Shape) => void}) => {
  return ( 
    <div className='config-card'>
      <button onClick={() => addElement(new Ellipse)}>add</button>
    </div>
  );
}
 
export default Config;