/**
 * Default config for useQueryV
 */
export declare const useQueryVDefaultConfig: {
    useAsyncV: {
        initialState: {
            data: null;
            loading: boolean;
            error: boolean;
        };
    };
    updateAsyncV: {
        deleteExistingData: boolean;
    };
};
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 */
export declare const useQueryV: (selector: string, asyncFn: CallableFunction, config?: {
    useAsyncV: {
        initialState: {
            data: null;
            loading: boolean;
            error: boolean;
        };
    };
    updateAsyncV: {
        deleteExistingData: boolean;
    };
}) => any;
