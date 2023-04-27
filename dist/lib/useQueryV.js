import { useEffect } from 'react';
import { updateAsyncV, updateAsyncVDefaultConfig, } from './updateAsyncV.js';
import { useAsyncV, useAsyncVDefaultConfig, } from './useAsyncV.js';
import { defaultsDeep } from 'lodash-es';
/**
 * Default config for useQueryV
 */
export const useQueryVDefaultConfig = {
    useAsyncV: Object.assign(Object.assign({}, useAsyncVDefaultConfig), { initialState: Object.assign(Object.assign({}, useAsyncVDefaultConfig.initialState), { loading: true }) }),
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
    const customConfig = structuredClone(useQueryVDefaultConfig);
    defaultsDeep(customConfig, useQueryVDefaultConfig);
    const state = useAsyncV(selector, customConfig.useAsyncV);
    useEffect(() => {
        // don't fetch if fetched data existed and cacheData is set to true
        if (state && config.cacheData && typeof state === "object" && "data" in state && "loading" in state && "error" in state && state !== null)
            return;
        // fetch data
        updateAsyncV(selector, () => asyncFn(), customConfig.updateAsyncV);
        return;
    }, []);
    return state;
};
