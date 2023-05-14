export const syncStore = {};
export const asyncStatusStore = {};
export const subStatusStore = {};
export let subscribers = [];
export const selectorHistory = {};
export const emitChange = () => {
    for (const subscriber of subscribers) {
        subscriber();
    }
};
export const subscribe = (callback) => {
    subscribers = [...subscribers, callback];
    return () => {
        subscribers = subscribers.filter((p) => {
            return p !== callback;
        });
    };
};
//# sourceMappingURL=helper.js.map