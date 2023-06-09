import { DeepPartial } from "./helper.js";
/**
 * Default config for useQueryV
 */
export declare const useQueryVDefaultConfig: {
    staleWhileRefetching: boolean;
    errorTimeout: number;
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * Will refetch whenever data changes
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export declare const useQueryV: (selector: string, asyncFn: () => Promise<unknown>, config?: DeepPartial<typeof useQueryVDefaultConfig>) => {
    data: unknown;
    loading: boolean;
    error: object | null;
};
