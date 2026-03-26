import type { CanvasRectangle } from "../../types/canvas-item";
import { type PointSpec, type Point } from "../../util/point";
import { computePath } from "../../util/computePath";

const Rectangle = ({ item }: {
  item: CanvasRectangle,
}) => {
  const w = item.width;
  const h = item.height;

  const point0: Point = {x: -w/2, y: h/2};
  const point1: Point = {x: -w/2, y: -h/2};
  const point2: Point = {x: w/2, y: -h/2};
  const point3: Point = {x: w/2, y: h/2};

  const points: PointSpec[] = [{...point0}, {...point1}, {...point2}, {...point3}];

  const d = computePath(points, item.radius);

  return (
    <path 
      d={d}
      fill={item.fillColor}
      stroke={item.strokeColor}
      strokeWidth={item.strokeWidth}
    />
  );
}
 
export default Rectangle;