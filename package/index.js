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
  console.log(`Value:`, JSON.parse(JSON.stringify(result(store, selector))));
  console.groupEnd();
};

/**
 * A custom function that updates an asynchronous state object for a given selector using an async function.
 * @async
 * @param {string} selector - The selector to use for the state object.
 * @param {Function} asyncFn - The async function to use for updating the state object.
 * @param {Object} [config] - An optional configuration object.
 * @param {boolean} [config.deleteExistingData=false] - A boolean flag indicating whether to delete the existing data in the state object.
 * @return {Promise<void>} A Promise that resolves when the state object has been updated.
 */
export const updateAsyncV = async (
  selector,
  asyncFn,
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
      updateSyncV(selector, (p) => ({
        ...p,
        loading: true,
        error: false,
      }));
    }
    // Call async function and get data
    const data = await asyncFn();
    // Update synchronous state with new data
    updateSyncV(selector, (p) => ({
      ...p,
      data: data,
      loading: false,
    }));
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p) => ({
      ...p,
      loading: false,
      error: error,
    }));
  }
};

/**
 * A custom React hook that provides an asynchronous state object for a given selector.
 * @param {string} selector - The selector to use for the state object.
 * @param {Object} [config] - An optional configuration object.
 * @param {Object} [config.initialState] - An optional initial state object.
 * @param {null} config.initialState.data - An optional initial data value.
 * @param {false} config.initialState.loading - An optional initial loading state.
 * @param {false} config.initialState.error - An optional initial error state.
 * @return {Object} The asynchronous state object for the given selector.
 */
export const useAsyncV = (
  selector,
  config = { initialState: { data: null, loading: false, error: false } }
) => {
  // Get initial state from config
  const initialState = config.initialState;

  /**
   * Update the store with the initial state if no data exists.
   * @param {Object} p - The previous state object.
   * @return {Object} The updated state object.
   */
  update(store, selector, (p) => {
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
 * A hook that allows you to fetch and update data asynchronously, and returns the state of the data.
 *
 * @param {string} selector - The selector to use for caching the data.
 * @param {function} asyncFn - The asynchronous function to fetch the data.
 * @param {object} [config] - The configuration object to use for the hook.
 * @param {object} [config.useAsyncV] - The configuration object to use for the useAsyncV hook.
 * @param {object} [config.useAsyncV.initialState] - The initial state of the useAsyncV hook.
 * @param {null} [config.useAsyncV.initialState.data] - The initial value of the data property in the state.
 * @param {true} [config.useAsyncV.initialState.loading] - The initial value of the loading property in the state.
 * @param {false} [config.useAsyncV.initialState.error] - The initial value of the error property in the state.
 * @param {object} [config.updateAsyncV] - The configuration object to use for the updateAsyncV function.
 * @param {false} [config.updateAsyncV.deleteExistingData] - Whether to delete existing data before updating.
 *
 * @returns {object} - The state of the data, containing the data, loading status, and error status.
 */
export const useQueryV = (
  selector,
  asyncFn,
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
