import type { DPadItem } from "../../types/canvas-item";
import { type Point } from "../../util/point";
import { type PathNode, createNode, rotatePathNodes, repeatNodePattern, computePath } from "../../util/computePath";
import PathComponent from "../PathComponent";

const DPad = ({ item }: {
  item: DPadItem
}) => {
  const w = item.armWidth; 
  const l = item.armLength;
  //Correction for tiny gaps between dbutton paths.
  const nudge = Math.SQRT1_2/2;

  const points: Point[] = [];
  points.push({x: 0, y: 0 + nudge});
  points.push({x: -w/2, y: -w/2 + nudge});
  points.push({x: -w/2, y: -l});
  points.push({x: w/2, y: -l});
  points.push({x: w/2, y: -w/2 + nudge});

  const dButtonTemplate: PathNode[] = [];
  dButtonTemplate.push(createNode(points[0], item.radius, 0, 0));
  dButtonTemplate.push(createNode(points[1], item.radius, 0, 0));
  dButtonTemplate.push(createNode(points[2], item.radius));
  dButtonTemplate.push(createNode(points[3], item.radius));
  dButtonTemplate.push(createNode(points[4], item.radius, 0, 0));

  // todo: just put this in a function
  const delta = 360 / 4;
  const angles = [];
  for (let degrees = 0; degrees < 360; degrees += delta) {
    angles.push(degrees);
  }
  const [upNodes, rightNodes, downNodes, leftNodes] = angles.map((angle) => rotatePathNodes(dButtonTemplate, angle));

  const borderPattern: PathNode[] = [];
  borderPattern.push(createNode(points[1], item.radius, 0, item.strokeWidth/2));
  borderPattern.push(createNode(points[2], item.radius));
  borderPattern.push(createNode(points[3], item.radius));

  const borderNodes = repeatNodePattern(borderPattern, 4);

  return ( 
    <>
      <PathComponent 
        pathString={computePath(upNodes)}
        fillOff={item.fillOff}
        strokeOff={'transparent'}
        fillOn={item.fillOn}
        strokeOn={'transparent'}
        strokeWidth={item.strokeWidth}
        activeBinding={item.upActiveBinding}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
      <PathComponent 
        pathString={computePath(rightNodes)}
        fillOff={item.fillOff}
        strokeOff={'transparent'}
        fillOn={item.fillOn}
        strokeOn={'transparent'}
        strokeWidth={item.strokeWidth}
        activeBinding={item.rightActiveBinding}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
      <PathComponent 
        pathString={computePath(downNodes)}
        fillOff={item.fillOff}
        strokeOff={'transparent'}
        fillOn={item.fillOn}
        strokeOn={'transparent'}
        strokeWidth={item.strokeWidth}
        activeBinding={item.downActiveBinding}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
      <PathComponent 
        pathString={computePath(leftNodes)}
        fillOff={item.fillOff}
        strokeOff={'transparent'}
        fillOn={item.fillOn}
        strokeOn={'transparent'}
        strokeWidth={item.strokeWidth}
        activeBinding={item.leftActiveBinding}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
      <PathComponent 
        pathString={computePath(borderNodes)}         
        fillOff={'transparent'}
        strokeOff={item.strokeOff}
        fillOn={'transparent'}
        strokeOn={item.strokeOn}
        strokeWidth={item.strokeWidth}
        activeBinding={item.strokeActiveBinding}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
    </>
  );
}
 
export default DPad;