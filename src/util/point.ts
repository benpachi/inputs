export interface Point {
	x: number;
	y: number;
}

export function rotatePoint(point: Point, degrees: number, center: Point = {x: 0, y: 0}): Point {
	const radians = degrees * Math.PI / 180;
	const x = point.x - center.x;
	const y = point.y - center.y;
	return {
		x: x * Math.cos(radians) - y * Math.sin(radians) + center.x,
		y: x * Math.sin(radians) + y * Math.cos(radians) + center.y,
	};
}

export function pointDist(p1: Point, p2: Point): number {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

export function lerpPoint(p1: Point, p2: Point, t: number): Point {
  return {
		x: p1.x + (p2.x - p1.x) * t,
		y: p1.y + (p2.y - p1.y) * t
	}
}

export function isPointInRect(point: Point, r1: Point, r2: Point): boolean {
	const minX = Math.min(r1.x, r2.x);
	const maxX = Math.max(r1.x, r2.x);
	const minY = Math.min(r1.y, r2.y);
	const maxY = Math.max(r1.y, r2.y);
	
	return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
};