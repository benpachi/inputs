import type { RectangleItem } from "../../types/canvas-item";
import { type PointSpec, type Point } from "../../util/point";
import { computePath } from "../../util/computePath";
import PathComponent from "../PathComponent";

const Rectangle = ({ item }: {
  item: RectangleItem,
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
    <PathComponent 
      pathString={d}
      fillOff={item.fillOff}
      strokeOff={item.strokeOff}
      fillOn={item.fillOn}
      strokeOn={item.strokeOn}
      strokeWidth={item.strokeWidth}
      activeBinding={item.activeBinding}
      moveBinding={item.moveBinding}
      rotation={item.rotation}
    />
  );
}
 
export default Rectangle;