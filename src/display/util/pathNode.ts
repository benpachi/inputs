import { type Point } from "../../util/point";
import { rotatePoint } from "../../util/point";

// Node on the path with incoming/outgoing radii
export interface PathNode {
  point: Point;
  rIn: number;
  rOut: number;
}

// Constructs a PathNode object given a single radius or two specific incoming/outgoing radii
export function createNode(point: Point, radius: number): PathNode;
export function createNode(point: Point, radiusIn: number, radiusOut: number): PathNode;
export function createNode(point: Point, radiusOrRadiusIn: number, radiusOut?: number): PathNode {
  if (radiusOut !== undefined) {
    return {
      point: point,
      rIn: radiusOrRadiusIn,
      rOut: radiusOut
    }
  } else {
    return {
      point: point,
      rIn: radiusOrRadiusIn,
      rOut: radiusOrRadiusIn
    }
  }
}

export function rotatePathNodes(nodes: PathNode[], degrees: number): PathNode[] {
  return nodes.map((node) => ({
    ...node,
    point: rotatePoint(node.point, degrees)
  }));
}

// Returns an array of PathNode arrays, repeated in a circular pattern about the origin
export function repeatNodePattern(template: PathNode[], degree: number): PathNode[][] {
  const delta = 360 / degree;
  const angles = [];
  for (let degrees = 0; degrees < 360; degrees += delta) {
    angles.push(degrees);
  }
  return angles.map((angle) => rotatePathNodes(template, angle));
}