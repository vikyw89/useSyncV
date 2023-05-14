export declare const syncStore: {};
export declare const asyncStatusStore: {};
export declare const subStatusStore: {};
export declare let subscribers: Array<() => unknown>;
export declare const selectorHistory: {};
export declare const emitChange: () => void;
export declare const subscribe: (callback: () => unknown) => () => void;
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
