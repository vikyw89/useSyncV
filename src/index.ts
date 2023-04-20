import { result, set, unset, update } from "lodash";
import { useEffect, useSyncExternalStore } from "react";

const store = {};

let subscribers: Array<any> = [];

const emitChange = () => {
  for (let subscriber of subscribers) {
    subscriber();
  }
};

export const readSyncV = (selector: string) => {
  const response = result(store, selector);
  return response;
};

export const createSyncV = (selector: string, value: any) => {
  const response = update(store, selector, (p: any) => {
    if (Array.isArray(p)) {
      return [...p, value];
    }
    return [value];
  });
  emitChange();
  return response;
};

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

export const useSyncV = (selector: string) => {
  const getSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  const getServerSnapshot = () => {
    return JSON.stringify(result(store, selector));
  };

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return readSyncV(selector);
};

export const debugSyncV = (selector: string) => {
  console.group(`Debug SyncV`);
  console.log(`Selector: ${selector}`);
  console.log(`Value:`, JSON.parse(JSON.stringify(result(store, selector))));
  console.groupEnd();
};

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

export const useAsyncV = (
  selector: string,
  config = { initialState: { data: null, loading: false, error: false } }
) => {
  // Get initial state from config
  const initialState = config.initialState;

  /**
   * Update the store with the initial state if no data exists.
   * @param {Object} p - The previous state object.
   * @return {Object} The updated state object.
   */
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
