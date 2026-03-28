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
  moveBinding: StickMoveBinding;
}

interface PathSimple extends PathBase {
  activeBinding: ActiveBinding;
}

export interface EllipseItem extends PathSimple {
  kind: "ellipse";
  width: number;
  height: number;
}

export interface RectangleItem extends PathSimple {
  kind: "rectangle";
  width: number;
  height: number;
}

export interface DButtonItem extends PathSimple {
  kind: "d-button";
  pointLength: number;
  armLength: number;
  armWidth: number;
}

export interface PlusItem extends PathSimple {
  kind: "plus";
  armLength: number;
  armWidth: number;
}

export interface DPadItem extends PathBase {
  kind: "d-pad";
  armLength: number;
  armWidth: number;
  upActiveBinding: ActiveBinding;
  rightActiveBinding: ActiveBinding;
  downActiveBinding: ActiveBinding;
  leftActiveBinding: ActiveBinding;
}

export type CanvasItem = EllipseItem | RectangleItem | DButtonItem | PlusItem | DPadItem;