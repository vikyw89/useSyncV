/**
 * config for updateSyncV
 */
export interface updateAsyncVConfigInterface {
    deleteExistingData: boolean;
}
/**
 * Default config for updateAsyncV
 */
export declare const updateAsyncVDefaultConfig: Partial<updateAsyncVConfigInterface>;
/**
 * A function that updates the data in the store asynchronously using the specified selector and async function.
 *
 * @async
 * @param selector - The selector to use for accessing data in the store.
 * @param asyncFn - The async function to call to update the data in the store.
 * @param config - An optional object that specifies whether to delete existing data before updating. {@link updateAsyncVDefaultConfig}
 */
export declare const updateAsyncV: (selector: string, asyncFn: CallableFunction, config?: Partial<updateAsyncVConfigInterface>) => Promise<void>;
