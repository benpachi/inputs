interface BaseDisplayItem {
  id: string;
  name: string;
  label: string;
  rotation: number;
  x: number;
  y: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
}

export interface EllipseItem extends BaseDisplayItem {
  type: "ellipse";
  width: number;
  height: number;
}

export interface RectangleItem extends BaseDisplayItem {
  type: "rectangle";
  width: number;
  height: number;
}

export interface DPadItem extends BaseDisplayItem {
  type: "d-pad";
  pointLength: number;
  armLength: number;
  armWidth: number;
}

export interface PlusItem extends BaseDisplayItem {
  type: "plus";
  width: number;
  height: number;
  //armLength for each arm
}

export interface ConnectedDPadItem extends BaseDisplayItem {
  type: "connected d-pad";
  width: number;
  height: number;
  //armLength for each arm
  //extra label for each arm
}

export type DisplayItem = EllipseItem | RectangleItem | DPadItem | PlusItem | ConnectedDPadItem;