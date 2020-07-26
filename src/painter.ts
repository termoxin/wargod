import { Store } from "./store";
import { drawWarrior, drawTurret } from "./units";
import { ctx } from "./canvas";

export const paintUnits = () =>
  Store.getInstance()
    .getState()
    .units.forEach((unit) => {
      if (
        unit.visible &&
        unit.health > 0 &&
        (unit.color === "blue" ||
          unit.color === "gray" ||
          unit.color === "black")
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
