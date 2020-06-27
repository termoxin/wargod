import { Store } from "./store";
import { isCollision } from "./isCollision";
import { createWarrior, createTurret } from "./units";

let mouseDown = false;

document.addEventListener("mousedown", () => {
  mouseDown = true;
});

document.addEventListener("mouseup", () => {
  mouseDown = false;
});

document.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    const warrior = createWarrior({
      x: event.clientX,
      y: event.clientY,
      color: "blue",
      health: 5,
      force: 200,
      initialHeath: 5,
      width: 5,
      height: 5,
    });

    const { collisions } = isCollision(
      warrior,
      Store.getInstance().getState().units
    );

    if (!collisions.length) {
      Store.getInstance().setState({
        units: [...Store.getInstance().getState().units, warrior],
      });
    }
  }
});

document.addEventListener("click", (event) => {
  const warrior = createTurret({
    x: event.clientX,
    y: event.clientY,
    color: "violet",
    health: 50,
    force: 5,
    initialHeath: 50,
    width: 5,
    height: 8,
    radius: 50,
  });

  const { collisions } = isCollision(
    warrior,
    Store.getInstance().getState().units
  );

  if (
    !collisions.filter((col) => !col.withinRadius).length ||
    !collisions.length
  ) {
    Store.getInstance().setState({
      units: [...Store.getInstance().getState().units, warrior],
    });
  }
});
