import { get, set, unset, update } from "lodash";
import { useSyncExternalStore } from "react";

const store = {};

export const setNewStore = store;

let subscribers = [];

const logger = {}

export const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

export const readSyncV = (selector) => {
  const response = get(store, selector);
  return response;
};

export const createSyncV = (selector, value) => {
  const response = set(store, selector, value);
  emitChange();
  return response;
};

export const updateSyncV = (selector, updaterFn) => {
  const response = update(store, selector, updaterFn);
  emitChange();
  return response;
};

export const deleteSyncV = (selector) => {
  const response = unset(store, selector);
  emitChange();
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
    subscribers = [...subscribers, callback]
    return () => {
      subscribers = subscribers.filter(p=>{
        return p !== callback
      })
    }
  };

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return state;
};

export const debugSyncV = (selector) => {
  console.table({
    selector: selector,
    value: get(store, selector),
  });
};
