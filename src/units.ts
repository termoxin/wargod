import { v4 } from "uuid";
import { SCALE, ctx } from "./canvas";

export interface Unit {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  visible?: boolean;
}

export interface Warrior extends Unit {
  initialHeath: number;
  health: number;
  force: number;
}

export interface Turret extends Warrior {
  radius: number;
}

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
  visible: true,
  ...props,
});

export const drawUnit = (options: Unit) => {
  const { x, y, width, height, color = "#000" } = options;

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.closePath();
};

export const createWarrior = (options: Warrior): Warrior => {
  const basicUnit = createUnit(options);

  const warrior: Warrior = {
    ...basicUnit,
    initialHeath: options.initialHeath,
    health: options.health,
    force: options.force,
  };

  return warrior;
};

export const drawWarrior = (options: Warrior) => {
  const { x, y, width, height, initialHeath, health, color = "#000" } = options;

  const healthRadio = health / initialHeath;

  ctx.beginPath();
  // create warrior
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

  // create warrior's health bar

  ctx.fillStyle = "red";
  ctx.fillRect(x, y + height + 2, width * healthRadio, 1);
  ctx.closePath();
};

export const createTurret = (options: Turret) => {
  const warrior = createWarrior(options);

  return warrior;
};

export const drawTurret = (options: Turret) => {
  drawWarrior(options);

  ctx.beginPath();
  ctx.arc(
    options.x + options.width / 2,
    options.y + options.height / 2,
    options.radius,
    0,
    2 * Math.PI
  );
  ctx.stroke();
};
