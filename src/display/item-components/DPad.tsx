import type { CanvasDPad } from "../../interface/canvas-item";
import { type Point, rotatePoints, rotatePoints90Deg } from "../../util/rotatePoints";
import { computePath } from "../../util/computePath";

const DPad = ({ item }: {
  item: CanvasDPad
}) => {
  const w = item.armWidth; 
  const l = item.armLength;
  //Correction for tiny gaps between dbutton paths.
  const nudge = Math.SQRT1_2/10;

  const patternUp: Point[] = [{x: -w/2, y: -w/2, maxRadius: item.strokeWidth}, {x: -w/2, y: -l }, {x: w/2, y: -l}];
  const patternRight: Point[] = rotatePoints90Deg(patternUp);
  const patternDown: Point[] = rotatePoints90Deg(patternRight);
  const patternLeft: Point[] = rotatePoints90Deg(patternDown);
  const outlinePoints: Point[] = [...patternUp, ...patternRight, ...patternDown, ...patternLeft];

  const upPoints: Point[] = [{x: -w/2, y: -w/2, maxRadius: 0}, {x: -w/2, y: -l }, {x: w/2, y: -l}, {x: w/2, y: -w/2, maxRadius: 0}];
  const rightPoints: Point[] = rotatePoints90Deg(upPoints);
  const downPoints: Point[] = rotatePoints90Deg(rightPoints);
  const leftPoints: Point[] = rotatePoints90Deg(downPoints);
  

  const dOutline = computePath(outlinePoints, item.radius);
  const dUp = computePath([...upPoints, {x: 0, y: 0, maxRadius: 0}], item.radius);
  const dRight = computePath([...rightPoints, {x: 0, y: 0, maxRadius: 0}], item.radius);
  const dDown = computePath([...downPoints, {x: 0, y: 0, maxRadius: 0}], item.radius);
  const dLeft = computePath([...leftPoints, {x: 0, y: 0, maxRadius: 0}], item.radius);

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