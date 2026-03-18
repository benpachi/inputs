import type { Point } from "./rotatePoints";

export function computePath(points: Point[], borderRadius?: number): string {
  let d = '';
  let l = points.length;

  // Starting position
  d += `M ${points[0].x} ${points[0].y} `
  
  // Draw lines between all points in the array, creating a cycle
  for (let i = 0; i < l; i++) {
    let curr = points[i];
    let next = points[(i + 1) % l];
    // Skip repeated points if they appear
    if ((curr.x !== next.x) || (curr.y !== next.y)){
      d += `L ${next.x} ${next.y} `
    }
  }

  return d += 'Z';
}