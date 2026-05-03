export interface Point {
	x: number;
	y: number;
}

const origin: Point = {x: 0, y: 0};

export function rotatePoints(points: Point[], degrees: number, center: Point = origin): Point[] {
	const radians = degrees * Math.PI / 180;
	return points.map((point) => {
		const x = point.x - center.x;
		const y = point.y - center.y;
		return {
			...point,
			x: x * Math.cos(radians) - y * Math.sin(radians) + center.x,
			y: x * Math.sin(radians) + y * Math.cos(radians) + center.y,
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