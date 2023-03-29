# useSyncV

a simplistic CRUD global state management for react with a built in async fetching

- no boilercode to start with, use it out of the box
- CREATE, READ, UPDATE and DELETE
- structure the store / state how you want it, it's behaving like JS object
- efficient rendering by utilizing selector
- extendable if you like to use reducer, write a reducer just like how you write vanilla JS IIFE or static class
- built in fetch with cache, and return synced {data, loading, error} for your UI

## In a rush ?

```jsx
updateSyncV("counter", 0);
// create a counter state with initial value of 0

export const CounterDisplayComponent = () => {
  const counter = useSyncV("counter");
  // sync this component to "counter" state, will re render whenever the value of counter changes
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
    // this will increment the counter by 1, and thus re-render CounterDisplayComponent
  };
  return (
    <div>
      <button onClick={incrementCounter}></button>
    </div>
  );
};
```

### Fetching data:

```jsx
const fetchRandomUser = async () => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data;
};

export const DataDisplayComponent = () => {
  // This will fetch data and store it in the "api" state
  // data will be stored in an object format { data, loading, error}
  // when you use useQuery to "api" state in different component later on, by default cached data will be served instead of refetched
  const { data, loading, error } = useQueryV("api", fetchRandomUser);

  const refetchHandler = () => {
    // This will wipe the old data in "api" state, and renew it
    updateAsyncV("api", fetchRandomUser);
  };
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

## Usages:

### To CREATE a state to store "theme" :

```jsx
const darkTheme = {
  primary: {
    main: '#1976d2',
    light: 'rgb(71, 145, 219)',
    dark: 'rgb(17, 82, 147)',
    contrastText: '#fff'
  },
  secondary: {
    main: '#9c27b0',
    light: 'rgb(175, 82, 191)',
    dark: 'rgb(109, 27, 123)',
    contrastText: '#fff'
  },
  error: {
    main: '#d32f2f',
    light: 'rgb(219, 88, 88)',
    dark: 'rgb(147, 32, 32)',
    contrastText: '#fff'
  },
  warning: {
    main: '#ed6c02',
    light: 'rgb(240, 137, 52)',
    dark: 'rgb(165, 75, 1)',
    contrastText: '#fff'
  },
  info: {
    main: '#0288d1',
    light: 'rgb(52, 159, 218)',
    dark: 'rgb(1, 95, 146)',
    contrastText: '#fff'
  },
  success: {
    main: '#2e7d32',
    light: 'rgb(87, 151, 91)',
    dark: 'rgb(32, 87, 35)',
    contrastText: '#fff'
  },
  common: { black: '#000', white: '#fff' },
  grey: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#616161'
  },
  contrastThreshold: 3,
  getContrastText: [Function: getContrastText],
  augmentColor: [Function: augmentColor],
  tonalOffset: 0.2,
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: { paper: '#121212', default: '#121212' },
  action: {
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
}

updateSyncV("theme.dark", theme);
// this will put themeDark into "theme.dark" state

// if you don't like using . notation, you can also do this
updateSyncV("theme[dark]", theme)
// this will do the exact same thing like above
```

- in CRUD create, create will add an object into an array, while useful for a database, it's rarely useful for managing state
- we suggest using updateSyncV to manage state

### To READ the state:

let's try reading the state

```jsx
const themePrimary = readSyncV("theme.dark.primary");
console.log({ themePrimary });
```

in our console

```jsx
themePrimary: {
  main: '#1976d2',
  light: 'rgb(71, 145, 219)',
  dark: 'rgb(17, 82, 147)',
  contrastText: '#fff'
}
```

- state is just a plain JS object
- selector is the same way we access JS object, either using dot notation or bracket, wrapped as string

### To UPDATE the state:

assuming we want to change the warning contrastText of our theme to white

```jsx
updateSyncV("theme.dark.warning.contrastText", "white");
// this will update the value stored in our selector into "white"
```

but sometimes we want to update things while also referencing the base value

```jsx
updateSyncV("theme.dark.warning.contrastText", (p) => {
  if (p === "white") {
    return "grey";
  }
});
// this will only update the contrast text to grey if the existing value is white
```

updateSync accepts an updater or a value as 2nd argument, hint: just like react useState setterFn

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
  // this will re-render the component whenever the value of "users.contacts[0]" changes

  const asyncData = useAsyncV("asyncData");
  // similar to above but it will sync on asyncData changes, such as {data, loading, error}

  const asyncQuery = useQueryV("query", queryFn);
  // this is a custom hook to both sync and fetch data, by default data will be cached
};
```

- for sync operation, use syncV, for async operation, use asyncV
- asyncV will return an object of loading, error, and data they are useful to update UI
- for selector, only scoop the state as specific as we need, this way we will not get a rerender on things we don't use

### To DEBUG

```jsx
debugSyncV("users.contacts[0]");
// this will print into console the value of the selector
```

### To organize the store in a different file and have a reducer

in your stores directory

```jsx
import { createSyncV } from "use-sync-v";

// to pre populate initial state
updateSyncV("users", {
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

// for the reducer
export class usersReducer {
  static addContact = (newContact) => {
    updateSyncV("users.contacts", (p) => {
      return [...p, newContact];
    });
  };
}

export const initStores = () => {};
```

and call the file in the root of your react app

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
createSyncV(selector:string, value:any)
// this will create an array at the selector state, and push the value
// rarely used, just use updateSyncV instead

readSyncV(selector:string)
// to read value of the state selector at the time the function is called

updateSyncV(selector:string, updates:function || value)
// to update the value of the state selector using an updater function or a value
// the updater function take a parameter (original state) and return a value (updated state)
// if given a value, it will replace existing value with the value

deleteSyncV(selector:string)
// to delete anything on the particular state selector

useSyncV(selector:string)
// to subscribe to the state selector, and will re render the component whenever the value change
// be specific in the selector to prevent unnecessary rerendering

useAsyncV(selector:string, asyncFn:function)
// will subscribe to the selector, and if there's no existing data, it will prepopulate it with {loading, data, error} initial state

updateAsyncV(selector:string, asyncFn:function)
// to fetch a data from api, save the results into the store

useQueryV(selector:string, asyncFn:function)
// this is a bundle of useAsyncV and updateAsyncV
// to fetch a data from api, save the results into the store, and subscribe to it
// by default the result is cached
```
