import { result, set, unset, update } from "lodash";
import { useEffect, useSyncExternalStore } from "react";

const store = {};

let subscribers = [];

const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

/**
 * A function that reads data from the store for a given selector.
 * @param {string} selector - The selector to read.
 * @returns {Object} - The data object from the store.
 */
export const readSyncV = (selector) => {
  const response = result(store, selector);
  return response;
};

/**
 * A function that creates a new item in the store with the given selector and value.
 * @param {string} selector - The selector to create.
 * @param {Object} value - The value to assign to the selector.
 * @returns {Object} - The response object from the store.
 */
export const createSyncV = (selector, value) => {
  const response = set(store, selector, value);
  emitChange();
  return response;
};

/**
 * A function that updates an item in the store for a given selector with the provided updater function.
 * @param {string} selector - The selector to update.
 * @param {Function} updaterFn - The updater function to apply to the selector.
 * @returns {Object} - The response object from the store.
 */
export const updateSyncV = (selector, updaterFn) => {
  const response = update(store, selector, updaterFn);
  emitChange();
  return response;
};

/**
 * A function that deletes an item from the store for a given selector.
 * @param {string} selector - The selector to delete.
 * @returns {Object} - The response object from the store.
 */
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

/**
 * A custom hook that reads and synchronizes with the store for a given selector.
 * @param {string} selector - The selector to read.
 * @returns {Object} - The state object returned by `readSyncV`.
 */
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

/**
 * Logs the current value of a selector to the console for debugging purposes.
 * @param {string} selector - The selector to log.
 * @returns {void}
 */
export const debugSyncV = (selector) => {
  console.group(`Debug SyncV`);
  console.log(`Selector: ${selector}`);
  console.log(`Value:`, result(store, selector));
  console.groupEnd();
};

/**
 * A function that creates a new item in the store with an asynchronous function.
 * @param {string} selector - The selector to create.
 * @param {Function} asyncFn - The asynchronous function to fetch data.
 */
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

/**
 * A function that updates an item in the store with an asynchronous function.
 * @param {string} selector - The selector to update.
 * @param {Function} asyncFn - The asynchronous function to fetch data.
 */
export const updateAsyncV = async (selector, asyncFn) => {
  update(store, selector, (p) => ({
    ...p,
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
};

/**
 * A custom hook that updates the store for a given selector with a default initial state if not present.
 * @param {string} selector - The selector to update.
 * @returns {Object} - The state object returned by `useSyncV`.
 */
export const useAsyncV = (selector) => {
  update(store, selector, (p) => {
    if (p) return p;
    return {
      data: null,
      loading: true,
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
  const state = useAsyncV(selector, asyncFn);
  useEffect(() => {
    createAsyncV(selector, asyncFn);
  }, []);
  return state;
};
