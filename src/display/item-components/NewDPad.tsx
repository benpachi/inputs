import type { CanvasDPad } from "../../interface/canvas-item";
import { type Point, rotatePoints, rotatePoints90Deg } from "../../util/rotatePoints";
import { computePath } from "../../util/computePath";

const NewDPad = ({ item }: {
  item: CanvasDPad
}) => {
  const w = item.armWidth; 
  const l = item.armLength;
  //Correction for tiny gaps between dbutton paths.
  const nudge = Math.SQRT1_2/10;

  let upPoints: Point[] = [{x: -w/2, y: -w/2}, {x: -w/2, y: -l}, {x: w/2, y: -l}, {x: w/2, y: -w/2}];
  let rightPoints: Point[] = rotatePoints90Deg(upPoints);
  let downPoints: Point[] = rotatePoints90Deg(rightPoints);
  let leftPoints: Point[] = rotatePoints90Deg(downPoints);
  let outlinePoints: Point[] = [...upPoints, ...rightPoints, ...downPoints, ...leftPoints];

  const dOutline = computePath(outlinePoints);
  const dUp = computePath([...upPoints, {x: 0, y: 0}]);
  const dRight = computePath([...rightPoints, {x: 0, y: 0}]);
  const dDown = computePath([...downPoints, {x: 0, y: 0}]);
  const dLeft = computePath([...leftPoints, {x: 0, y: 0}]);

  return ( 
    <>
      <path 
        d={dOutline}         
        fill={'transparent'}
        stroke={item.strokeColor}
        strokeWidth={item.strokeWidth}
      />
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
    </>
  );
}
 
export default NewDPad;