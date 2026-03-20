import type { Point } from "./rotatePoints";

interface SimplePoint {
  x: number;
  y: number;
}

function computeDist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

function lerp(a: number, b: number, t: number): number {
  return (a + (b - a) * t);
}

// Representation of a quadratic bézier curve
interface Curve {
  start: SimplePoint;
  control: SimplePoint;
  end: SimplePoint;
}

export function computePath(points: Point[], radius: number): string {
  let d = '';
  let l = points.length;

  const radii = [];
  for (let i = 0; i < l; i++) {
    const max = points[i].maxRadius;
    if (max !== undefined) {
      radii.push({in: Math.min(radius, max), out: Math.min(radius, max)});
    } else {
      radii.push({in: radius, out: radius})
    }
  }

  // Compute final radii between each point
  for (let i = 0; i < l; i++) {
    const currPoint = points[i];
    const nextPoint = points[(i + 1) % l];

    const r1 = radii[i].out;
    const r2 = radii[(i + 1) % l].in;

    const dist = computeDist(currPoint.x, currPoint.y, nextPoint.x, nextPoint.y);
    const total = r1 + r2;

    if (total > dist) {
      const scale = dist/total;
      radii[i].out = r1*scale;
      radii[(i + 1) % l].in = r2*scale;
    }
  }

  const curves: Curve[] = [];
  // Use radii to compute array curve objects
  for (let i = 0; i < l; i++) {
    const prev = (i - 1 + l) % l;
    const curr = i;
    const next = (i + 1) % l;

    //calc start point: compute distance from current point to previous point. derive t value for lerp function. compute coordinates.
    const d1 = computeDist(points[prev].x, points[prev].y, points[curr].x, points[curr].y);
    const t1 = radii[curr].in / d1;
    const start: SimplePoint = {
      x: lerp(points[curr].x, points[prev].x, t1),
      y: lerp(points[curr].y, points[prev].y, t1)
    }

    const control: SimplePoint = {
      x: points[curr].x,
      y: points[curr].y
    }

    const d2 = computeDist(points[next].x, points[next].y, points[curr].x, points[curr].y);
    const t2 = radii[curr].out / d2;
    const end: SimplePoint = {
      x: lerp(points[curr].x, points[next].x, t2),
      y: lerp(points[curr].y, points[next].y, t2)
    }

    const curve: Curve = {
      start: start,
      control: control,
      end: end
    }

    curves.push(curve)
  }

  for (let i = 0; i < curves.length; i++) {
    const curr = curves[i];
    const next = curves[(i + 1) % l];

    if (i === 0) {
      d += `M ${curr.end.x} ${curr.end.y} `
    }

    if ((curr.end.x !== next.start.x) || (curr.end.y !== next.start.y)) {
      d += `L ${next.start.x} ${next.start.y} `
    }

    d += `Q ${next.control.x} ${next.control.y} ${next.end.x} ${next.end.y} `
  }

  //console.log(d);
  return d += 'Z';
}