import { GlobalColission, AllUnits } from "./../types";

export const getShouldMove = (
  globalCollision: GlobalColission,
  unit: AllUnits
) =>
  !globalCollision[unit.id]?.filter(
    (u) => u.health > 0 && u.color !== unit.color
  )?.length || globalCollision[unit.id]?.every((u) => u.color === unit.color);
