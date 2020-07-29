---
title: Set-up the CMS
prev: /docs/getting-started/introduction
next: /docs/getting-started/edit-content
---

In this step, we will install `tinacms`, wrap our app in the `TinaProvider`, create a CMS instance and configure the CMS object.

## Install _tinacms_

Install the `tinacms` package. This is the core package that you will need anytime you're using Tina. You'll also need to install `styled-components` to render the editing UI properly.

```bash
yarn add tinacms styled-components
```

## Add _TinaProvider_, create a CMS instance

The first steps to setting up Tina is to create an [instance of `TinaCMS`](/docs/cms) and then wrap your site in the `TinaProvider`. This [provider](https://github.com/tinacms/tinacms/blob/master/packages/tinacms/src/components/TinaProvider.tsx) sets up the editing UI, and provides a [context](https://reactjs.org/docs/context.html) from which we can access the CMS througout the app.

Head to `App.js` and follow these steps:

### The Steps

1. Import `TinaProvider` & `TinaCMS`
2. Create an instance of `TinaCMS`
3. Wrap `TinaProvider` around the contents of `App`, pass the `cms`.

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
        <PageContent />
      </div>
+   </TinaProvider>
  );
}

export default App;

//...
```

## Configure the CMS object

When instantiating the CMS, you can pass an [options object](/docs/cms#cms-configuration) to configure how the CMS works. This object allows us to attach and access [Plugins](/docs/plugins), [APIs](/docs/apis), [Media Stores](/docs/media), [Events](/docs/events), [Editing UI](/docs/ui) and other key aspects of the CMS.

Update your CMS instance with these options:

**src/App.js**

```js
function App() {
  const cms = new TinaCMS({
    enabled: false,
    sidebar: true,
  })
  return (
      //...
  )
}
```

### Options

For our simple use case, we added two options: `enabled` and `sidebar`.

The `enabled` property _enables or disables_ the CMS, meaning that content is editable when this values is true. The CMS is _enabled by default_. We set this property to `false` so the editor can manually enable the CMS (we'll configure this at the next step).

The `sidebar` property controls the _Sidebar UI_. Reference [the documentation](/docs/ui#sidebar-configuration) to see how you can configure this further.

The config options are a **key part of constructing your custom CMS**. Read further on [additional options](/docs/cms#cms-configuration) that can be passed.

## Enabling the CMS

Now the CMS is configured, but it is not enabled, so we can't see the sidebar UI. Let's wire up the 'Edit This Site' button to toggle between [enabled / disabled](/docs/cms#disabling--enabling-the-cms) CMS states.

We'll use the `useCMS` hook to get the CMS object from the context provided by `TinaProvider`. This hook can be very useful throughout your App when needing to [access or update](/docs/cms#accessing-the-cms-object) the CMS.

### The Steps

1. Import the `useCMS` hook.
2. In the `EditButton` component: toggle the `cms` state on click and render different button text depending on the enabled state.

**src/App.js**

```diff
import React from 'react';
-import { TinaProvider, TinaCMS } from 'tinacms';
+import { TinaProvider, TinaCMS, useCMS } from 'tinacms';
import logo from './Icon.svg';
import './App.css';

//...

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
```

If you restart the dev server and click the 'Edit This Site' button, you should see an 'Edit Icon' in the lower right-hand corner. Click on the icon to open the [_Sidebar_](/docs/ui#toolbar-configuration).

> There is also a _Toolbar_ interface, we won't work with that UI in this tutorial but feel free to [read more](/docs/ui).

The example above uses a helpful method, `cms.toggle`, to switch between enabled/disabled states. Reference the documentation to see all of the [CMS methods](/docs/cms#reference) available.

You'll notice that the sidebar is empty, that is because there are no forms registered to edit the content — let's do that next.
