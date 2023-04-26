import { update } from 'lodash-es';
import { store } from './helper.js';
import { useSyncV } from './useSyncV.js';

export type asyncReturn = {
  data: unknown;
  loading: boolean;
  error: boolean;
}

export const defaultAsyncReturn: asyncReturn = {
  data: null,
  loading: false,
  error: false
}

export type useAsyncVConfig = {
  initialState: Partial<asyncReturn>;
}

export type useAsyncVDefaultConfig = {
  initialState: asyncReturn
}
/**
 * Default config for useAsyncV
 */
export const useAsyncVDefaultConfig: useAsyncVDefaultConfig = {
  initialState: defaultAsyncReturn
}

/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * {@link useAsyncVDefaultConfig}
 */
export const useAsyncV = (
  selector: string,
  config: Partial<useAsyncVConfig> = useAsyncVDefaultConfig
): asyncReturn | unknown => {
  // default initial state from config
  const defaultInitialState = useAsyncVDefaultConfig.initialState;

  // composing initial state from incomplete user input
  const configInitialState = config.initialState ?? {}

  const customInitialState = {
    ...defaultInitialState,
    ...configInitialState
  };

  update(store, selector, (p: unknown) => {
    if (!p) return customInitialState;
    if (typeof p === 'object') {
      if ('data' in p && 'loading' in p && 'error' in p) return p;
      return { ...customInitialState, ...p };
    }

  });

  // Get the synchronous state object for the given selector
  const state = useSyncV(selector);

  // Return the synchronous state object
  return state as asyncReturn | unknown
};
