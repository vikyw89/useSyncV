import { defaultsDeep } from 'lodash-es';
import { DeepPartial } from './helper.js';
import { setAsyncStatusV } from './setAsyncStatusV.js';
import { setSyncV } from './setSyncV.js';
import { getSyncV } from './getSyncV.js';

/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export const setAsyncVDefaultConfig = {
    staleWhileRefetching: true,
    errorTimeout: 10000,
    refetch:true
};

/**
 * A function that sets the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to set the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating.
 * {@link setAsyncVDefaultConfig}
 * @returns stored value as promise
 */
export const setAsyncV = async (
    selector: string,
    asyncFn: (p:unknown) => Promise<unknown> = async () => null,
    config: DeepPartial<typeof setAsyncVDefaultConfig> = setAsyncVDefaultConfig
) => {
    const customConfig = defaultsDeep(config, setAsyncVDefaultConfig) as typeof setAsyncVDefaultConfig
    try {
        // set initial asyncStatusStore
        setAsyncStatusV(selector, {
            loading: true,
            error: null,
            refetch: customConfig.refetch
        })
        // set initial syncStore
        if (customConfig.staleWhileRefetching === false) {
            setSyncV(selector, null)
        }

        // fetch data
        const data = await asyncFn(getSyncV(selector));
        // update asyncStatusStore
        setAsyncStatusV(selector, {
            loading: false,
            error: null,
            refetch: customConfig.refetch
        })
        // update syncStore
        setSyncV(selector, data)
    } catch (error) {
        // Handle errors
        setTimeout(() => {
            setAsyncStatusV(selector, {
                loading:false,
                error:error ?? true,
                refetch: customConfig.refetch
            })
        }, customConfig.errorTimeout)
    }
};
