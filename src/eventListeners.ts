import { Store } from "./store/store";
import { isCollision } from "./isCollision";
import { createWarrior, createTurret } from "./units/units";
import { canvas } from "./canvas";
import { spendCoins } from "./currency/spendCoins";
import { currency } from "../config/defaultConfig.json";

const warriorSelector = document.getElementById("select-warrior");
const configureWarrior = document.getElementById("configure-warrior");

const { selectedWarrior } = Store.getInstance().getState();

[...warriorSelector.children].forEach((e) => {
  if (selectedWarrior === e.children[1].value) {
    e.children[1].checked = true;
  }
});

let mouseDown = false;

canvas.addEventListener("mousedown", () => {
  mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
  mouseDown = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    const { health, force, selectedWarrior } = Store.getInstance().getState();
    let warrior;

    if (selectedWarrior === "violet" && spendCoins(currency.prices.violet)) {
      warrior = createTurret({
        x: event.clientX,
        y: event.clientY,
        color: selectedWarrior,
        health: 50,
        force: 10,
        initialHeath: 50,
        width: 5,
        height: 8,
        radius: 50,
      });
    } else if (selectedWarrior === "blue" || selectedWarrior === "gray") {
      if (selectedWarrior === "blue" && spendCoins(currency.prices.blue)) {
        warrior = createWarrior({
          x: event.clientX,
          y: event.clientY,
          color: selectedWarrior,
          health,
          force,
          initialHeath: health,
          width: 5,
          height: 5,
        });
      } else if (selectedWarrior === "gray") {
        warrior = createWarrior({
          x: event.clientX,
          y: event.clientY,
          color: selectedWarrior,
          health,
          force,
          initialHeath: health,
          width: 5,
          height: 5,
        });
      }
    } else {
      if (spendCoins(currency.prices.black)) {
        warrior = createWarrior({
          x: event.clientX,
          y: event.clientY,
          color: selectedWarrior,
          health: 5000,
          force: 0.5,
          initialHeath: 5000,
          width: 8,
          height: 8,
        });
      }
    }

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

warriorSelector.addEventListener("change", (event: Event) => {
  const value = event.target.value;

  Store.getInstance().setState({
    selectedWarrior: value,
  });
});

configureWarrior.addEventListener("change", (event: Event) => {
  Store.getInstance().setState({
    [event.target.name]: +event.target.value,
  });
});

canvas.addEventListener("click", (event) => {
  const {
    health,
    force,
    selectedWarrior,
    units,
  } = Store.getInstance().getState();
  let warrior;
  let moneyToSpend: number;
  let bullet;

  if (selectedWarrior === "violet" && spendCoins(currency.prices.violet)) {
    warrior = createTurret({
      x: event.clientX,
      y: event.clientY,
      color: selectedWarrior,
      health: 50,
      force: 10,
      initialHeath: 50,
      width: 5,
      height: 8,
      radius: 100,
    });

    Store.getInstance().setState({
      units: [...units],
    });
  } else if (selectedWarrior === "blue" || selectedWarrior === "gray") {
    if (selectedWarrior === "blue" && spendCoins(currency.prices.blue)) {
      warrior = createWarrior({
        x: event.clientX,
        y: event.clientY,
        color: selectedWarrior,
        health,
        force,
        initialHeath: health,
        width: 10,
        height: 10,
      });
    } else if (selectedWarrior === "gray") {
      warrior = createWarrior({
        x: event.clientX,
        y: event.clientY,
        color: selectedWarrior,
        health,
        force,
        initialHeath: health,
        width: 5,
        height: 5,
      });
    }
  } else {
    if (spendCoins(currency.prices.black)) {
      warrior = createWarrior({
        x: event.clientX,
        y: event.clientY,
        color: selectedWarrior,
        health: 5000,
        force: 0.5,
        initialHeath: 5000,
        width: 8,
        height: 8,
      });
    }
  }

  const { collisions } = isCollision(warrior, units);

  if (
    !collisions.filter((col) => !col.withinRadius).length ||
    !collisions.length
  ) {
    spendCoins(moneyToSpend);

    const additionalUnits = [];

    if (bullet) {
      additionalUnits.push(bullet);
    }

    Store.getInstance().setState({
      units: [...units, warrior, ...additionalUnits],
    });
  }
});
