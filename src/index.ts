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
    initialHeath: 5000,
    health: 5000,
    force: 4,
    color: "gray",
  }),
];

document.addEventListener("click", (event) => {
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

  const { collisions, unit } = isCollision(warrior, warriors);

  if (!collisions.length) {
    warriors.push(warrior);
  }
});

const render = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  warriors.forEach((unit) => unit.health > 0 && drawWarrior(unit));

  warriors.forEach((anotherUnit) => {
    const { unit, collisions } = isCollision(anotherUnit, warriors);

    if (!collisions.length) {
      if (anotherUnit.color === "blue") anotherUnit.x -= 1;
    } else {
      warriors[1].health -= unit.force;
      unit.health -= warriors[1].force;

      if (warriors[1].health < 0) {
        warriors[1].visible = false;
      }

      if (unit.health < 0) {
        unit.visible = false;
      }
    }
  });

  requestAnimationFrame(render);
};

render();
