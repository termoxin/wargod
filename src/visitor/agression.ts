import { isCollision } from "../isCollision";
import {
  agressionRadius,
  attackSpeed as speeds,
} from "../../config/defaultConfig.json";
import { AllUnits } from "../types";

interface AttackSpeed {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const aggresiveShouldAttack = (units, radiusToAttack, cb) => {
  for (let i = radiusToAttack; i > 0; i--) {
    const collisionResult = isCollision(cb(i), units);

    if (!!collisionResult.collisions.length) {
      return collisionResult;
    }
  }

  return undefined;
};

export const attackNearestEnemy = (
  unit: AllUnits,
  units: AllUnits[],
  attackSpeed: AttackSpeed = speeds
) => {
  const { color: team } = unit;

  const filterUnits = (unit) => unit.color !== team && unit.color !== "violet";

  if (unit.color === team) {
    const topCollision = aggresiveShouldAttack(
      units,
      agressionRadius,
      (value) => ({
        ...unit,
        y: unit.y - value,
      })
    );

    const top = topCollision
      ? topCollision.collisions.filter(filterUnits).length
      : false;

    const bottomCollision = aggresiveShouldAttack(
      units,
      agressionRadius,
      (value) => ({
        ...unit,
        y: unit.y + value,
      })
    );

    const bottom = bottomCollision
      ? bottomCollision.collisions.filter(filterUnits).length
      : false;

    const leftCollision = aggresiveShouldAttack(
      units,
      agressionRadius,
      (value) => ({
        ...unit,
        x: unit.x - value,
      })
    );

    const left = leftCollision
      ? leftCollision.collisions.filter(filterUnits).length
      : false;

    const rightCollision = aggresiveShouldAttack(
      units,
      agressionRadius,
      (value) => ({
        ...unit,
        x: unit.x + value,
      })
    );

    const right = rightCollision
      ? rightCollision.collisions.filter(filterUnits).length
      : false;

    if (left && leftCollision.unit.id === unit.id) {
      unit.x -= attackSpeed.left;
    } else if (right && rightCollision.unit.id === unit.id) {
      unit.x += attackSpeed.right;
    } else if (bottom && bottomCollision.unit.id === unit.id) {
      unit.y += attackSpeed.bottom;
    } else if (top && topCollision.unit.id === unit.id) {
      unit.y -= attackSpeed.top;
    }
  }
};
