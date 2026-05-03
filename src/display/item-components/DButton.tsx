import type { DButtonItem } from "../../types/canvas-item";
import { createNode, computePath, type PathNode } from "../../util/computePath";
import PathComponent from "../PathComponent";

const DButton = ({ item }: {
  item: DButtonItem
}) => {
  const w = item.armWidth;
  const l = item.armLength;
  const p = item.pointLength;

  const nodes: PathNode[] = [];
  nodes.push(createNode({x: 0, y: 0}, item.radius));
  nodes.push(createNode({x: -w/2, y: p}, item.radius));
  nodes.push(createNode({x: -w/2, y: (p+l)}, item.radius));
  nodes.push(createNode({x: w/2, y: (p+l)}, item.radius));
  nodes.push(createNode({x: w/2, y: p}, item.radius));

  // Center the shape vertically about the origin
  const offset = l + p / 2
  nodes.forEach((node) => {
    node.point.y -= offset
  });

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
 
export default DButton;