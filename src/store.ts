import { Unit, createUnit } from "./units";

export const units: Unit[] = [];

export interface Storage {
  units: any;
  selectedWarrior?: string;
  health?: number;
  force?: number;
  team: string;
  coins: number;
}

export class Store {
  private static instance: Store;

  constructor(initialStore: Storage) {
    this.store = initialStore || {
      units: [],
      team: "blue",
      coins: 1000,
    };

    this.store.selectedWarrior = "blue";
    this.store.health = 200;
    this.store.force = 2;
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
