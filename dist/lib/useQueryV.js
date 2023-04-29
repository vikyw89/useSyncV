import { defaultsDeep } from 'lodash-es';
import { useEffect } from 'react';
import { updateAsyncV, updateAsyncVDefaultConfig, } from './updateAsyncV.js';
import { defaultAsyncReturn, useAsyncV, useAsyncVDefaultConfig, } from './useAsyncV.js';
/**
 * Default config for useQueryV
 */
export const useQueryVDefaultConfig = {
    useAsyncV: Object.assign(Object.assign({}, useAsyncVDefaultConfig), { initialState: Object.assign(Object.assign({}, defaultAsyncReturn), { loading: true }) }),
    updateAsyncV: updateAsyncVDefaultConfig,
    cacheData: true
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export const useQueryV = (selector, asyncFn, config = useQueryVDefaultConfig) => {
    const customConfig = defaultsDeep(structuredClone(config), useQueryVDefaultConfig);
    const state = useAsyncV(selector, customConfig.useAsyncV);
    useEffect(() => {
        // don't fetch if fetched data existed and cacheData is set to true
        if (config.cacheData && state && typeof state === "object" && "data" in state && "loading" in state && "error" in state && state.data !== null)
            return;
        // fetch data
        updateAsyncV(selector, asyncFn, customConfig.updateAsyncV);
    }, []);
    return state;
};
