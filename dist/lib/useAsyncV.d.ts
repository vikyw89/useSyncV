/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param selector - The selector for the asynchronous data.
 */
export declare const useAsyncV: (selector: string) => {
    data: unknown;
    loading: boolean;
    error: object | null;
};
