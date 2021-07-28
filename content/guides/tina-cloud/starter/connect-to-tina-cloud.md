---
title: Working with TinaCMS
last_edited: '2021-07-27T10:00:00.000Z'
---

Open your project locally and in the `env.local` file set:

- `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.
- `NEXT_PUBLIC_TINA_CLIENT_ID` to the Client ID copied from an earlier step and found in your app's Overview section.

Restart your server and run `yarn dev` again.

To edit the site, navigate to <a href="http://localhost:3000/admin" target="_blank">http://localhost:3000/admin</a>. This activates the edit mode.

![](https://raw.githubusercontent.com/tinacms/tina-cloud-starter/main/public/uploads/tina-cloud-authorization.png)

This time a modal asks you to authenticate through TinaCMS. Upon success, Tina will send your edits to the TinaCMS server, and subsequently to GitHub.

> To enter **edit mode**, navigate to the `admin` route of the site.

## Edit content

Make some edits through the sidebar and click save.
Changes are saved in your GitHub repository.

Now that Tina Cloud editing is working correctly, we can deploy the site so that other team members can make edits too.

![update-from-graphql-client](/img/update-from-graphql-client.jpg)

> ℹ️ Gotcha: since your changes are being synced directly to Github, you'll notice that when you're in non-"edit" mode your page still receives the unedited data from your local file system. This is mostly fine since editing with Tina Cloud is designed for hosted environments. But beware that changes to your schema may result in a mismatch between the Tina Cloud API and your local client.

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/)

Connect to your GitHub repository and set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
NEXT_PUBLIC_USE_LOCAL_CLIENT=0
```

Add the deployment URL to your app's Site Urls. To do this, go to your app's **Configuration** page.

🎉 Congratulations, your site is now live!

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, navigating to the `admin` route,
log in to TinaCMS, and start making some edits. Your changes should be saved to your GitHub repository.

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/)

Connect to your GitHub repository, click on **advanced** to set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
NEXT_PUBLIC_USE_LOCAL_CLIENT=0
```

Set the **build command** to `yarn build`,
Set the **publish directory**. To `.next/` .

Once you're done, click "Deploy site".

Add the deployment URL to your app's Site Urls. To do this, go to your app's **Configuration** page.

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, navigate to the `admin` route,
log in to Tina, and making some edits. Your changes should be saved to your GitHub repository.

> ℹ️ Changes in edit mode show up on your home page after your site finishes a rebuild.

🎉 You now have a **completely customizable** site that can be fully edited with TinaCMS!

## Adding media _(Optional)_

Currently Tina Cloud only supports the <a href="https://github.com/tinacms/tinacms/tree/main/packages/next-tinacms-cloudinary" target="_blank">cloudinary media store</a> which has already been implemented. To add it, first uncomment two lines in your `_app.js`

```diff
import "../styles.css";
import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });
-// import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";
+ import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            branch="main"
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
-            // mediaStore={TinaCloudCloudinaryMediaStore}
+             mediaStore={TinaCloudCloudinaryMediaStore}
            {...pageProps}
          >
...
```

Next update your `.env.local` file with a couple of new environment variables that you can get from your cloudinary dashboard.

```env
# These are used in conjunction with a Cloudinary account for media asset management
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Get this from your Cloudinary account>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Get this from your Cloudinary account>
CLOUDINARY_API_SECRET=<Get this from your Cloudinary account>
```

Now restart your dev server and you will be able to access your cloudinary media library 🤩.

![Media Demo](/img/tina-starter/Media_video.gif)

For more details check out the <a href="https://github.com/tinacms/tinacms/tree/main/packages/next-tinacms-cloudinary" target="_blank">package readme to set up cloudinary</a> in your own project.
