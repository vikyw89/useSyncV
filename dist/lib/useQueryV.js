import { useEffect } from 'react';
import { updateAsyncV, updateAsyncVDefaultConfig } from './updateAsyncV.js';
import { useAsyncV, useAsyncVDefaultConfig } from './useAsyncV.js';
/**
 * Default config for useQueryV
 */
export const useQueryVDefaultConfig = {
    useAsyncV: {
        ...useAsyncVDefaultConfig,
        initialState: {
            ...useAsyncVDefaultConfig.initialState,
            loading: true
        }
    },
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
    const state = useAsyncV(selector, config?.useAsyncV);
    useEffect(() => {
        if (config.cacheData && state.data) {
            return;
        }
        else {
            updateAsyncV(selector, asyncFn, config?.updateAsyncV);
        }
    }, []);
    return state;
};
