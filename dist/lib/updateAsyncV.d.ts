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
