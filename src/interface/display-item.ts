export interface DisplayItem {
  name: string, 
  width: number, 
  height: number, 
  rotation: number,
  x: number, 
  y: number,
  strokeWidth: number,
  type: "ellipse" | "rectangle";
}

export function getPath(item: DisplayItem) {
  switch (item.type) {
    case ("ellipse"):
      return `M 0 ${item.height/2} ` +
      `A ${item.width/2} ${item.height/2} 0 0 0 ${item.width} ${item.height/2} ` +
      `A ${item.width/2} ${item.height/2} 0 0 0 0 ${item.height/2} Z`
    case ("rectangle"):
      return `M 0 0 ` +
      `L ${item.width} 0 ` +
      `L ${item.width} ${item.height} ` +
      `L 0 ${item.height}` +
      `L 0 0 Z`
  }
}