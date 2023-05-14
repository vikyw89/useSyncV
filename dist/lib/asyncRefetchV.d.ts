import { DeepPartial } from './helper.js';
/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export declare const asyncRefetchVDefaultConfig: {
    staleWhileRefetching: boolean;
    errorTimeout: number;
};
/**
 * A function that sets the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to set the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating.
 * {@link asyncRefetchVDefaultConfig}
 * @returns stored value as promise
 */
export declare const asyncRefetchV: (selector: string, asyncFn?: (previousValue?: unknown) => Promise<unknown>, config?: DeepPartial<typeof asyncRefetchVDefaultConfig>) => Promise<void>;
