import { Store } from "../store";
import { calculateCollisionDamage } from "./calculateCollisionDamage";

let started = true;

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    started = !started;
  }
});

export const observer = (
  unit,
  units,
  globalCollision,
  localCollision,
  timestamp
) => {
  const state = {
    ...Store.getInstance().getState(),
  };

  const shouldMove =
    !globalCollision[unit.id]?.filter(
      (u) => u.health > 0 && u.color !== unit.color
    )?.length || globalCollision[unit.id]?.every((u) => u.color === unit.color);

  if (started) {
    if (unit.color === "gray" && shouldMove) {
      unit.x += Math.random() * Math.random();
    } else if (unit.color === "blue" && shouldMove) {
      unit.x -= Math.random() * Math.random();
  }

  calculateCollisionDamage(unit, state, localCollision);
};
