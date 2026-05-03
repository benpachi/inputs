import { type Point } from "../../util/point";
import { clampValue } from "../../util/math";
import { rotatePoint } from "../../util/point";

// Node on the path with incoming/outgoing radii
export interface PathNode {
  point: Point;
  rIn: number;
  rOut: number;
}

export function createNode(point: Point, radius: number, minRadius?: number, maxRadius?: number): PathNode {
  return {
    point: point,
    rIn: clampValue(radius, minRadius, maxRadius),
    rOut: clampValue(radius, minRadius, maxRadius)
  }
}

export function rotatePathNodes(nodes: PathNode[], degrees: number): PathNode[] {
  return nodes.map((node) => ({
    ...node,
    point: rotatePoint(node.point, degrees)
  }));
}

// Returns an array of PathNode arrays
export function repeatNodePattern(template: PathNode[], degree: number): PathNode[][] {
  const delta = 360 / degree;
  const angles = [];
  for (let degrees = 0; degrees < 360; degrees += delta) {
    angles.push(degrees);
  }
  return angles.map((angle) => rotatePathNodes(template, angle));
}