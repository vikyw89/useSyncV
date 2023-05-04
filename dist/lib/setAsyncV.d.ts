import { DeepPartial } from './helper.js';
/**
 * Default config for updateAsyncV
 */
export declare const updateAsyncVDefaultConfig: {
    deleteExistingData: boolean;
    errorTimeout: number;
};
/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to update the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating.
 * {@link updateAsyncVDefaultConfig}
 * @returns true if update succeed, false if failed
 */
export declare const setAsyncV: (selector: string, asyncFn?: () => Promise<unknown>, config?: DeepPartial<typeof updateAsyncVDefaultConfig>) => Promise<{
    data: null;
    loading: boolean;
    error: boolean;
} & object>;
