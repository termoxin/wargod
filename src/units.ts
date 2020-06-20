import { v4 } from "uuid";
import { SCALE } from "./setup";
import { ctx } from "./index";

export interface Unit {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
}

export const drawUnit = (options: Unit) => {
  const { x, y, width, height, color = "#000" } = options;

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.closePath();
};

export const createUnit = ({
  width = 10,
  height = 10,
  x,
  y,
  ...props
}: Unit): Unit => ({
  id: v4(),
  width,
  height,
  x: x / SCALE,
  y: y / SCALE,
  ...props,
});
