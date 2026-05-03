import type { PlusItem } from "../../types/canvas-item";
import { computePath, } from "../util/computePath";
import { clampValue } from "../../util/math";
import { type PathNode, createNode, repeatNodePattern } from "../util/pathNode";
import PathComponent from "../PathComponent";

const Plus = ({ item }: {
  item: PlusItem,
}) => {
  const w = item.armWidth;
  const l = item.armLength;

  const plusPattern: PathNode[] = [];
  plusPattern.push(createNode({x: -w/2, y: -w/2}, clampValue(item.radius, 0, item.strokeWidth/2)));
  plusPattern.push(createNode({x: -w/2, y: -l}, item.radius));
  plusPattern.push(createNode({x: w/2, y: -l}, item.radius));
  const nodes: PathNode[] = repeatNodePattern(plusPattern, 4).flat();

  return (
    <PathComponent 
      pathString={computePath(nodes)}
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