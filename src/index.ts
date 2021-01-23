import { paintUnits, paintCoins } from "./painter";
import { Store } from "./store/store";
import { SCALE } from "./canvas";
import { isCollision } from "./isCollision";
import { visitor } from "./visitor/visitor";
import "./eventListeners";
import { canvas, ctx } from "./canvas";

const app = document.getElementById("app");
app.appendChild(canvas);

Store.getInstance();

(window as any).store = Store.getInstance();

export const globalCollision = {};

const render = () => {
  const units = Store.getInstance().getState().units;

  ctx.clearRect(0, 0, window.innerWidth / SCALE, window.innerHeight / SCALE);

  paintUnits();
  paintCoins();

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

    visitor({ unit: anotherUnit, units, globalCollision, localCollision });
  });

  Store.getInstance().setState({
    units: Store.getInstance()
      .getState()
      .units.filter(
        (unit) => unit.health >= 0 && unit.x <= canvas.width / (SCALE * 2)
      ),
  });

  requestAnimationFrame(render);
};

render();
