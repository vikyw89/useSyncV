export declare const store: Object;
export declare let subscribers: Array<any>;
export declare const emitChange: () => void;
export declare const subscribe: (callback: CallableFunction) => () => void;
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store.
 */
export declare const debugSyncV: (selector: string) => void;
