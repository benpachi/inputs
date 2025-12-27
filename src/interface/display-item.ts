export interface DisplayItem {
  id: string,
  name: string, 
  width: number, 
  height: number, 
  rotation: number,
  x: number, 
  y: number,
  strokeWidth: number,
  fillColor: string,
  strokeColor: string,
  type: "ellipse" | "rectangle" | "d-pad";
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
    case ("d-pad"):
      return `M 0 0` +
      `L ${item.width} 0 ` +
      `L ${item.width} ${item.height - (item.width/2)} ` +
      `L ${item.width/2} ${item.height} ` +
      `L 0 ${item.height - (item.width/2)} ` +
      `L 0 0 Z`
  }
}