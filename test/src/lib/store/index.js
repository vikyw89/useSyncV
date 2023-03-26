import { createSyncV } from "use-sync-v";

createSyncV("users", [
  {
    id:1,
    name:'irene',
    phone:'323444',
    contacts:[
      {
        name:'irenelle'
      },
      {
        name:'irena'
      }
    ]
  }
]);

export const initStores = () => {};
