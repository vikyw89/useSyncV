import { updateAsyncVConfigInterface } from "./updateAsyncV.js";
import { useAsyncVConfigInterface } from "./useAsyncV.js";
export interface useQueryVConfigInterface {
    updateAsyncV: Partial<updateAsyncVConfigInterface>;
    useAsyncV: Partial<useAsyncVConfigInterface>;
}
/**
 * Default config for useQueryV
 */
export declare const useQueryVDefaultConfig: Partial<useQueryVConfigInterface>;
/**
 * Hook that provides a reactive way to fetch data asynchronously and update the synchronous state of the application.
 * @param selector - The selector for the synchronous state object to update.
 * @param asyncFn - The asynchronous function to call and get data.
 * @param config - The configuration object for the hook. Optional.
 * {@link useQueryVDefaultConfig}
 */
export declare const useQueryV: (selector: string, asyncFn: CallableFunction, config?: Partial<useQueryVConfigInterface>) => any;
