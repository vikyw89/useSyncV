/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateSyncV } from './updateSyncV.js';
/**
 * Default config for updateAsyncV
 */
export const updateAsyncVDefaultConfig = {
    deleteExistingData: false
};
/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to update the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating.
 * {@link updateAsyncVDefaultConfig}
 */
export const updateAsyncV = async (selector, asyncFn, config = updateAsyncVDefaultConfig) => {
    try {
        if (config.deleteExistingData) {
            updateSyncV(selector, {
                data: null,
                loading: true,
                error: false
            });
        }
        else {
            // Keep existing data while updating
            updateSyncV(selector, (p) => ({
                ...p,
                loading: true,
                error: false
            }));
        }
        // Call async function and get data
        const data = await asyncFn();
        // Update synchronous state with new data
        updateSyncV(selector, (p) => ({
            ...p,
            data: data,
            loading: false
        }));
    }
    catch (error) {
        // Handle errors
        updateSyncV(selector, (p) => ({
            ...p,
            loading: false,
            error: error
        }));
    }
};
