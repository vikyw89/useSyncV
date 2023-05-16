import { DeepPartial } from "./helper.js";
/**
 * Default config for useQueryV
 */
export declare const useAsyncSubVDefaultConfig: {
    staleWhileRefetching: boolean;
    /**
     * Default config for useQueryV
     */
    errorTimeout: number;
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * Will refetch whenever data changes
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useAsyncSubVDefaultConfig}
 */
export declare const useAsyncSubV: (selector: string, asyncFn: (p: unknown) => Promise<unknown>, config?: DeepPartial<typeof useAsyncSubVDefaultConfig>) => {
    data: unknown;
    loading: boolean;
    error: object | null;
};
