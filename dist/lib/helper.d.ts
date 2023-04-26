export declare const store: {};
export declare let subscribers: Array<Function>;
export declare const selectorHistory: {};
export declare const emitChange: () => void;
export declare const subscribe: (callback: Function) => () => void;
export declare const debugSyncVConfig: {
    maxHistory: number;
};
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store, debug store root if empty
 */
export declare const debugSyncV: (selector: string | undefined) => void;
