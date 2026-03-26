import type { CanvasEllipse } from "../../types/canvas-item";
import PathComponent from "../PathComponent"

const Ellipse = ({ item }: {
  item: CanvasEllipse,
}) => {
  const w = item.width;
  const h = item.height;
  let d = `M ${-w} 0 ` +
          `A ${w/2} ${h/2} 0 0 0 ${w} 0 ` +
          `A ${w/2} ${h/2} 0 0 0 ${-w} 0 Z`;
  

  return (
    <PathComponent 
      pathString={d}
      fill={item.fillColor}
      stroke={item.strokeColor}
      activeFill={item.activeFill}
      activeStroke={item.activeStroke}
      strokeWidth={item.strokeWidth}
      activeBindings={item.activeBindings}
      moveBinding={item.moveBinding}
    />
  );
}
 
export default Ellipse;