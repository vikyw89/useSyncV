/**
 * Default config for useAsyncV
 */
export declare const useAsyncVDefaultConfig: {
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
 */
export declare const useAsyncV: (selector: string, config?: {
    initialState: {
        data: null;
        loading: boolean;
        error: boolean;
    };
}) => any;
