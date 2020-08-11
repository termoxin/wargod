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

export const attackNearestEnemy = (
  unit: AllUnits,
  units: AllUnits[],
  attackSpeed: AttackSpeed = speeds
) => {
  const { color: team } = unit;

  const filterUnits = (unit) => unit.color !== team && unit.color !== "violet";

  if (unit.color === team) {
    const topCollision = isCollision(
      { ...unit, y: unit.y - agressionRadius },
      units
    );

    const top = topCollision.collisions.filter(filterUnits).length;

    const bottomCollision = isCollision(
      { ...unit, y: unit.y + agressionRadius },
      units
    );

    const bottom = bottomCollision.collisions.filter(filterUnits).length;

    const leftCollision = isCollision(
      { ...unit, x: unit.x - agressionRadius },
      units
    );

    const left = leftCollision.collisions.filter(filterUnits).length;

    const rightCollision = isCollision(
      { ...unit, x: unit.x + agressionRadius },
      units
    );

    const right = rightCollision.collisions.filter(filterUnits).length;

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
