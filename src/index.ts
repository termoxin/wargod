import { paintUnits } from "./painter";
import { Store } from "./store";
import { setupCanvas, SCALE } from "./setup";
import { createWarrior, createTurret } from "./units";
import { isCollision } from "./isCollision";
import { observer } from "./observer/observer";
import "./eventListeners";

export const { canvas, ctx } = setupCanvas();

const app = document.getElementById("app");
app.appendChild(canvas);

const initialState = {
  units: [],
};

Store.getInstance(initialState);

export const globalCollision = {};

const render = (timestamp?: number) => {
  const units = Store.getInstance().getState().units;

  ctx.clearRect(0, 0, window.innerWidth / SCALE, window.innerHeight / SCALE);

  paintUnits();

  units.forEach((anotherUnit) => {
    const localCollision = isCollision(
      anotherUnit,
      Store.getInstance().getState().units
    );

    localCollision.collisions.forEach((cola) => {
      if (globalCollision[cola.id]) {
        const isUnique = globalCollision[cola.id].find(
          (u) => u.id === localCollision.unit.id
        );

        if (!isUnique) {
          globalCollision[cola.id] = [
            ...globalCollision[cola.id],
            localCollision.unit,
          ];
        }
      } else {
        globalCollision[cola.id] = [localCollision.unit];
      }
    });

    observer(anotherUnit, units, globalCollision, localCollision, timestamp);
  });

  requestAnimationFrame(render);
};

render();
