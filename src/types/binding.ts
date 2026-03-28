interface ButtonBinding {
  kind: "button"; 
  index: number;
}

interface AxesBinding {
  kind: "stick";
  xIndex: number;
  yIndex: number;
}

export type ActiveBinding = ButtonBinding | AxesBinding | null;

export type StickMoveBinding = AxesBinding | null;

