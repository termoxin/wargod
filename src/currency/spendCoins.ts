import { Store } from "../store/store";

export const spendCoins = (amount: number) => {
  const instance = Store.getInstance();
  const { coins } = instance.getState();

  const shouldSpend = coins - amount >= 0;

  if (shouldSpend) {
    instance.setState({ coins: coins - amount });
  }

  return shouldSpend;
};
