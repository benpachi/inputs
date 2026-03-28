import { type ActiveBinding, type StickMoveBinding } from './binding';

// Properties shared by all canvas items
interface ItemBase {
  id: string;
  name: string;
  label: string;
  rotation: number;
  x: number;
  y: number;
}

// Properties shared by items representing path elements
interface PathBase extends ItemBase {
  radius: number;
  strokeWidth: number;
  fillOff: string;
  fillOn: string;
  strokeOff: string;
  strokeOn: string;
}

export interface EllipseItem extends PathBase {
  kind: "ellipse";
  width: number;
  height: number;
  activeBinding?: ActiveBinding;
  moveBinding?: StickMoveBinding;
}

export interface RectangleItem extends PathBase {
  kind: "rectangle";
  width: number;
  height: number;
  activeBinding: ActiveBinding;
  moveBinding: StickMoveBinding;
}

export interface DButtonItem extends PathBase {
  kind: "d-button";
  pointLength: number;
  armLength: number;
  armWidth: number;
  activeBinding: ActiveBinding;
  moveBinding: StickMoveBinding;
}

export interface PlusItem extends PathBase {
  kind: "plus";
  armLength: number;
  armWidth: number;
  activeBinding: ActiveBinding;
  moveBinding: StickMoveBinding;
}

export interface DPadItem extends PathBase {
  kind: "d-pad";
  armLength: number;
  armWidth: number;
  moveBinding: StickMoveBinding;
  activeBinding: ActiveBinding;
  /*upActiveBinding: ActiveBinding;
  rightActiveBinding: ActiveBinding;
  downActiveBinding: ActiveBinding;
  leftActiveBinding: ActiveBinding;*/
}

export type CanvasItem = EllipseItem | RectangleItem | DButtonItem | PlusItem | DPadItem;