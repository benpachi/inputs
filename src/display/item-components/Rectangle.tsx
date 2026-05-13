import type { RectangleItem } from "../../types/display-item";
import { computePath, } from "../util/computePath";
import { type PathNode, createNode } from "../util/pathNode";
import PathComponent from "../PathComponent";

const Rectangle = ({ item }: {
  item: RectangleItem,
}) => {
  const w = item.width;
  const h = item.height;

  const nodes: PathNode[] = [];
  nodes.push(createNode({x: -w/2, y: h/2}, item.radius));
  nodes.push(createNode({x: -w/2, y: -h/2}, item.radius));
  nodes.push(createNode({x: w/2, y: -h/2}, item.radius));
  nodes.push(createNode({x: w/2, y: h/2}, item.radius));

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
 
export default Rectangle;