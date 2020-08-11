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
  }

  calculateCollisionDamage(unit, state, localCollision);
};
