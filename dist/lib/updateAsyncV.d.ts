/**
 * Type for updateAsyncVConfig
 */
export type updateAsyncVConfig = {
    deleteExistingData: boolean;
};
/**
 * Default config for updateAsyncV
 */
export declare const updateAsyncVDefaultConfig: updateAsyncVConfig;
export type asyncReturn = {
    data: any;
    loading: boolean;
    error: boolean;
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
export declare const updateAsyncV: (selector: string, asyncFn?: () => Promise<unknown>, config?: updateAsyncVConfig) => Promise<void>;
