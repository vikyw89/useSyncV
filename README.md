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
      <div>{counter.value}</div>
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
const users = readSyncV("users");
// this will return the state value
console.log(users);
```

here's what it will return

```jsx
{
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
  age: 20
};
```

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
// this will delete the state
```

### To SUBSCRIBE / SYNC to the state

this one is a react hook, only use it at the top level of react component

```jsx
export const UserProfileComponent = () => {
  const users = useSyncV("users[contacts][0]");
  // this will re-render the component whenever the value of users.contacts[0] changes
};
```

### To DEBUG

```jsx
debugSyncV("users.contacts[0]");
// this will print into console the value and the subscribers count of the particular state object at the time this function is called
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
  quote: (async () => {
    const response = await fetchQuoteFn();
    return response;
  })(),
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

```
