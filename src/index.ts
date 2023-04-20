import { result, set, unset, update } from "lodash";
import { useEffect, useSyncExternalStore } from "react";

const store: any = {};

let subscribers: Array<any> = [];

const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for reading data from the store.
 *
 * @returns {*} - The data read from the store using the specified selector.
 */
export const readSyncV = (selector: string) => {
  const response: any = result(store, selector);
  return response;
};

/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param {string} selector - The selector to use for creating new data in the store.
 * @param {*} value - The value to be added to the store using the specified selector.
 *
 * @returns {*} - The data that was created in the store using the specified selector and value.
 */
export const createSyncV = (selector: string, value: any) => {
  const response: any = update(store, selector, (p: any) => {
    if (Array.isArray(p)) {
      return [...p, value];
    }
    return [value];
  });
  emitChange();
  return response;
};

/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param {string} selector - The selector to use for updating data in the store.
 * @param {*} updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 *
 * @returns {*} - The updated data in the store using the specified selector and updates.
 */
export const updateSyncV = (selector: string, updates: any) => {
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
 * A function that deletes data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for deleting data from the store.
 *
 * @returns {*} - The data that was deleted from the store using the specified selector.
 */
export const deleteSyncV = (selector: string) => {
  const response = unset(store, selector);
  emitChange();
  return response;
};

const subscribe = (callback: CallableFunction) => {
  subscribers = [...subscribers, callback];
  return () => {
    subscribers = subscribers.filter((p: any) => {
      return p !== callback;
    });
  };
};

/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 *
 * @returns {*} - The data from the store using the specified selector.
 */
export const useSyncV = (selector: string): any => {
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

/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param {string} selector - The selector to use for accessing data in the store.
 * @param {CallableFunction} asyncFn - The async function to call to update the data in the store.
 * @param {{deleteExistingData: boolean}} [config={deleteExistingData: false}] - An optional object that specifies whether to delete existing data before updating.
 */
export const updateAsyncV = async (
  selector: string,
  asyncFn: CallableFunction,
  config = { deleteExistingData: false }
) => {
  try {
    // Delete existing data if specified in config
    if (config.deleteExistingData) {
      updateSyncV(selector, {
        data: null,
        loading: true,
        error: false,
      });
    } else {
      // Keep existing data while updating
      updateSyncV(selector, (p: any) => ({
        ...p,
        loading: true,
        error: false,
      }));
    }
    // Call async function and get data
    const data = await asyncFn();
    // Update synchronous state with new data
    updateSyncV(selector, (p: any) => ({
      ...p,
      data: data,
      loading: false,
    }));
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p: any) => ({
      ...p,
      loading: false,
      error: error,
    }));
  }
};

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param {string} selector - The selector for the asynchronous data.
 * @param {Object} config - Optional configuration options.
 * @param {Object} config.initialState - The initial state object for the asynchronous data. Default: { data: null, loading: false, error: false }.
 * @returns {Object} The synchronous state object for the given selector.
 */
export const useAsyncV = (
  selector: string,
  config = { initialState: { data: null, loading: false, error: false } }
) => {
  // Get initial state from config
  const initialState = config.initialState;

  update(store, selector, (p: any) => {
    if (p?.data !== undefined) return p;
    return {
      ...initialState,
    };
  });

  // Get the synchronous state object for the given selector
  const state = useSyncV(selector);

  // Return the synchronous state object
  return state;
};

/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param {string} selector - The selector for the synchronous state object to update.
 * @param {CallableFunction} asyncFn - The asynchronous function to call and get data.
 * @param {Object} config - The configuration object for the hook. Optional.
 * @param {Object} config.useAsyncV - The configuration object for the `useAsyncV` hook. Optional.
 * @param {Object} config.useAsyncV.initialState - The initial state object for the `useAsyncV` hook. Optional.
 * @param {Object} config.updateAsyncV - The configuration object for the `updateAsyncV` function. Optional.
 * @param {boolean} config.updateAsyncV.deleteExistingData - Whether to delete existing data in the synchronous state object before updating with the new data. Optional.
 * @returns {Object} The synchronous state object for the given selector, updated with the new data fetched asynchronously.
 */
export const useQueryV = (
  selector: string,
  asyncFn: CallableFunction,
  config = {
    useAsyncV: { initialState: { data: null, loading: true, error: false } },
    updateAsyncV: { deleteExistingData: false },
  }
) => {
  const state = useAsyncV(selector, config.useAsyncV);
  useEffect(() => {
    // if (state.data === null) return
    updateAsyncV(selector, asyncFn, config.updateAsyncV);
  }, []);
  return state;
};
