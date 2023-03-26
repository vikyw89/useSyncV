import { get, set, unset, update } from "lodash";
import { useSyncExternalStore } from "react";

const store = {};

let subscribers = [];

const asyncStatus = {}

export const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

export const readSyncV = (selector) => {
  const response = result(store, selector);
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

const subscribe = (callback) => {
  subscribers = [...subscribers, callback]
  return () => {
    subscribers = subscribers.filter(p=>{
      return p !== callback
    })
  }
};

export const useSyncV = (selector) => {
  const getSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(store, selector));
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

export const useAsyncV = (selector, asyncFn) => {
  const asyncFnWithStatus = async() => {
    const status = {
      pending:true,
      error:null
    }
    set(asyncStatus, selector, status)
    try {
      const response = await asyncFn()
      return response
    } catch (err) {
      set(status,"error", err)
    }
  }

  const updateFn = (p) => {
    if (p) {
      return p
    }
    return asyncFn()
  }
  set(asyncStatus, selector, status)
  update(store,selector, updateFn)

  // create the data
  createSyncV(selector, asyncFn())
  const getSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [state, pending, error]
}