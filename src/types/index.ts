export interface Unit {
  id?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  visible?: boolean;
  withinRadius?: boolean;
}

export interface Warrior extends Unit {
  initialHeath: number;
  health: number;
  force: number;
}

export interface Turret extends Warrior {
  radius: number;
}

export type GlobalColission = Record<string, AllUnits[]>;

export type AllUnits = Unit & Turret & Warrior;

export interface Storage {
  units: AllUnits[];
  selectedWarrior?: string;
  health?: number;
  force?: number;
  team: string;
  coins: number;
}
