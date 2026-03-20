interface BaseCanvasItem {
  id: string;
  name: string;
  label: string;
  rotation: number;
  x: number;
  y: number;
  radius: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
}

export interface CanvasEllipse extends BaseCanvasItem {
  kind: "ellipse";
  width: number;
  height: number;
}

export interface CanvasRectangle extends BaseCanvasItem {
  kind: "rectangle";
  width: number;
  height: number;
}

export interface CanvasDButton extends BaseCanvasItem {
  kind: "d-button";
  pointLength: number;
  armLength: number;
  armWidth: number;
}

export interface CanvasPlus extends BaseCanvasItem {
  kind: "plus";
  armLength: number;
  armWidth: number;
}

export interface CanvasDPad extends BaseCanvasItem {
  kind: "d-pad";
  armLength: number;
  armWidth: number;
}

export type CanvasItem = CanvasEllipse | CanvasRectangle | CanvasDButton | CanvasPlus | CanvasDPad;