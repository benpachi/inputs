export interface Point {
	x: number;
	y: number;
}

export function rotatePoints(points: Point[], origin: Point, degrees: number): Point[] {
	const radians = degrees * Math.PI / 180;
	return points.map((point) => {
		const x = point.x - origin.x;
		const y = point.y - origin.y;
		return {
			x: x * Math.cos(radians) - y * Math.sin(radians) + origin.x,
			y: x * Math.sin(radians) + y * Math.cos(radians) + origin.y,
		};
	});
}

// Rotates points around the origin clockwise by 90 degrees
export function rotatePoints90Deg(points: Point[]): Point[] {
	return points.map((point) => {
		const x = point.x;
		const y = point.y;
		return {
			x: -y,
			y: x,
		};
	});
}