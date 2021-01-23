import { Store } from "./store/store";
import { drawWarrior, drawTurret, drawBullet } from "./units/units";
import { ctx } from "./canvas";

const unitsPainterAbleToPaint = ["blue", "gray", "black"];

export const paintUnits = () =>
  Store.getInstance()
    .getState()
    .units.forEach((unit, _, units) => {
      if (!unit.isBullet) {
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
      } else {
        if (unit.visible && unit.health > 0) {
          const target = units.find((u) => u.id === unit.targetId);

          drawBullet(unit as any, target?.x, target?.y);
        }
      }
    });

export const paintCoins = () => {
  const { coins } = Store.getInstance().getState();
  ctx.fillStyle = "#6b3030";
  ctx.fillText(`Coins: ${coins}`, 480, 20);
};
