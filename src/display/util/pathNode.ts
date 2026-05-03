import { type Point, rotatePoint } from "../../util/point";

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

// Returns an array of PathNode arrays, repeated in a circular pattern about the origin.
// The degree is the number of times the pattern is to be repeated.
export function repeatNodePattern(pattern: PathNode[], degree: number): PathNode[][] {
  const angle = 360 / degree;
  const patternArray = [];
  for (let degrees = 0; degrees < 360; degrees += angle) {
    patternArray.push(rotatePathNodes(pattern, degrees));
  }
  return patternArray;
}