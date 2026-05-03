import { lerpPoint, type Point, pointDist, approxEqual, rotatePoints } from "./point";

// Node on the path with incoming/outgoing radii
export interface PathNode {
  point: Point;
  rIn: number;
  rOut: number;
}

// Representation of a quadratic bézier curve
interface QuadraticBezier {
  start: Point;
  control: Point;
  end: Point;
}

export function createNode(point: Point, radius: number, minRadius?: number, maxRadius?: number): PathNode {
  return {
    point: point,
    rIn: clampValue(radius, minRadius, maxRadius),
    rOut: clampValue(radius, minRadius, maxRadius)
  }
}

export function rotatePathNodes(nodes: PathNode[], degrees: number): PathNode[] {
  const rotatedPoints = rotatePoints(nodes.map(node => node.point), degrees);
  return rotatedPoints.map((point, i) => ({
    point,
    rIn: nodes[i].rIn,
    rOut: nodes[i].rOut
  }));
}

export function repeatNodePattern(template: PathNode[], degree: number): PathNode[] {
  const delta = 360 / degree;
  const angles = [];
  for (let degrees = 0; degrees < 360; degrees += delta) {
    angles.push(degrees);
  }
  return angles.flatMap((angle) => rotatePathNodes(template, angle))
}

// Takes in an ordered array of path nodes with radii, returns an SVG path string
export function computePath(nodes: PathNode[]): string {
  resolveRadii(nodes);
  const curves = computeCurves(nodes);
  return buildPath(curves);
}

// Ensures the radii of adjacent nodes don't exceed the distance between them, scaling them down if needed
// Currently scales the radii of each corner separately
function resolveRadii(nodes: PathNode[]) {
  const l = nodes.length;

  for (let i = 0; i < l; i++) {
    const curr = nodes[i];
    const next = nodes[(i + 1) % l];

    const dist = pointDist(curr.point, next.point);
    const total = curr.rOut + next.rIn;

    if (total > dist) {
      const scale = dist/total;
      curr.rOut *= scale; 
      next.rIn *= scale;
    }
  }
}

// Take in an array of corner objects, return an array of bézier curve representations
function computeCurves(nodes: PathNode[]): QuadraticBezier[] {
  const l = nodes.length;
  return nodes.map((curr, i) => {
    const prev = nodes[(i - 1 + l) % l];
    const next = nodes[(i + 1) % l];

    const distPrev = pointDist(prev.point, curr.point);
    const distNext = pointDist(curr.point, next.point);

    const tPrev = curr.rIn / distPrev;
    const tNext = curr.rOut / distNext;

    return {
      start: lerpPoint(curr.point, prev.point, tPrev),
      control: curr.point,
      end: lerpPoint(curr.point, next.point, tNext)
    }
  });
}

// Given an array of quadratic bezier curves, compute an SVG path string. Connect disconnected curves with straight lines.
function buildPath(curves: QuadraticBezier[]): string {
  const l = curves.length;
  let d = '';

  d += `M ${curves[0].start.x} ${curves[0].start.y} `

  for (let i = 0; i < l; i++) {
    const curr = curves[i];
    const next = curves[(i + 1) % l];

    d += `Q ${curr.control.x} ${curr.control.y} ${curr.end.x} ${curr.end.y} `

    // If the end of this curve is not the start of the next curve, connect them with a line
    if ((!approxEqual(curr.end.x, next.start.x)) || (!approxEqual(curr.end.y, next.start.y))) {
      d += `L ${next.start.x} ${next.start.y} `
    }    
  }

  return d += 'Z';
}

function clampValue(value: number, min?: number, max?: number): number {
  if (min && max && min > max) {
    return value;
  }
  if (min && value < min) {
    value = min;
  }
  if (max && value > max) {
    value = max;
  }
  return value;
}