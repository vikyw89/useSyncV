import { update } from 'lodash-es';
import { store } from './helper.js';
import { useSyncV } from './useSyncV.js';

export interface asyncInterface {
  data: unknown;
  loading: boolean;
  error: boolean;
}

export interface useAsyncVConfigInterface {
  initialState: Partial<asyncInterface>;
}

/**
 * Default config for useAsyncV
 */
export const useAsyncVDefaultConfig: Partial<useAsyncVConfigInterface> = {
  initialState: { data: null, loading: false, error: false }
};

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * {@link useAsyncVDefaultConfig}
 */
export const useAsyncV = (
  selector: string,
  config = useAsyncVDefaultConfig
) => {
  const defaultInitialState = useAsyncVDefaultConfig.initialState;
  const customInitialState = {
    ...defaultInitialState,
    ...config.initialState
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(store, selector, (p: any) => {
    if (typeof p === 'object') {
      if ('data' in p && 'loading' in p && 'error' in p) return p;
      return { ...customInitialState, ...p };
    }
    return customInitialState;
  });

  // Get the synchronous state object for the given selector
  const state = useSyncV(selector);

  // Return the synchronous state object
  return state;
};
