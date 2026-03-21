import { lerpPoint, type Point, type PointSpec, pointDist } from "./point";

// Representation of a quadratic bézier curve
interface Curve {
  start: Point;
  control: Point;
  end: Point;
}

interface Corner {
  x: number;
  y: number;
  rIn: number;
  rOut: number;
}

export function computePath(points: PointSpec[], radius: number): string {
const corners: Corner[] = points.map((p) => {
    const r = (p.maxRadius != null) ? Math.min(radius, p.maxRadius) : radius;
    return { x: p.x, y: p.y, rIn: r, rOut: r };
  });
  resolveRadii(corners);
  const curves = computeCurves(corners);
  return buildPath(curves);
}

function resolveRadii(corners: Corner[]) {
  let l = corners.length;

  for (let i = 0; i < l; i++) {
    const curr = corners[i];
    const next = corners[(i + 1) % l];

    const dist = pointDist(curr, next);
    const total = curr.rOut + next.rIn;

    if (total > dist) {
      const scale = dist/total;
      curr.rOut *= scale; 
      next.rIn *= scale;
    }
  }
}

function computeCurves(corners: Corner[]): Curve[] {
  const l = corners.length;
  return corners.map((curr, i) => {
    const prev = corners[(i - 1 + l) % l];
    const next = corners[(i + 1) % l];

    const distPrev = pointDist(prev, curr);
    const distNext = pointDist(curr, next);

    const tPrev = curr.rIn / distPrev;
    const tNext = curr.rOut / distNext;

    return {
      start: lerpPoint(curr, prev, tPrev),
      control: { x: curr.x, y: curr.y },
      end: lerpPoint(curr, next, tNext)
    }
  });
}

function buildPath(curves: Curve[]): string {
  const l = curves.length;
  let d = '';

  d += `M ${curves[0].end.x} ${curves[0].end.y} `

  for (let i = 0; i < l; i++) {
    const curr = curves[i];
    const next = curves[(i + 1) % l];

    if ((curr.end.x !== next.start.x) || (curr.end.y !== next.start.y)) {
      d += `L ${next.start.x} ${next.start.y} `
    }

    d += `Q ${next.control.x} ${next.control.y} ${next.end.x} ${next.end.y} `
  }

  return d += 'Z';
}