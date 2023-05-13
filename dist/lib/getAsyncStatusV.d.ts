export type defaultAsyncStatus = {
    loading: boolean;
    error: null | object;
    refetch: false;
};
export declare const defaultAsyncStatus: {
    loading: boolean;
    error: null;
    refetch: boolean;
};
/**
 * A function that reads data from the asyncStatus store and return the async state of the selector
 *
 * @param selector - The selector to use for reading data from the store.
 */
export declare function getAsyncStatusV(selector: string): defaultAsyncStatus | {
    loading: boolean;
    error: null;
    refetch: boolean;
};
