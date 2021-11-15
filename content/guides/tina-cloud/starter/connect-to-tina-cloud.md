---
title: Working with TinaCMS
last_edited: '2021-07-27T10:00:00.000Z'
---

Open your project locally and in the `env.development` file set:

- `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.

```
# env.development
NEXT_PUBLIC_USE_LOCAL_CLIENT=0
```

Restart your server and run `yarn dev` again.

In the `env.local` file set your client ID:

```
# env.local
NEXT_PUBLIC_TINA_CLIENT_ID=to the Client ID copied from an earlier step and found in your project's Overview section
```

> Tip: `.env.development` only runs when in Next.js development mode.

Make sure you're in edit mode by selecting the "Edit with Tina" button in the lower-left corner.

This time a modal asks you to authenticate through TinaCMS. Upon success, Tina will send your edits to the TinaCMS server, and subsequently to GitHub.

![](https://raw.githubusercontent.com/tinacms/tina-cloud-starter/main/public/uploads/tina-cloud-authorization.png)

## Edit content

Make some edits through the sidebar and click save.
Changes are saved in your GitHub repository.

> Hint: To exit edit mode, navigate to the `/exit-admin` route. If you are running on `localhost`, it is `http://localhost:3000/exit-admin`.

Now that Tina Cloud editing is working correctly, we can deploy the site so that other team members can make edits too.

![update-from-graphql-client](/img/update-from-graphql-client.jpg)

> ℹ️ Gotcha: since your changes are being synced directly to Github, you'll notice that when you're in non-"edit" mode your page still receives the unedited data from your local file system. This is mostly fine since editing with Tina Cloud is designed for hosted environments. But beware that changes to your schema may result in a mismatch between the Tina Cloud API and your local client.

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/)

Connect to your GitHub repository and set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<YOUR_CLIENT_ID>
```

Add the deployment URL to your project's Site Urls. To do this, go to your project's **Configuration** page.

🎉 Congratulations, your site is now live!

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, navigating to the `admin` route,
log in to TinaCMS, and start making some edits. Your changes should be saved to your GitHub repository.

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/)

Connect to your GitHub repository, click on **advanced** to set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
```

Set the **build command** to `yarn build`,
Set the **publish directory**. To `.next/` .

Once you're done, click "Deploy site".

Add the deployment URL to your project's Site Urls. To do this, go to your project's **Configuration** page.

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, navigate to the `admin` route,
log in to Tina, and making some edits. Your changes should be saved to your GitHub repository.

> ℹ️ Changes in edit mode show up on your home page after your site finishes a rebuild.

🎉 You now have a **completely customizable** site that can be fully edited with TinaCMS!

## Media Management _(Optional)_

Currently Tina Cloud only supports the <a href="https://github.com/tinacms/tinacms/tree/main/packages/next-tinacms-cloudinary" target="_blank">Cloudinary media store</a>. We've gone ahead and added it to your TinaCMS setup in `_app.js`, but you'll need to provide environment variables for it to work with your Cloudinary account

To do that, update your `.env.local` file with a couple of new environment variables that you can get from your [Cloudinary dashboard](https://cloudinary.com/console/).

```env
# These are used in conjunction with a Cloudinary account for media asset management
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Get this from your Cloudinary account>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Get this from your Cloudinary account>
CLOUDINARY_API_SECRET=<Get this from your Cloudinary account>
```

Now restart your development server to be able to access your Cloudinary media library in Tina 🤩.

<!-- Not sure why but when this comment is here the video autoplay works. When it is not here it does not work -->

<video autoplay muted loop>
  <source src="/img/tina-starter/Media_video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

<!--  -->

For more details check out the <a href="https://github.com/tinacms/tinacms/tree/main/packages/next-tinacms-cloudinary" target="_blank">package README to set up Cloudinary</a> in your own project.
