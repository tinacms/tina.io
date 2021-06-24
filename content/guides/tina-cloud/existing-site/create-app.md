---
title: Create an app in Tina Cloud
last_edited: '2021-05-10T10:00:00.000Z'
---

Now we need to set up a Tina Cloud account, and create an "app".

In Tina Cloud, Apps connect Tina Cloud with a GitHub repository.
An app is the connection point between your site and your users, allowing authorized users to login, and start making edits to your site's content.

## Sign up for Tina Cloud

[Register for Tina Cloud](https://auth.tina.io/register) and create your organization for free.

## Create an app

Once registered, you can log in to your organization and access your dashboard. Let's create an app.

After you authorize the Tina Cloud GitHub app, you should see your demo repository in the list of repositories. Click "Choose Repository".

## App configuration

On the last step, we need to enter some configuration for our app.
You can give your app whatever name you like. We will go with "Blog Starter"
We will be running this demo locally, so for Site URL, you can use:
`http://localhost:3000`

Click save, your app should now be created!

## Access app's client id

Click on the app from the app's list page, and you will see some new read-only fields: "Client ID" and "Organization ID". We'll use these values soon to reference this Tina Cloud app from our site.
