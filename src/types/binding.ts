interface ButtonBinding {
  kind: "button"; 
  index: number;
}

export interface StickMoveBinding {
  kind: "stick";
  xIndex: number;
  yIndex: number;
}

export type ActiveBinding = ButtonBinding | StickMoveBinding;

