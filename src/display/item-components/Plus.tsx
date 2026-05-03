import type { PlusItem } from "../../types/canvas-item";
import { type PathNode, createNode, repeatNodePattern, computePath, } from "../../util/computePath";
import PathComponent from "../PathComponent";

const Plus = ({ item }: {
  item: PlusItem,
}) => {
  const w = item.armWidth;
  const l = item.armLength;

  const pattern: PathNode[] = [];
  pattern.push(createNode({x: -w/2, y: -w/2}, item.radius, 0, item.strokeWidth/2));
  pattern.push(createNode({x: -w/2, y: -l}, item.radius));
  pattern.push(createNode({x: w/2, y: -l}, item.radius));

  const nodes: PathNode[] = repeatNodePattern(pattern, 4);

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