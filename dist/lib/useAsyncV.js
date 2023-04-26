import { update } from 'lodash-es';
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
    var _a;
    // default initial state from config
    const defaultInitialState = useAsyncVDefaultConfig.initialState;
    // composing initial state from incomplete user input
    const configInitialState = (_a = config.initialState) !== null && _a !== void 0 ? _a : {};
    const customInitialState = Object.assign(Object.assign({}, defaultInitialState), configInitialState);
    update(store, selector, (p) => {
        if (!p)
            return customInitialState;
        if (typeof p === 'object') {
            if ('data' in p && 'loading' in p && 'error' in p)
                return p;
            return Object.assign(Object.assign({}, customInitialState), p);
        }
    });
    // Get the synchronous state object for the given selector
    const state = useSyncV(selector);
    // Return the synchronous state object
    return state;
};
