import type { CanvasDButton } from "../../interface/canvas-item";
import { type PointSpec, type Point } from "../../util/point";
import { computePath } from "../../util/computePath";

const DButton = ({ item }: {
  item: CanvasDButton
}) => {
  const w = item.armWidth;
  const l = item.armLength;
  const p = item.pointLength;

  const point0: Point = {x: 0, y: 0};
  const point1: Point = {x: -w/2, y: p};
  const point2: Point = {x: -w/2, y: (p+l)};
  const point3: Point = {x: w/2, y: (p+l)};
  const point4: Point = {x: w/2, y: p};

  const points: PointSpec[] = [{...point0}, {...point1}, {...point2}, {...point3}, {...point4}];

  const centeredPoints: PointSpec[] = points.map((point) => {
    const x = point.x;
    const y = point.y - (l+p)/2
    return {
      ...point,
      x: x,
      y: y
    }
  });

  const d = computePath(centeredPoints, item.radius);

  return (
    <path 
      d={d}
      fill={item.fillColor}
      stroke={item.strokeColor}
      strokeWidth={item.strokeWidth}
    />
  );
}
 
export default DButton;