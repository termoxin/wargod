import { Store } from "./store";
import { drawWarrior, drawTurret } from "./units";

export const paintUnits = () =>
  Store.getInstance()
    .getState()
    .units.forEach((unit) => {
      if (
        unit.visible &&
        unit.health > 0 &&
        (unit.color === "blue" || unit.color === "gray")
      ) {
        drawWarrior(unit);
      }

      if (unit.visible && unit.health > 0 && unit.color === "violet") {
        drawTurret(unit as any);
      }
    });
