import { Storage } from "./../types";
import { Unit } from "../types";
import { currency, team } from "../../config/defaultConfig.json";

export const units: Unit[] = [];

export class Store {
  private static instance: Store;

  constructor(initialStore: Storage) {
    this.store = initialStore || {
      units: [],
      team,
      coins: currency.initialMoney,
    };

    this.store.selectedWarrior = "violet";
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
