import { Store } from "../store";

export const calculateCollisionDamage = (unit, state, collisions) => {
  const collisionsIds = collisions.collisions.map((collision) => collision.id);

  collisionsIds.forEach((id) => {
    const entity = state.units.find((u) => u.id === id);

    const { withinRadius: entityWithinRadius } = collisions.collisions.find(
      (u) => u.id === id
    );

    if (entity && unit.color !== entity.color) {
      if (entity.visible && unit.color !== "blue" && unit.color !== "black") {
        unit.health -= entity.force;
      }

      if (!entityWithinRadius) {
        entity.health -= unit.force;
      }

      if (entity.health < 0) {
        entity.visible = false;
      }
    }
  });

  if (unit.health < 0) {
    unit.visible = false;
  }

  Store.getInstance().setState(this.state);

  return collisionsIds;
};
