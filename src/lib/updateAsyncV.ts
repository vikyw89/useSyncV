import { DeepPartial } from './helper.js';
import { setAsyncV } from './setAsyncV.js';

/**
 * Default config for updateAsyncV
 */
export const updateAsyncVDefaultConfig = {
  deleteExistingData: true,
  errorTimeout: 10000
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
  return await setAsyncV(selector, asyncFn, config)
};
