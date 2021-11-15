---
title: TinaCMS backend and Deployment
last_edited: '2021-07-19T15:36:36.046Z'
---

## Connect to TinaCMS Backend

While the fully local development workflow is the recommended way for developers to work, you'll likely want other editors and collaborators to be able to make changes on a hosted website with authentication.

> ℹ️ Changes in edit mode show up on your home page after your site finishes a rebuild.

## Register your local application with Tina Cloud

1. Visit [app.tina.io](https://app.tina.io/register), to sign in.
2. Commit the project to your GitHub account.
3. Create a Tina Cloud project that connects to the GitHub repository you've just commited. For now, set `http://localhost:3000` as your callback URL. Once your project is created, click on the project to get to the project settings and copy the client ID. For more details on how to work with the Tina Cloud dashboard head over to the [dashboard documentation](/docs/tina-cloud/dashboard/).

## Connect your local project with TinaCMS Backend

Create an `env.local` file in the root of your project set:

- `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.
- `NEXT_PUBLIC_TINA_CLIENT_ID` to the Client ID displayed in your Tina Cloud Project.

Restart your server and run `yarn tina-dev` again.

Open [`http://localhost:3000/`](http://localhost:3000/) and click "Edit with Tina"

#### Edit content

Make some edits through the sidebar and click save. Changes are saved in your GitHub repository.

Now that Tina Cloud editing is working correctly, we can deploy the site so that other team members can make edits too.

> ℹ️ Gotcha: since your changes are being synced directly to Github, you'll notice that when you're in non-"edit" mode your page still receives the unedited data from your local file system. This is mostly fine since editing with Tina Cloud is designed for hosted environments. But beware that changes to your schema may result in a mismatch between the Tina Cloud API and your local client.

## Deploy

### Vercel

Connect to your GitHub repository and set the same environment variables as the ones in your `env.local` file:

```other
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
NEXT_PUBLIC_USE_LOCAL_CLIENT= 0
```

Set the Build Command to `yarn tina-build` this will build the site by launching the graphQL server to create all the files.

#### Update Tina Cloud

Select Configuration on your application in the Tina Cloud dashboard, and update the `Site URL(s)` section to contain your newly deployed Vercel URL. This will allow you to edit in the deployed version.

You can test that everything is configured correctly by navigating to your deployment URL, click "edit this site", log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.

🎉 Congratulations, your site is now live!

### Netlify

Connect to your GitHub repository, click on **advanced** to set the same environment variables as the ones in your `env.local` file:

```other
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
NEXT_PUBLIC_USE_LOCAL_CLIENT= 0
```

Set the **build command** to `yarn tina-build`, Set the **publish directory**. To `.next/` .

Once you're done, click "Deploy site".

#### Update Tina Cloud

Select Configuration on your application in the Tina Cloud dashboard, and update the `Site URL(s)` section to contain your newly deployed Netlfiy URL. This will allow you to edit in the deployed version.

You can test that everything is configured correctly by navigating to your deployment URL, click "edit this site", log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, click "edit this site", log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.
