# useSyncV

a simplistic CRUDE state management for react,

## In a rush ?

```jsx
createSyncV("counter", 0);
// create a counter state with initial value of 0

export const CounterDisplayComponent = () => {
  const counter = useSyncV("counter");
  // sync this component to counter store, will re render whenever the value of counter changes
  return (
    <div>
      <div>{counter}</div>
      <CounterButton />
    </div>
  );
};
```

```jsx
export const CounterButton = () => {
  const incrementCounter = () => {
    updateSyncV("counter", (p) => p + 1);
    //this will increment the counter by 1, and thus re render CounterDisplayComponent
  };
  return (
    <div>
      <button onClick={incrementCounter}></button>
    </div>
  );
};
```

### for ASYNC:

```jsx
export const DataDisplay = () => {
  // This will fetch data and store it in the store
  // data will be stored in an object { data, loading, error}
  const {data, loading, error} = useQueryV("api", ()=>{
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data;
  });

  // This will re fetch data and wipe the old data, the alternative would be
  // updateAsyncV(), it will leave the old data for display until a new data arrived
  const refetchHandler = () => {
    createAsyncV("api", ()=>{
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      return data;
    })
  }
  return (
    <div>
      {data && <div>{data}</div>}
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching data...</div>}
      {error && <button onClick={refetchHandler}>Refetch Data</button>}
    </div>
  );
};

```

- by default result of useQueryV is cached in the store, if there are other components accessing useQueryV, they will get the cache result
- to update / refetch useQueryV content, use updateAsyncV / createAsyncV

## Usages:

### to CREATE a state with the name 'users' :

```jsx
const initialState = {
  name: "user1",
  id: "314991",
  contacts: [
    {
      id: 1,
      name: "Irene",
    },
    {
      id: 2,
      name: "Irenelle",
    },
  ],
};

createSyncV("users", initialState);
// this will put initialState into "users"

createSyncV("users.age", 20);
// this will add an object {age:20} under 'users' state

createSyncV("users[age]", 20);
// don't like using . notation, we can use bracket notation
```

### To READ the state:

let's try reading the "users" state

```jsx
const rootState = readSyncV("users.contacts[0].id");
// this will return the state value
console.log(rootState);
// => 1
```

- state is just a plain JS object, and we use the selector to choose where we want our state be
- selector is the same way we access JS object, either using dot notation or bracket, wrapped as string

### To UPDATE the state with an updater function:

```jsx
const updaterFn = (baseState) => ({
  ...baseState,
  age: 99,
});

updateSyncV("users", updaterFn);
// this will update the state

// updating deeply nested state can be tiring, we can also update it this way
updateSyncV("users.age", (baseState) => 20);

// don't like using updater function ? we can update it using create too
createSyncV("users.age", 20);
// these will do the same thing
```

### To DELETE the state :

```jsx
deleteSyncV("users");
// this will delete the state users and everything underneath users
```

### To SUBSCRIBE / SYNC to the state

this one is a react hook, only use it at the top level of react component

```jsx
export const UserProfileComponent = () => {
  const users = useSyncV("users[contacts][0]");
  // this will re-render the component whenever the value of users.contacts[0] changes
};
```

only scoop the state as specific as we need, this way we will not get a rerender on things we don't use

### To DEBUG

```jsx
debugSyncV("users.contacts[0]");
// this will print into console the value of the store
```

### To organize the store in a different file and have a reducer even an Async value

in your stores directory

```jsx
import { createSyncV } from "use-sync-v";

createSyncV("users", {
  name: "user1",
  id: "314991",
  contacts: [
    {
      id: 1,
      name: "Irene",
    },
    {
      id: 2,
      name: "Irenelle",
    },
  ],
  age: 20,
});

// we can have a reducer too
export class usersReducer {
  static addContact = (newContact) => {
    updateSyncV("users.contacts", (p) => {
      return [...p, newContact];
    });
  };
}

export const initStores = () => {};
```

and call the file on the root of your react app

```jsx
import { initStores } from "@/lib/store";

initStores();
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

and call the reducer anywhere

```jsx
export const UserContactsComponent = () => {
  const users = useSyncV("users[contacts]");
  const newContactForm = useSyncV("newContact.form");

  const addContactHandler = () => {
    usersReducer.addContact(newContactForm);
    // calling the reducer
  };
};
```

### To recap:

```jsx
createSyncV(path:string, value:any)
// to put value into state path, overwriting existing value if there's any

readSyncV(path:string)
// to read value of the state path at the time the function is called

updateSyncV(path:string, updaterFn:function)
// to update the value of the state path using an updater function
// the updater function take a parameter (original state) and return a value (updated state)

deleteSyncV(path:string)
// to delete anything on the particular state path

useSyncV(path:string)
// to subscribe to the state path, and will re render the component whenever the value change

useQueryV(path:string, asyncFn)
// to fetch a data from api, save the results into the store, and subscribe to it

createAsyncV(path:string, asyncFn)
// to fetch a data from api, delete the content inside path, and save the result

updateAsyncV(path:string, asyncFn)
// to fetch a data from api, and overwrite the old data when there's a new result

```
