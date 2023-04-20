import { result } from "lodash-es";

export const store: any = {};

export let subscribers: Array<any> = [];

export const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

export const subscribe = (callback: CallableFunction) => {
  subscribers = [...subscribers, callback];
  return () => {
    subscribers = subscribers.filter((p: any) => {
      return p !== callback;
    });
  };
};

/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 */
export const debugSyncV = (selector: string) => {
  console.group(`Debug SyncV`);
  console.log(`Selector: ${selector}`);
  console.log(`Value:`, JSON.parse(JSON.stringify(result(store, selector))));
  console.groupEnd();
};
