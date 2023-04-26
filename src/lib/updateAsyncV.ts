import { updateSyncV } from './updateSyncV.js';
/**
 * Type for updateAsyncVConfig
 */
export type updateAsyncVConfig = {
  deleteExistingData:boolean
}

/**
 * Default config for updateAsyncV
 */
export const updateAsyncVDefaultConfig:updateAsyncVConfig = {
  deleteExistingData: false
};

export type asyncReturn = {
  data:unknown,
  loading:boolean,
  error:boolean
}
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
  asyncFn: () => Promise<unknown> = async()=>null,
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
      updateSyncV(selector, (p:object) => ({
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
