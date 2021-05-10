---
title: Create App in Tina Cloud
last_edited: '2021-05-10T10:00:00.000Z'
---

In this step, we will be setting up a Tina Cloud account, and creating an "app".

In Tina Cloud, Apps connect Tina Cloud with a GitHub repository.
An app is the connection point between your site and your users, allowing authorized users to login, and start making edits to your site's content.

## Sign up for Tina Cloud

You can register for Tina Cloud by creating a free organizatiion [here](https://auth.tina.io/register).

## Create an app

Once registered, you can log-in and see the dashboard. We will want to create an app.

After you authorize the Tina Cloud GitHub app, you should see your demo repository in the list of repositories. Click "Choose Reposiitory".

## App configuration

On the last step, we will enter some configuration for our app.
You can give your app whatever name you like. We will go with "Blog Starter"
We will be running this demo locally, so for Site URL, you can use:
`http://localhost:3000`

Click save, and your app should be created!

## Access app's client id

Click on the app from the app's list page, and you will see some new readonly fields: "Client ID" and "Organization ID". We'll use these values soon to reference this Tina Cloud app from our site.
