import { defaultsDeep } from 'lodash-es';
import { DeepPartial } from './helper.js';
import { setAsyncStatusV } from './setAsyncStatusV.js';
import { setSyncV } from './setSyncV.js';
import { getSyncV } from './getSyncV.js';
import { useEffect } from 'react';
import { getAsyncStatusV } from './getAsyncStatusV.js';

/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export const setAsyncVDefaultConfig = {
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
 * {@link setAsyncVDefaultConfig}
 * @returns stored value as promise
 */
export const setAsyncV = async (
    selector: string,
    asyncFn: (p?: unknown) => Promise<unknown> = async () => null,
    config: DeepPartial<typeof setAsyncVDefaultConfig> = setAsyncVDefaultConfig
) => {
    const customConfig = defaultsDeep(config, setAsyncVDefaultConfig) as typeof setAsyncVDefaultConfig
    // prevent multiple fetch when one isn't done yet
    const ongoingFetch = getAsyncStatusV(selector).loading
    if (ongoingFetch) return
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
        const data = await asyncFn(getSyncV(selector));
        // update syncStore
        setSyncV(selector, data)
        // update asyncStatusStore
        setAsyncStatusV(selector, {
            loading: false,
            error: null
        })
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
