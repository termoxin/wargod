import { Unit } from "./units";
export const isCollision = (unit: Unit, units: Unit[]): boolean => {
  const collisions = [];

  units.forEach((anotherUnit) => {
    const isInX =
      unit.x >= anotherUnit.x && unit.x <= anotherUnit.x + anotherUnit.width;

    const isInY =
      unit.y > anotherUnit.y - anotherUnit.height + 1 &&
      unit.y < anotherUnit.y + anotherUnit.height + 1;

    if (isInX && isInY && anotherUnit.id !== unit.id) {
      collisions.push(anotherUnit);
    }
  });

  return !!collisions.length;
};
