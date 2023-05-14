var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defaultsDeep } from 'lodash-es';
import { setAsyncStatusV } from './setAsyncStatusV.js';
import { setSyncV } from './setSyncV.js';
import { getSyncV } from './getSyncV.js';
import { setSubStatusV } from './setSubStatusV.js';
/**
 * Default config for updateAsyncV
 * - errorTimeout - time in ms before error is reset to false
 * - deleteExistingData - will set existing data to null
 */
export const refetchSubVDefaultConfig = {
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
 * {@link refetchSubVDefaultConfig}
 * @returns stored value as promise
 */
export const refetchSubV = (selector, asyncFn = () => __awaiter(void 0, void 0, void 0, function* () { return null; }), config = refetchSubVDefaultConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const customConfig = defaultsDeep(config, refetchSubVDefaultConfig);
    try {
        // set initial asyncStatusStore
        setAsyncStatusV(selector, {
            loading: true,
            error: null
        });
        // set initial syncStore
        if (customConfig.staleWhileRefetching === false) {
            setSyncV(selector, null);
        }
        // fetch data
        yield asyncFn(getSyncV(selector));
        // update asyncStatusStore
        setSubStatusV(selector, { refetch: true });
    }
    catch (error) {
        // Handle errors
        setTimeout(() => {
            setAsyncStatusV(selector, {
                loading: false,
                error: error !== null && error !== void 0 ? error : true
            });
        }, customConfig.errorTimeout);
    }
});
//# sourceMappingURL=refetchSubV.js.map