import type { Point } from "../util/point";

const SelectionArea = ({p1, p2}: {
  p1: Point,
  p2: Point
}) => {
  return (
    <rect 
      x={Math.min(p1.x, p2.x)}
      y={Math.min(p1.y, p2.y)}
      width={Math.abs(p2.x - p1.x)}
      height={Math.abs(p2.y - p1.y)}
      fill="blue"
      opacity='0.2'
    />
  );
}
 
export default SelectionArea;