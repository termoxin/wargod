import { setupCanvas } from "./setup";
import { drawUnit, createUnit } from "./units";
import { isCollision } from "./isCollision";
import { units } from "./store";

export const { canvas, ctx } = setupCanvas();

const app = document.getElementById("app");
app.appendChild(canvas);

document.addEventListener("click", (event) => {
  const unit = createUnit({ x: event.clientX, y: event.clientY, color: "red" });

  if (!isCollision(unit, units)) {
    units.push(unit);
  }
});

const render = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  units.forEach(drawUnit);

  units.forEach((anotherUnit) => {
    if (!isCollision(anotherUnit, units)) {
      if (anotherUnit.color === "red") anotherUnit.x -= 1;
    } else {
      console.log("collision");
    }
  });

  requestAnimationFrame(render);
};

render();
