import { defaultsDeep } from 'lodash-es';
import { DeepPartial } from './helper.js';
import { updateSyncV } from './updateSyncV.js';
import { defaultAsyncReturn } from './useAsyncV.js';

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
export const updateAsyncV = async (
  selector: string,
  asyncFn: () => Promise<unknown> = async () => null,
  config: DeepPartial<typeof updateAsyncVDefaultConfig> = updateAsyncVDefaultConfig
) => {
  try {
    const customConfig = defaultsDeep(structuredClone(config),updateAsyncVDefaultConfig) as typeof updateAsyncVDefaultConfig

    // set initial asyncReturn and loading true
    updateSyncV(selector, (p: unknown) => {
      if (!p || customConfig.deleteExistingData) {
        return {
          data: null,
          loading: true,
          error: false
        }
      } else {
        return {
          ...defaultAsyncReturn,
          ...p,
          loading: true,
          error: false
        }
      }
    })

    // fetch data
    const data = await asyncFn();

    // Update synchronous state with new data
    updateSyncV(selector, (p: unknown) => {
      if (!p) {
        return {
          data: data,
          loading: false,
          error: false
        }
      } else {
        return {
          ...p,
          data: data,
          loading: false,
          error: false
        }
      }
    })
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p: unknown) => {
      if (!p) {
        return {
          data: null,
          loading: false,
          error: true
        }
      } else {
        return {
          ...defaultAsyncReturn,
          ...p,
          loading: false,
          error: true
        }
      }
    })
  }
};
