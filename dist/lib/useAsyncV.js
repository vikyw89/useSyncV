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
    const defaultInitialState = useAsyncVDefaultConfig.initialState;
    update(store, selector, (p) => {
        var _a, _b;
        if (!p) {
            const customInitialState = defaultsDeep((_a = structuredClone(config.initialState)) !== null && _a !== void 0 ? _a : {}, defaultInitialState);
            return customInitialState;
        }
        if (typeof p === 'object' && p !== null) {
            const mergedState = defaultsDeep((_b = structuredClone(p)) !== null && _b !== void 0 ? _b : {}, defaultInitialState);
            return mergedState;
        }
    });
    // Get the synchronous state object for the given selector
    const state = useSyncV(selector);
    return state;
};
