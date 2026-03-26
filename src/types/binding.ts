interface ActiveButton {
  kind: "button"; 
  index: number;
}

interface ActiveAxis {
  kind: "axis";
  index: number;
}

export type ActiveBinding = ActiveButton | ActiveAxis;

interface LeftStick {
  kind: "left";
  xAxis: 0;
  yAxis: 1;
}

interface RightStick {
  kind: "right";
  xAxis: 2;
  yAxis: 3;
}

export type MoveBinding = LeftStick | RightStick;