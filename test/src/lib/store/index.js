import { updateSyncV } from 'use-sync-v';

updateSyncV('users', [
  {
    id: 1,
    name: 'irene',
    phone: '323444',
    contacts: [
      {
        name: 'irenelle'
      },
      {
        name: 'irena'
      }
    ]
  }
]);

export const initStores = () => {};
