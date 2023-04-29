import { defaultsDeep, update } from 'lodash-es';
import { store } from './helper.js';
import { useSyncV } from './useSyncV.js';
export const defaultAsyncReturn = {
    data: null,
    loading: false,
    error: false
};
/**
 * Default config for useAsyncV
 */
export const useAsyncVDefaultConfig = {
    initialState: defaultAsyncReturn
};
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * {@link useAsyncVDefaultConfig}
 */
export const useAsyncV = (selector, config = useAsyncVDefaultConfig) => {
    const customConfig = defaultsDeep(config, useAsyncVDefaultConfig);
    const defaultInitialState = customConfig.initialState;
    update(store, selector, (p) => {
        if (typeof p === 'object' && p !== null) {
            if ('data' in p && 'loading' in p && 'error' in p)
                return p;
            return Object.assign(Object.assign({}, defaultInitialState), p);
        }
        return defaultInitialState;
    });
    // Get the synchronous state object for the given selector
    const state = useSyncV(selector);
    return state;
};
