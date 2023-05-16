import { defaultsDeep } from 'lodash-es';
import { getSyncV } from './getSyncV.js';
import { DeepPartial } from './helper.js';
import { setAsyncStatusV } from './setAsyncStatusV.js';
import { setSubStatusV } from './setSubStatusV.js';
import { setSyncV } from './setSyncV.js';

/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export const asyncRefetchVDefaultConfig = {
    staleWhileRefetching: true,
    errorTimeout: 10000,
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
export const asyncRefetchV = async (
    selector: string,
    asyncFn: (previousValue?: unknown) => Promise<unknown> = async () => null,
    config: DeepPartial<typeof asyncRefetchVDefaultConfig> = asyncRefetchVDefaultConfig
) => {
    const customConfig = defaultsDeep(config, asyncRefetchVDefaultConfig) as typeof asyncRefetchVDefaultConfig
    try {
        // set initial asyncStatusStore
        setAsyncStatusV(selector, {
            loading: true,
            error: null
        })
        // set initial syncStore
        if (customConfig.staleWhileRefetching === false) {
            setSyncV(selector, null)
        }

        // fetch data
        await asyncFn(getSyncV(selector));
        // update asyncstatus on successful fetch
        setAsyncStatusV(selector, {
            loading: false,
            error: null
        })
        // signal to refetch asyncSubV
        setSubStatusV(selector, { refetch: true })
    } catch (error) {
        // Handle errors
        setAsyncStatusV(selector, {
            loading: false,
            error: error ?? true
        })
        setTimeout(() => {
            setAsyncStatusV(selector, {
                loading: false,
                error: null
            })
        }, customConfig.errorTimeout)
    }
};
