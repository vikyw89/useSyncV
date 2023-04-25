export interface asyncInterface {
    data: any;
    loading: boolean;
    error: boolean;
}
export interface useAsyncVConfigInterface {
    initialState: Partial<asyncInterface>;
}
/**
 * Default config for useAsyncV
 */
export declare const useAsyncVDefaultConfig: Partial<useAsyncVConfigInterface>;
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 * @param config - Optional configuration options.
 * {@link useAsyncVDefaultConfig}
 */
export declare const useAsyncV: (selector: string, config?: Partial<useAsyncVConfigInterface>) => any;
