import type { EllipseItem } from "../../types/canvas-item";
import PathComponent from "../PathComponent"

const Ellipse = ({ item }: {
  item: EllipseItem,
}) => {
  const w = item.width;
  const h = item.height;
  let d = `M ${-w/2} 0 ` +
          `A ${w/2} ${h/2} 0 0 0 ${w/2} 0 ` +
          `A ${w/2} ${h/2} 0 0 0 ${-w/2} 0 Z`;
  

  return (
    <PathComponent 
      pathString={d}
      fillOff={item.fillOff}
      fillOn={item.fillOn}
      strokeOff={item.strokeOff}
      strokeOn={item.strokeOn}
      strokeWidth={item.strokeWidth}
      activeBinding={item.activeBinding}
      moveBinding={item.moveBinding}
      rotation={item.rotation}
    />
  );
}
 
export default Ellipse;