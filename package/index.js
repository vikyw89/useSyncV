import { get, set, unset, update } from "lodash";
import { useSyncExternalStore } from "react";

const store = {};

export const setNewStore = store;

const subscribers = {};

export const emitChange = (selector) => {
  const selectorSubscribers = get(subscribers, selector) ?? []

  if (!selectorSubscribers) {
    set(subscribers, selector, []);
  }

  for (let subscriber of selectorSubscribers) {
    subscriber();
  }
};

export const readSyncV = (selector) => {
  const response = get(store, selector);
  return response;
};

export const createSyncV = (selector, value) => {
  const response = set(store, selector, value);
  emitChange(selector);
  return response;
};

export const updateSyncV = (selector, updaterFn) => {
  const response = update(store, selector, updaterFn);
  emitChange(selector);
  return response;
};

export const deleteSyncV = (selector) => {
  const response = unset(store, selector);
  emitChange(selector);
  return response
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

export const debugSyncV = (selector) => {
  console.table({
    selector: selector,
    value: get(store, selector),
    subscribersCount: get(subscribers, selector).length,
  });
};
