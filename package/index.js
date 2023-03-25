import { get, set, unset, update } from "lodash";

const store = {};

export const setNewStore = store;

const subscribers = {};

export const readSync = (selector) => {
  return get(store, selector);
};

export const createSync = (selector, value) => {
  return set(store, selector, value);
};

export const updateSync = (selector, updaterFn) => {
  return update(store, selector, updaterFn);
};

export const deleteSync = (selector) => {
  return unset(store, selector);
};

export const emitChange = (selector) => {
  const selectorSubscribers = get(subscribers, selector);

  if (!selectorSubscribers) {
    set(subscribers, selector, []);
  }

  for (let subscriber of selectorSubscribers) {
    subscriber();
  }
};

export const useSyncV = (selector) => {
  const getSnapshot = () => {
    return JSON.stringify(get(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(get(store, selector));
  };

  const subscribe = (callback) => {
    update(subscribers, selector, (p) => {
      if (!p) {
        p = [];
      }
      return [...p, callback];
    });
    return () => {
      update(subscribers, selector, (p) => {
        return p.filter((el) => el !== callback);
      });
    };
  };

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return state;
};

export const syncVDebugger = (selector) => {
  console.table({
    storeData: get(store, selector),
    storeSubscribers: get(subscribers, selector),
  });
};
