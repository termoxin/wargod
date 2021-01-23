import { getShouldMove } from "./getShouldMove";
import { Store } from "../store/store";
import { calculateCollisionDamage } from "./calculateCollisionDamage";
import { attackNearestEnemy } from "./agression";

let started = true;

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    started = !started;
  }
});

export const visitor = ({ unit, units, globalCollision, localCollision }) => {
  const state = {
    ...Store.getInstance().getState(),
  };

  const shouldMove = getShouldMove(globalCollision, unit);

  if (shouldMove && unit.color !== "black") {
    attackNearestEnemy(unit, units);
  }

  if (started) {
    if (unit.color === "gray" && shouldMove) {
      unit.x += 0.1;
    } else if (unit.color === "blue" && shouldMove) {
      unit.x -= 0.1;
    }

    if (unit.isBullet && unit.color === "blue") {
      const target = units.find((u) => u.id === unit.targetId);

      if (target?.x > unit.x) {
        unit.x += 1;
      } else {
        unit.x -= 1;
      }

      if (target?.y > unit.y) {
        unit.y += 1;
      } else {
        unit.y -= 1;
      }
    }
  }

  calculateCollisionDamage(unit, state, localCollision);
};
