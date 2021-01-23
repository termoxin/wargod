import { Unit, Warrior, Turret, Bullet } from "./../types/index";
import { v4 } from "uuid";
import { SCALE, ctx } from "../canvas";

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

  // rotate the rect
  ctx.fillRect(x, y, width, height);

  // ctx.translate(x + width / 2, y + height / 2);
  // ctx.rotate((45 * Math.PI) / 180);

  // create warrior's health bar
  ctx.fillStyle = "red";
  ctx.fillRect(x, y + height + 2, width * healthRadio, 1);
  ctx.closePath();
};

export const createTurret = (options: Turret) => createWarrior(options);

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

export const createBullet = ({
  isBullet,
  targetId,
  ...rest
}: Bullet): Bullet => ({
  ...createWarrior(rest),
  isBullet,
  targetId,
});

function getAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}

function getAngle360(cx, cy, ex, ey) {
  var theta = getAngle(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

const lineToAngle = (ctx: CanvasRenderingContext2D, x1, y1, length, angle) => {
  const derivedAngle = (Math.PI / 180) * angle;

  const x2 = x1 + length * Math.cos(derivedAngle),
    y2 = y1 + length * Math.sin(derivedAngle);

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "#8c7575";
  ctx.stroke();

  return { x: x2, y: y2 };
};

export const drawBullet = (
  options: Bullet,
  enemyX?: number,
  enemyY?: number
) => {
  if (enemyX !== undefined && enemyY !== undefined) {
    const angle = getAngle360(enemyX, enemyY, options.x, options.y);
    lineToAngle(ctx, options.x, options.y, 3, angle);
  } else {
    ctx.beginPath();
    // create warrior

    ctx.fillStyle = "#8c7575";

    // rotate the rect
    const { x, y, width, height } = options;

    ctx.fillRect(x, y, width, height);
  }
};
