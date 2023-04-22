import { update } from "lodash-es";
import { useSyncV } from "./useSyncV.js";
import { store } from "./helper.js";

export const defaultConfig = {
  initialState: { data: null, loading: false, error: false },
};

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * @param config.initialState - Optional initial state.
 * @param config.initialState.data - Optional initial data, default to null.
 * @param config.initialState.loading - Optional initial loading status, default to false.
 * @param config.initialState.error - Optional initial error status, default to false.
 */
export const useAsyncV = (selector: string, config = defaultConfig) => {
  const defaultInitialState = defaultConfig.initialState;
  const customInitialState = {
    ...defaultInitialState,
    ...config.initialState
  }
  update(store, selector, (p: any) => {
    if (typeof p === "object") {
      if ("data" in p && "loading" in p && "error" in p) return p;
      return { ...customInitialState, ...p };
    }
    return customInitialState;
  });

  // Get the synchronous state object for the given selector
  const state = useSyncV(selector);

  // Return the synchronous state object
  return state;
};
