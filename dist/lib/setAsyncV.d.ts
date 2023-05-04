import { DeepPartial } from './helper.js';
/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export declare const setAsyncVDefaultConfig: {
    deleteExistingData: boolean;
    errorTimeout: number;
};
/**
 * A function that sets the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to set the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating.
 * {@link setAsyncVDefaultConfig}
 * @returns stored value as promise
 */
export declare const setAsyncV: (selector: string, asyncFn?: () => Promise<unknown>, config?: DeepPartial<typeof setAsyncVDefaultConfig>) => Promise<{
    data: null;
    loading: boolean;
    error: boolean;
} & object>;
