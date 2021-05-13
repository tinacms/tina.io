---
title: Connect to Tina Cloud
last_edited: '2021-05-10T10:00:00.000Z'
---

## Connect to Tina Cloud

While the fully local development workflow is the recommended way for developers to work,
you'll likely want other editors and collaborators to be able to make changes on a hosted website with authentication.

> ℹ️ Changes in edit mode show up on your home page after your site finishes a rebuild.

## Register your local application with Tina Cloud

1. Visit [auth.tina.io](https://auth.tina.io/register), create an organization, and sign in. Make a note of your organization name.
2. Create a Tina Cloud app that connects to the GitHub repository you've just forked. Once your app is created, click on the app to get to the app settings and copy the client ID.

## Connect your local project with Tina Cloud

In the `env.local` file set:

- `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.
- `NEXT_PUBLIC_ORGANIZATION_NAME` to your Tina Cloud organization name
- `NEXT_PUBLIC_TINA_CLIENT_ID` to the Client ID displayed in your Tina Cloud App.

Restart your server and run `yarn dev` again.

Open [`http://localhost:3000/`](http://localhost:3000/`) and click "enter edit mode"

![](https://raw.githubusercontent.com/tinacms/tina-cloud-starter/main/public/uploads/tina-cloud-authorization.png)

This time a modal asks you to authenticate through Tina Cloud. Upon success, Tina will send your edits to the cloud server, and subsequently to GitHub.

#### Edit content

Make some edits through the sidebar and click save.
Changes are saved in your GitHub repository.

Now that Tina Cloud editing is working correctly, we can deploy the site so that other team members can make edits too.

> ℹ️ Gotcha: since your changes are being synced directly to Github, you'll notice that when you're in non-"edit" mode your page still receives the unedited data from your local file system. This is mostly fine since editing with Tina Cloud is designed for hosted environments. But beware that changes to your schema may result in a mismatch between the Tina Cloud API and your local client.

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/)

Connect to your GitHub repository and set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_ORGANIZATION_NAME= <YOUR_ORGANIZATION>
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
```

![](https://raw.githubusercontent.com/tinacms/tina-cloud-starter/main/public/uploads/vercel-congratulations.png)

🎉 Congratulations, your site is now live!

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, click "edit this site",
log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/)

Connect to your GitHub repository, click on **advanced** to set the same environment variables as the ones in your `env.local` file:

```
NEXT_PUBLIC_ORGANIZATION_NAME= <YOUR_ORGANIZATION>
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
```

Set the **build command** to `yarn build`,
Set the **publish directory**. To `.next/` .

Once you're done, click "Deploy site".

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, click "edit this site",
log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.
