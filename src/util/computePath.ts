import type { Point } from "./rotatePoints";

export function computePath(points: Point[], borderRadius?: number): string {
  let d = '';
  let l = points.length;
  d += `M ${points[0].x} ${points[0].y} `
  for (let i = 0; i < l; i++) {
    d += `L ${points[(i + 1) % l].x} ${points[(i + 1) % l].y} `
  }
  d += `Z`;

  return d;
}