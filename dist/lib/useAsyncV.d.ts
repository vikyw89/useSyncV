export declare const defaultConfig: {
    initialState: {
        data: null;
        loading: boolean;
        error: boolean;
    };
};
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * @param config.initialState - Optional initial state.
 * @param config.initialState.data - Optional initial data, default to null.
 * @param config.initialState.loading - Optional initial loading status, default to false.
 * @param config.initialState.error - Optional initial error status, default to false.
 */
export declare const useAsyncV: (selector: string, config?: {
    initialState: {
        data: null;
        loading: boolean;
        error: boolean;
    };
}) => any;
