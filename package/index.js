import { result, set, unset, update } from "lodash-es";
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
 * - If the state is empty, it will create a new array and store the value inside it
 * - If there's an existing array, it will push the value inside display: 'inline-table'
 * - If there are other things aside from an array, it will delete original value, create a new array, and push the value
 * @param {string} selector - The selector to create.
 * @param {Object} value - The value to assign to the selector.
 * @returns {Object} - The response object from the store.
 */
export const createSyncV = (selector, value) => {
  const response = update(store, selector, (p) => {
    if (Array.isArray(p)) {
      return [...p, value];
    }
    return [value];
  });
  emitChange();
  return response;
};

/**
 * A function that updates an item in the store for a given selector with the provided updates
 * @param {string} selector - The selector to update.
 * @param {Function | any} updates - The updater function or value to apply to the selector.
 * @returns {Object} - The response object from the store.
 */
export const updateSyncV = (selector, updates) => {
  if (typeof updates === "function") {
    const response = update(store, selector, updates);
    emitChange();
    return response;
  } else {
    const response = set(store, selector, updates);
    emitChange();
    return response;
  }
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
 * A function that updates an item in the store with an asynchronous function.
 * @param {string} selector - The selector to update.
 * @param {Function} asyncFn - The asynchronous function to fetch data.
 */
export const updateAsyncV = async (
  selector,
  asyncFn,
  config = {
    initialState: {
      data: null,
      loading: true,
      error: false,
    },
  }
) => {
  const initialState = config.initialState;
  update(store, selector, (p) => ({
    ...p,
    ...initialState,
  }));
  try {
    const data = await asyncFn();
    updateSyncV(selector, (p) => ({
      ...p,
      data: data,
      loading: false,
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
 * A custom hook that subscribe to the store with a given selector
 * - If there's no initial data present, preset it with async value
 * @param {string} selector - The selector to update.
 * @returns {Object} - The state object returned by `useSyncV`.
 */
export const useAsyncV = (
  selector,
  config = { initialState: { data: null, loading: true, error: false } }
) => {
  const initialState = config.initialState;
  update(store, selector, (p) => {
    if (p) return p;
    return {
      ...initialState,
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
export const useQueryV = (
  selector,
  asyncFn,
  config = {
    useAsyncV: { initialState: { data: null, loading: true, error: false } },
    updateAsyncV: {
      initialState: { data: null, loading: true, error: false },
    },
  }
) => {
  const state = useAsyncV(selector, config.useAsyncV);
  useEffect(() => {
    updateAsyncV(selector, asyncFn, config.updateAsyncV);
  }, []);
  return state;
};
