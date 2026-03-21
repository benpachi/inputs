import type { CanvasEllipse } from "../../interface/canvas-item";

const Ellipse = ({ item }: {
  item: CanvasEllipse,
}) => {
  return (
    <ellipse
      rx={item.width/2}
      ry={item.height/2}
      fill={item.fillColor}
      stroke={item.strokeColor}
      strokeWidth={item.strokeWidth}
    />
  );
}
 
export default Ellipse;