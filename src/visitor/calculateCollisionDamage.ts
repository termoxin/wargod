import { Store } from "../store/store";
import { currency } from "../../config/defaultConfig.json";
import { createBullet } from "../units/units";
import { SCALE } from "../canvas";

const TURRET_RELOADING_TIME = 100;

export const calculateCollisionDamage = (unit, state, collisions) => {
  const collisionsIds = collisions.collisions.map((collision) => collision.id);

  collisionsIds.forEach((id) => {
    const entity = state.units.find((u) => u.id === id);

    const entityCanAttackTurret = !collisions.collisions.find(
      (u) => u.id === id
    ).withinRadius;

    if (entity && unit.color !== entity.color) {
      const isAttackedByTurret =
        entity.visible && unit.color !== "blue" && unit.color !== "black";

      if (isAttackedByTurret) {
        if (!entity.isReloading && entity.color === "violet") {
          const y = entity.y * SCALE + entity.height / 2;

          const bullet = createBullet({
            x: entity.x * SCALE - 20,
            y,
            color: "blue",
            health: 1,
            force: 100,
            initialHeath: 1,
            width: 2,
            height: 1,
            isBullet: true,
            targetId: unit.id,
          });

          entity.isReloading = true;

          const instance = Store.getInstance();
          const { units } = instance.getState();

          setTimeout(() => {
            entity.isReloading = false;
          }, TURRET_RELOADING_TIME);

          instance.setState({
            units: [...units, bullet],
          });
        }

        if (entity.isBullet) {
          unit.health -= entity.force;
        }
      }

      if (entityCanAttackTurret) {
        entity.health -= unit.force;
      }

      if (unit.health <= 0) {
        const instance = Store.getInstance();
        const { team, coins } = instance.getState();

        if (unit.color === team) {
          instance.setState({
            coins: coins + currency.killingReward,
          });
        }
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
