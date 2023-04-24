import { initial, update } from "lodash-es";
import { useSyncV } from "./useSyncV.js";
import { store } from "./helper.js";

export interface asyncInterface {
  data:any,
  loading:boolean,
  error:boolean
}

export interface useAsyncVConfigInterface {
  initialState: Partial<asyncInterface>
}

/**
 * Default config for useAsyncV
 */
export const useAsyncVDefaultConfig: Partial<useAsyncVConfigInterface> = {
  initialState: { data: null, loading: false, error: false },
};

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 */
export const useAsyncV = (
  selector: string,
  config = useAsyncVDefaultConfig
) => {
  const defaultInitialState = useAsyncVDefaultConfig.initialState;
  const customInitialState = {
    ...defaultInitialState,
    ...config.initialState,
  };
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
