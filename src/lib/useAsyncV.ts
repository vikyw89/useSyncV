import { update } from "lodash-es";
import { useSyncV } from "./useSyncV.js";
import { store } from "./helper.js";

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
