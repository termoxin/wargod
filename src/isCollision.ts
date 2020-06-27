import { Unit } from "./units";

interface IsCollisionOutput {
  unit: any;
  collisions: any[];
}

export const isCollision = (unit: Unit, units: any): IsCollisionOutput => {
  const collisions = [];

  units.forEach((anotherUnit) => {
    if (anotherUnit.color !== "violet") {
      const isInX =
        unit.x >= anotherUnit.x - unit.width &&
        unit.x <= anotherUnit.x + anotherUnit.width;

      const isInY =
        unit.y > anotherUnit.y - unit.height &&
        unit.y < anotherUnit.y + anotherUnit.height;

      if (
        isInX &&
        isInY &&
        anotherUnit.id !== unit.id &&
        unit.visible &&
        anotherUnit.visible
      ) {
        collisions.push(anotherUnit);
      }
    } else {
      const circle = {
        x: anotherUnit.x + anotherUnit.width / 2,
        y: anotherUnit.y + anotherUnit.width / 2,
        r: anotherUnit.radius,
      };

      const rect = {
        x: unit.x,
        y: unit.y,
        w: unit.width,
        h: unit.height,
      };

      if (anotherUnit.id !== unit.id) {
        if (rectCircleColliding(circle, rect)) {
          collisions.push(anotherUnit);
        }
      }
    }
  });

  return { unit, collisions };
};

export const rectCircleColliding = (circle, rect) => {
  const distX = Math.abs(circle.x - rect.x - rect.w / 2);
  const distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }

  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return true;
  }

  if (distY <= rect.h / 2) {
    return true;
  }

  const dx = distX - rect.w / 2;
  const dy = distY - rect.h / 2;

  return dx * dx + dy * dy <= circle.r * circle.r;
};
