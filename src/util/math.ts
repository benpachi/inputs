export function clampValue(value: number, min?: number, max?: number): number {
  if (min !== undefined && max !== undefined && min > max) {
    return value;
  }
  if (min !== undefined && value < min) {
    value = min;
  }
  if (max !== undefined && value > max) {
    value = max;
  }
  return value;
}

export function approxEqual(x: number, y: number, epsilon: number = 0.0001): boolean {
	return Math.abs(x - y) <= epsilon;
}