import { Store } from "./store/store";
import { drawWarrior, drawTurret } from "./units/units";
import { ctx } from "./canvas";

const unitsPainterAbleToPaint = ["blue", "gray", "black"];

export const paintUnits = () =>
  Store.getInstance()
    .getState()
    .units.forEach((unit) => {
      if (
        unit.visible &&
        unit.health > 0 &&
        unitsPainterAbleToPaint.indexOf(unit.color) > -1
      ) {
        drawWarrior(unit);
      }

      if (unit.visible && unit.health > 0 && unit.color === "violet") {
        drawTurret(unit as any);
      }
    });

export const paintCoins = () => {
  const { coins } = Store.getInstance().getState();
  ctx.fillStyle = "#6b3030";
  ctx.fillText(`Coins: ${coins}`, 480, 20);
};
