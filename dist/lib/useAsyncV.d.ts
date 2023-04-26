export type asyncReturn = {
    data: unknown;
    loading: boolean;
    error: boolean;
};
export declare const defaultAsyncReturn: asyncReturn;
export type useAsyncVConfig = {
    initialState: Partial<asyncReturn>;
};
export type useAsyncVDefaultConfig = {
    initialState: asyncReturn;
};
/**
 * Default config for useAsyncV
 */
export declare const useAsyncVDefaultConfig: useAsyncVDefaultConfig;
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * {@link useAsyncVDefaultConfig}
 */
export declare const useAsyncV: (selector: string, config?: Partial<useAsyncVConfig>) => asyncReturn | unknown;
