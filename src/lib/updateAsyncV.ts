import { updateSyncV } from "./updateSyncV.js";

/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param {string} selector - The selector to use for accessing data in the store.
 * @param {CallableFunction} asyncFn - The async function to call to update the data in the store.
 * @param {{deleteExistingData: boolean}} [config={deleteExistingData: false}] - An optional object that specifies whether to delete existing data before updating.
 */
export const updateAsyncV = async (
  selector: string,
  asyncFn: CallableFunction,
  config: { deleteExistingData: boolean } = { deleteExistingData: false }
) => {
  try {
    // Delete existing data if specified in config
    if (config.deleteExistingData) {
      updateSyncV(selector, {
        data: null,
        loading: true,
        error: false,
      });
    } else {
      // Keep existing data while updating
      updateSyncV(selector, (p: any) => ({
        ...p,
        loading: true,
        error: false,
      }));
    }
    // Call async function and get data
    const data = await asyncFn();
    // Update synchronous state with new data
    updateSyncV(selector, (p: any) => ({
      ...p,
      data: data,
      loading: false,
    }));
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p: any) => ({
      ...p,
      loading: false,
      error: error,
    }));
  }
};
