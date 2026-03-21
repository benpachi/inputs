import type { CanvasDPad } from "../../interface/canvas-item";
import { type PointSpec, type Point, rotatePoints } from "../../util/point";
import { computePath } from "../../util/computePath";

const DPad = ({ item }: {
  item: CanvasDPad
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
  const [dUp, dRight, dLeft, dDown] = dArms;


  return ( 
    <>
      <path 
        d={dUp}
        fill='purple'
      />
      <path 
        d={dRight}
        fill='green'
      />
      <path 
        d={dDown}
        fill='blue'
      />
      <path 
        d={dLeft}
        fill='brown'
      />
      <path 
        d={dOutline}         
        fill={'transparent'}
        stroke={item.strokeColor}
        strokeWidth={item.strokeWidth}
      />
    </>
  );
}
 
export default DPad;