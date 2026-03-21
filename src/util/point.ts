export interface Point {
	x: number;
	y: number;
}

export interface PointSpec extends Point {
	maxRadius?: number;
}

export function rotatePoints(points: Point[], origin: Point, degrees: number): Point[] {
	const radians = degrees * Math.PI / 180;
	return points.map((point) => {
		const x = point.x - origin.x;
		const y = point.y - origin.y;
		return {
			...point,
			x: x * Math.cos(radians) - y * Math.sin(radians) + origin.x,
			y: x * Math.sin(radians) + y * Math.cos(radians) + origin.y,
		};
	});
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

export function approxEqual(x: number, y: number, epsilon: number = 0.0001): boolean {
	return Math.abs(x - y) <= epsilon;
}