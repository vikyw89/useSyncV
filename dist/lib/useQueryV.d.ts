import { updateAsyncVConfig } from './updateAsyncV.js';
import { useAsyncVConfig } from './useAsyncV.js';
export type useQueryVConfig = {
    updateAsyncV: Partial<updateAsyncVConfig>;
    useAsyncV: Partial<useAsyncVConfig>;
    cacheData: boolean;
};
export type useQueryVDefaultConfig = {
    updateAsyncV: updateAsyncVConfig;
    useAsyncV: useAsyncVConfig;
    cacheData: boolean;
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export declare const useQueryV: (selector: string, asyncFn: () => unknown, config?: useQueryVDefaultConfig) => unknown;
