var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export const updateAsyncV = (selector, asyncFn = () => __awaiter(void 0, void 0, void 0, function* () { return null; }), config = updateAsyncVDefaultConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customConfig = Object.assign(Object.assign({}, updateAsyncVDefaultConfig), config);
        console.log(config, customConfig);
        // set initial asyncReturn and loading true
        updateSyncV(selector, (p) => {
            if (!p || customConfig.deleteExistingData) {
                console.log('delete existing data');
                return {
                    data: null,
                    loading: true,
                    error: false
                };
            }
            else {
                return Object.assign(Object.assign(Object.assign({}, defaultAsyncReturn), p), { loading: true, error: false });
            }
        });
        // fetch data
        const data = yield asyncFn();
        // Update synchronous state with new data
        updateSyncV(selector, (p) => {
            if (!p) {
                return {
                    data: data,
                    loading: false,
                    error: false
                };
            }
            else {
                return Object.assign(Object.assign({}, p), { data: data, loading: false, error: false });
            }
        });
    }
    catch (error) {
        // Handle errors
        updateSyncV(selector, (p) => {
            if (!p) {
                return {
                    data: null,
                    loading: false,
                    error: true
                };
            }
            else {
                return Object.assign(Object.assign(Object.assign({}, defaultAsyncReturn), p), { loading: false, error: true });
            }
        });
    }
});
