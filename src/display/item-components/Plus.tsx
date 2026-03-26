import type { CanvasPlus } from "../../types/canvas-item";
import { type PointSpec, type Point, rotatePoints } from "../../util/point";
import { computePath } from "../../util/computePath";

const Plus = ({ item }: {
  item: CanvasPlus,
}) => {
  const w = item.armWidth;
  const l = item.armLength
  const origin: Point = {x: 0, y: 0};

  const point0: Point = {x: -w/2, y: -w/2};
  const point1: Point = {x: -w/2, y: -l};
  const point2: Point = {x: w/2, y: -l};

  const patternBase: PointSpec[] = [{...point0, maxRadius: item.strokeWidth/2}, {...point1}, {...point2}]; 

  const rotations = [0, 90, 180, 270];

  const d = computePath(
    rotations.flatMap((angle) => rotatePoints(patternBase, origin, angle)),
    item.radius
  );

  return (
    <path 
      d={d}
      fill={item.fillColor}
      stroke={item.strokeColor}
      strokeWidth={item.strokeWidth}
    />
  );
}
 
export default Plus;