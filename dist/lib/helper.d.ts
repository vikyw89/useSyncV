export declare const syncStore: {};
export declare const asyncStatusStore: {};
export declare let subscribers: Array<() => unknown>;
export declare const selectorHistory: {};
export declare const emitChange: () => void;
export declare const subscribe: (callback: () => unknown) => () => void;
export declare const debugSyncVConfig: {
    maxHistory: number;
};
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store, debug store root if empty
 */
export declare const debugSyncV: (selector: string | undefined) => void;
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
