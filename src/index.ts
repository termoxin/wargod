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

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    initialState.units.push(
      createWarrior({
        x: Math.round(Math.random() * 500) - 400,
        y: Math.round(Math.random() * 750),
        width: 10,
        height: 10,
        initialHeath: 1000,
        health: 1000,
        force: 1.5,
        color: "gray",
      })
    );
  }
}

for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    initialState.units.push(
      createWarrior({
        x: Math.round(Math.random() * 500) + 1000,
        y: Math.round(Math.random() * 750),
        width: 10,
        height: 10,
        initialHeath: 1000,
        health: 1000,
        force: 1.5,
        color: "blue",
      })
    );
  }
}

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
