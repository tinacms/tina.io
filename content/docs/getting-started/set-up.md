---
title: Set-up the CMS
---

In this step, we will install `tinacms`, wrap our app in the `TinaProvider`, create a CMS instance and configure the CMS object.

## Install _tinacms_

Install the `tinacms` package. This is the core package that you will need anytime you're using Tina. You'll also need to install `styled-components` to render the editing UI properly.

```bash
yarn add tinacms styled-components
```

## Add `TinaProvider`, create a CMS instance

Head to `App.js` and wrap the `TinaProvider` around the contents of the App. Then, instantiate the CMS and pass it to the `TinaProvider`. The provider creates a context from which we can access the CMS within the app.

**src/App.js**

```diff
import React from 'react';
+import { TinaProvider, TinaCMS } from 'tinacms';
import logo from './Icon.svg';
import './App.css';

function App() {
+ const cms = new TinaCMS();
  return (
+   <TinaProvider cms={cms}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{data.title}</h1>
          <p>{data.body}</p>
          <EditButton />
        </header>
      </div>
+   </TinaProvider>
  );
}

export default App;

//...
```

## Configure the CMS object

When creating an instance of the CMS, you can pass an options object to configure how the CMS works. This object allows us to attach and access Plugins, APIs, Media Stores, Events, and Editing UI on the CMS.

For our use case, we will add two options: `enabled` and `sidebar`. Read further on [additional options](/docs/cms#cms-configuration) that can be passed.

```js
const cms = new TinaCMS({
  enabled: false,
  sidebar: true,
})
```

## Enabling the CMS

Now the CMS is configured, but it is not enabled. Let's wire up the 'Edit This Site' button to toggle between enabled / disabled CMS states.

We'll use the `useCMS` hook to _tap into_ the CMS and enable it. This hook can be very useful throughout your App when needing to access or update the CMS object.

### The Steps

1. Import the `useCMS` hook.
2. In the `EditButton` component: toggle the `cms` state on click and render different button text depending on the enabled state.

```diff
import React from 'react';
-import { TinaProvider, TinaCMS } from 'tinacms';
+import { TinaProvider, TinaCMS, useCMS } from 'tinacms';
import logo from './Icon.svg';
import './App.css';

function App() {
  //...
}

function EditButton() {
+ const cms = useCMS();
  return (
-   <button onClick={() => window.alert("Tina isn't configured yet!")}>
-     Edit This Site
+   <button onClick={() => cms.toggle()}>
+    {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
}

//...
```

If you restart the dev server and click the 'Edit This Site' button, you should see an 'Edit Icon' in the lower right-hand corner.

This is the _Sidebar_ editing interface. There is also a _Toolbar_ interface, we won't work with that UI in this tutorial but feel free to read more on the [User Interface options](/docs/ui).

The example above uses a helpful method, `cms.toggle`, to switch between enabled/disabled states. Reference the documentation to see all the [CMS methods](/docs/cms) available.

Next, let's look into creating forms for editing content.
