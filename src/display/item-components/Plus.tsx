import type { PlusItem } from "../../types/canvas-item";
import { type PointSpec, type Point, rotatePoints } from "../../util/point";
import { computePath } from "../../util/computePath";
import PathComponent from "../PathComponent";

const Plus = ({ item }: {
  item: PlusItem,
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
 
export default Plus;