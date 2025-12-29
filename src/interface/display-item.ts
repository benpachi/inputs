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

interface EllipseItem extends BaseDisplayItem {
  type: "ellipse";
  width: number;
  height: number;
}

interface RectangleItem extends BaseDisplayItem {
  type: "rectangle";
  width: number;
  height: number;
}

interface DPadItem extends BaseDisplayItem {
  type: "d-pad";
  width: number;
  height: number;
  //pointLength
  //armLength
}

interface PlusItem extends BaseDisplayItem {
  type: "plus";
  width: number;
  height: number;
  //armLength for each arm
}

interface ConnectedDPadItem extends BaseDisplayItem {
  type: "connected d-pad";
  width: number;
  height: number;
  //armLength for each arm
  //extra label for each arm
}

export type DisplayItem = EllipseItem | RectangleItem | DPadItem;

//Soon every display item won't necessarily be associated with a single SVG path.
//Will probably move path logic to the components.
export function getPath(item: DisplayItem) {
  switch (item.type) {
    case "ellipse":
      return `M 0 ${item.height/2} ` +
      `A ${item.width/2} ${item.height/2} 0 0 0 ${item.width} ${item.height/2} ` +
      `A ${item.width/2} ${item.height/2} 0 0 0 0 ${item.height/2} Z`
    case "rectangle":
      return `M 0 0 ` +
      `L ${item.width} 0 ` +
      `L ${item.width} ${item.height} ` +
      `L 0 ${item.height}` +
      `L 0 0 Z`
    case "d-pad":
      return `M 0 0` +
      `L ${item.width} 0 ` +
      `L ${item.width} ${item.height - (item.width/2)} ` +
      `L ${item.width/2} ${item.height} ` +
      `L 0 ${item.height - (item.width/2)} ` +
      `L 0 0 Z`
  }
}