import type { DPadItem } from "../../types/canvas-item";
import { type PointSpec, type Point, rotatePoints } from "../../util/point";
import { computePath } from "../../util/computePath";
import PathComponent from "../PathComponent";

const DPad = ({ item }: {
  item: DPadItem
}) => {
  const w = item.armWidth; 
  const l = item.armLength;
  //Correction for tiny gaps between dbutton paths.
  //const nudge = Math.SQRT1_2/10;
  const origin: Point = {x: 0, y: 0};

  const point0: Point = {x: 0, y: 0};
  const point1: Point = {x: -w/2, y: -w/2};
  const point2: Point = {x: -w/2, y: -l};
  const point3: Point = {x: w/2, y: -l};
  const point4: Point = {x: w/2, y: -w/2};

  const armBase: PointSpec[] = [{...point0, maxRadius: 0}, {...point1, maxRadius: 0}, {...point2}, {...point3}, {...point4, maxRadius: 0}];
  const patternBase: PointSpec[] = [{...point1, maxRadius: item.strokeWidth/2}, {...point2}, {...point3}]; 

  const rotations = [0, 90, 180, 270];
  
  const dOutline = computePath(
    rotations.flatMap((angle) => rotatePoints(patternBase, origin, angle)),
    item.radius
  );

  const dArms = rotations.map((angle) => computePath(rotatePoints(armBase, origin, angle), item.radius));
  const [dUp, dRight, dDown, dLeft] = dArms;


  return ( 
    <>
      <PathComponent 
        pathString={dUp}
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
        pathString={dRight}
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
        pathString={dDown}
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
        pathString={dLeft}
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
        pathString={dOutline}         
        fillOff={'transparent'}
        strokeOff={item.strokeOff}
        fillOn={'transparent'}
        strokeOn={item.strokeOn}
        strokeWidth={item.strokeWidth}
        activeBinding={null}
        moveBinding={item.moveBinding}
        rotation={item.rotation}
      />
    </>
  );
}
 
export default DPad;