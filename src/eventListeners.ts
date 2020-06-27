import { Store } from "./store";
import { isCollision } from "./isCollision";
import { createWarrior } from "./units";

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
      health: 100,
      force: 1,
      initialHeath: 100,
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
  const warrior = createWarrior({
    x: event.clientX,
    y: event.clientY,
    color: "blue",
    health: 1000000,
    force: 1,
    initialHeath: 1000000,
    width: 15,
    height: 2,
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
});
