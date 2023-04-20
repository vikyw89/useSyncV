/**
 * A function that reads data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for reading data from the store.
 *
 * @returns {*} - The data read from the store using the specified selector.
 */
export declare const readSyncV: (selector: string) => any;
/**
 * A function that creates new data in the store synchronously using the specified selector and value.
 *
 * @param {string} selector - The selector to use for creating new data in the store.
 * @param {*} value - The value to be added to the store using the specified selector.
 *
 * @returns {*} - The data that was created in the store using the specified selector and value.
 */
export declare const createSyncV: (selector: string, value: any) => any;
/**
 * A function that updates data in the store synchronously using the specified selector and updates.
 *
 * @param {string} selector - The selector to use for updating data in the store.
 * @param {*} updates - The updates to be applied to the data in the store using the specified selector.
 * If updates is a function, it will receive the previous value of the data and must return the new value.
 *
 * @returns {*} - The updated data in the store using the specified selector and updates.
 */
export declare const updateSyncV: (selector: string, updates: any) => any;
/**
 * A function that deletes data from the store synchronously using the specified selector.
 *
 * @param {string} selector - The selector to use for deleting data from the store.
 *
 * @returns {*} - The data that was deleted from the store using the specified selector.
 */
export declare const deleteSyncV: (selector: string) => boolean;
/**
 * A hook that provides synchronous access to the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 *
 * @returns {*} - The data from the store using the specified selector.
 */
export declare const useSyncV: (selector: string) => any;
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param {string} selector - The selector to use for accessing data in the store.
 */
export declare const debugSyncV: (selector: string) => void;
/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param {string} selector - The selector to use for accessing data in the store.
 * @param {CallableFunction} asyncFn - The async function to call to update the data in the store.
 * @param {{deleteExistingData: boolean}} [config={deleteExistingData: false}] - An optional object that specifies whether to delete existing data before updating.
 */
export declare const updateAsyncV: (selector: string, asyncFn: CallableFunction, config?: {
    deleteExistingData: boolean;
}) => Promise<void>;
/**
 * A custom hook for managing asynchronous data in an external store with synchronous state.
 *
 * @param {string} selector - The selector for the asynchronous data.
 * @param {Object} config - Optional configuration options.
 * @param {Object} config.initialState - The initial state object for the asynchronous data. Default: { data: null, loading: false, error: false }.
 * @returns {Object} The synchronous state object for the given selector.
 */
export declare const useAsyncV: (selector: string, config?: {
    initialState: {
        data: null;
        loading: boolean;
        error: boolean;
    };
}) => any;
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param {string} selector - The selector for the synchronous state object to update.
 * @param {CallableFunction} asyncFn - The asynchronous function to call and get data.
 * @param {Object} config - The configuration object for the hook. Optional.
 * @param {Object} config.useAsyncV - The configuration object for the `useAsyncV` hook. Optional.
 * @param {Object} config.useAsyncV.initialState - The initial state object for the `useAsyncV` hook. Optional.
 * @param {Object} config.updateAsyncV - The configuration object for the `updateAsyncV` function. Optional.
 * @param {boolean} config.updateAsyncV.deleteExistingData - Whether to delete existing data in the synchronous state object before updating with the new data. Optional.
 * @returns {Object} The synchronous state object for the given selector, updated with the new data fetched asynchronously.
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
