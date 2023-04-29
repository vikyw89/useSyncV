import { DeepPartial } from './helper.js';
export declare const defaultAsyncReturn: {
    data: null;
    loading: boolean;
    error: boolean;
};
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
 * {@link useAsyncVDefaultConfig}
 */
export declare const useAsyncV: (selector: string, config?: DeepPartial<typeof useAsyncVDefaultConfig>) => {
    data: null;
    loading: boolean;
    error: boolean;
} & object;
