import { setupCanvas } from "./setup";
import { drawWarrior, createWarrior } from "./units";
import { isCollision } from "./isCollision";

export const { canvas, ctx } = setupCanvas();

const app = document.getElementById("app");
app.appendChild(canvas);

const warriors = [
  createWarrior({
    x: 200,
    y: 200,
    width: 30,
    height: 100,
    initialHeath: 10000,
    health: 10000,
    force: 25,
    color: "gray",
  }),
];

let mousedown = false;

document.addEventListener("mousedown", () => {
  mousedown = true;
});

document.addEventListener("mouseup", () => {
  mousedown = false;
});

document.addEventListener("mousemove", (event) => {
  if (mousedown) {
    const warrior = createWarrior({
      x: event.clientX,
      y: event.clientY,
      color: "blue",
      health: 200,
      force: 10,
      initialHeath: 200,
      width: 5,
      height: 5,
    });

    const { collisions } = isCollision(warrior, warriors);

    if (!collisions.length) {
      warriors.push(warrior);
    }
  }
});

document.addEventListener("click", (event) => {});

const render = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  warriors.forEach((unit) => unit.health > 0 && drawWarrior(unit));

  warriors.forEach((anotherUnit) => {
    const { unit, collisions } = isCollision(anotherUnit, warriors);

    if (!collisions.length) {
      if (anotherUnit.color !== "gray") anotherUnit.x -= 1;
    } else {
      warriors[0].health -= unit.force;
      unit.health -= warriors[0].force;

      if (warriors[0].health < 0) {
        warriors[0].visible = false;
      }

      if (unit.health < 0) {
        unit.visible = false;
      }
    }
  });

  requestAnimationFrame(render);
};

render();
