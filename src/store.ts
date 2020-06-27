import { Unit, createUnit } from "./units";

export const units: Unit[] = [
  ...new Array(40)
    .fill(0)
    .map((_, index) =>
      index % 2 === 0
        ? createUnit({
            x: 100,
            y: index * 20,
          })
        : null
    )
    .filter(Boolean),
  ...new Array(40)
    .fill(0)
    .map((_, index) =>
      index % 2 === 0
        ? createUnit({
            x: 300,
            y: Math.random() > 0.5 ? index * 20 : index * 21,
            color: "red",
          })
        : null
    )
    .filter(Boolean),
];

interface Storage {
  units: any;
}

export class Store {
  private static instance: Store;

  constructor(initialStore: Storage) {
    this.store = initialStore || {
      units: [],
    };
  }

  private store: Storage;

  static getInstance(initialStore?: Storage): Store {
    if (!Store.instance) {
      Store.instance = new Store(initialStore);
    }

    return Store.instance;
  }

  getState() {
    return this.store;
  }

  setState(newState: Partial<Storage>) {
    this.store = {
      ...this.store,
      ...newState,
    };
  }
}
