import { defaultsDeep } from 'lodash-es';
import { DeepPartial } from './helper.js';
import { updateSyncV } from './updateSyncV.js';
import { defaultAsyncReturn } from './useAsyncV.js';

/**
 * Default config for updateAsyncV
 */
export const updateAsyncVDefaultConfig = {
  deleteExistingData: false,
  errorTimeout: 5000
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
export const updateAsyncV = async (
  selector: string,
  asyncFn: () => Promise<unknown> = async () => null,
  config: DeepPartial<typeof updateAsyncVDefaultConfig> = updateAsyncVDefaultConfig
) => {
  const customConfig = defaultsDeep(config, updateAsyncVDefaultConfig) as typeof updateAsyncVDefaultConfig
  try {

    // set initial asyncReturn and loading true
    updateSyncV(selector, (p: unknown) => {
      if (!customConfig.deleteExistingData) {
        if (typeof p === 'object' && p !== null) {
          return {
            ...defaultAsyncReturn,
            ...p,
            loading: true,
            error: false
          }
        } else if (p === null || p === undefined) {
          return {
            ...defaultAsyncReturn,
            loading: true,
            error: false
          }
        } else {
          return {
            ...defaultAsyncReturn,
            loading: true,
            error: false,
            existingData: p
          }
        }
      } else {
        return {
          ...defaultAsyncReturn,
          loading: true
        }
      }
    })

    // fetch data
    const data = await asyncFn();

    // Update synchronous state with new data
    updateSyncV(selector, (p: object) => {
      return {
        ...p,
        data: data,
        loading: false,
        error: false
      }
    })
    return true
  } catch (error) {
    // Handle errors
    updateSyncV(selector, (p: object) => {
      return {
        ...defaultAsyncReturn,
        ...p,
        loading: false,
        error: error ?? true
      }
    })

    setTimeout(() => {
      updateSyncV(selector, (p: object) => {
        return {
          ...p,
          error: false
        }
      })
    }, customConfig.errorTimeout)
    return false
  }
};
