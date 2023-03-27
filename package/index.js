import { result, set, unset, update } from "lodash";
import { useEffect, useSyncExternalStore } from "react";

const store = {};

let subscribers = [];

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
  return response;
};

const subscribe = (callback) => {
  subscribers = [...subscribers, callback];
  return () => {
    subscribers = subscribers.filter((p) => {
      return p !== callback;
    });
  };
};

export const useSyncV = (selector) => {
  const getSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return readSyncV(selector);
};

export const debugSyncV = (selector) => {
  console.log(`start of debug SyncV`);
  console.log(`selector : ${selector}`);
  console.log(`value : `);
  console.log(result(store, selector));
  console.log(`end of debug SyncV`);
};

export const createAsyncV = async (selector, asyncFn) => {
  set(store, selector, {
    data: null,
    loading: true,
    error: false,
  });
  try {
    const data = await asyncFn();
    createSyncV(selector, {
      data: data,
      loading: false,
      error: false,
    });
  } catch (error) {
    createSyncV(selector, {
      data: null,
      loading: false,
      error: error,
    });
  }
};

export const updateAsyncV = async (selector, asyncFn) => {
  update(store, selector, (p) => ({
    ...p,
    data: p?.data ?? null,
    loading: true,
    error: false,
  }));
  try {
    const data = await asyncFn();
    updateSyncV(selector, (p) => ({
      ...p,
      data: data,
      loading: false,
      error: false,
    }));
  } catch (error) {
    updateSyncV(selector, (p) => ({
      ...p,
      loading: false,
      error: error,
    }));
  }

  return readSyncV(selector);
};

export const useAsyncV = (selector) => {
  update(store, selector, (p) => {
    if (p) return p;
    return {
      data: null,
      loading: false,
      error: false,
    };
  });
  const state = useSyncV(selector);
  return state;
};

/**
 * A custom hook that uses `useAsyncV` to manage asynchronous data fetching.
 * If the data is not available or an error has occurred, it will refetch the data.
 * @param {string} selector - The selector to store data.
 * @param {Function} asyncFn - The asynchronous function to fetch data.
 * @returns {Object} - The state object returned by `useAsyncV`.
 * - The object properties are {data, loading, error}
 */
export const useQueryV = (selector, asyncFn) => {
  update(store, selector, (p) => {
    if (p) return p;
    return {
      data: null,
      loading: true,
      error: false,
    };
  });
  const state = useSyncV(selector);
  useEffect(() => {
    createAsyncV(selector, asyncFn);
  }, []);
  return state;
};
