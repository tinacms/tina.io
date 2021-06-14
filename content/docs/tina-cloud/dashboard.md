---
title: Tina Cloud Dashboard
---

The **Tina Cloud Dashboard** is the interface for managing the administrative aspects of content management. The dashboard allows you to create **organizations**, **apps**, and **users**.

> Unlike most other Headless CMS providers, the Tina Cloud dashboard is not used for editing content. Content is edited directly on your website via a TinaCMS integration.

## Apps

**Apps** connect Tina Cloud with a GitHub repository. An app is the **connection point between your site and your users**, allowing authorized users to access and modify a site's content.

### Connecting a GitHub repository

To set up an app within the Tina Cloud dashboard, you must first authenticate with GitHub. A modal window asks you to give Tina.io access to your repositories. If you are not already logged in, your provider will prompt you for login credentials first. This authentication allows Tina Cloud to pull and push content to and from your GitHub repository.

The next step is to choose the repository that houses your site's content. If you don't see your repository within the list of repositories on the dashboard, you may have to re-configure your Tina.io permissions within GitHub.

### App configuration

On the last step of app creation, we ask you to enter a bit of configuration.

#### App Name

This name is shown to your users when they login to the app.

#### Site URL

This field is used for security purposes so that users can only log in through your site.

If you are developing locally, this value might be something like:

`http://localhost:3000`.

If Tina Cloud is configured on your production site, this value might be something like:

`https://<YOUR-SITE-NAME.com>`

**Only the URL origin is needed, so there is no need to include the path to any specific pages.**

> _Tip:_ If you are using Tina Cloud for both development and production, you can create two separate Tina Cloud apps, each with a unique **Site URL**.
> Otherwise, you will have to make sure that you switch the **Site URL** from `http://localhost:3000` to `https://<YOUR-SITE-NAME.com>` as you switch to production.

## Using your app

Once your app is created, you can use its Client ID within your site's Tina implementation. This allows your users to log in to Tina Cloud from within your site, and start editing content. [Learn more about the Tina Cloud client setup](/docs/tina-cloud/client/).

## Organizations

An organization connects users (developers, editors, content creators, etc.) and apps through the Tina Cloud dashboard.

In order to use the Tina Cloud dashboard, you must first register an organization. To do so, navigate to the [Tina.io Registration Page](https://auth.tinajs.dev/register). Enter your organization name and your personal login credentials. Once your account is verified, you're able to access the dashboard.

From an organization level, you can add, edit and delete both apps and users.

> When creating an organization, take note of your `organization-id` as this is required when implementing your site(s).
