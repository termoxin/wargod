import { Unit } from "./units";

interface IsCollisionOutput {
  unit: any;
  collisions: any[];
}

export const isCollision = (unit: Unit, units: any): IsCollisionOutput => {
  const collisions = [];

  units.forEach((anotherUnit) => {
    const isInX =
      unit.x >= anotherUnit.x && unit.x <= anotherUnit.x + anotherUnit.width;

    const isInY =
      unit.y > anotherUnit.y - anotherUnit.height + 1 &&
      unit.y < anotherUnit.y + anotherUnit.height + 1;

    if (
      isInX &&
      isInY &&
      anotherUnit.id !== unit.id &&
      unit.visible &&
      anotherUnit.visible
    ) {
      collisions.push(anotherUnit);
    }
  });

  return { unit, collisions };
};
