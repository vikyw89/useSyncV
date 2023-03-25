import { createSyncV } from "use-sync-v";

createSyncV("a", 4);
createSyncV("b", {
  5: 10,
});
createSyncV("c", {
  c: 67,
});

export const initStores = () => {};
