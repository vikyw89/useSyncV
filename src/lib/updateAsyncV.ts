import { updateSyncV } from './updateSyncV.js';

/**
 * config for updateSyncV
 */
export interface updateAsyncVConfigInterface {
  deleteExistingData: boolean;
}

/**
 * Default config for updateAsyncV
 */
export const updateAsyncVDefaultConfig: Partial<updateAsyncVConfigInterface> = {
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
export const updateAsyncV = async (
  selector: string,
  asyncFn: CallableFunction,
  config = updateAsyncVDefaultConfig
) => {
  try {
    if (config.deleteExistingData) {
      updateSyncV(selector, {
        data: null,
        loading: true,
        error: false
      });
    } else {
      // Keep existing data while updating
      updateSyncV(selector, (p: any) => ({
        ...p,
        loading: true,
        error: false
      }));
    }
    // Call async function and get data
    const data = await asyncFn();
    // Update synchronous state with new data
    updateSyncV(selector, (p: any) => ({
      ...p,
      data: data,
      loading: false
    }));
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p: any) => ({
      ...p,
      loading: false,
      error: error
    }));
  }
};
