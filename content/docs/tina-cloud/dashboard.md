---
title: Tina Cloud Dashboard
---

The **Tina Cloud Dashboard** is the interface for managing the administrative aspects of content management. The dashboard allows you to create **organizations**, **apps**, and **users**.

> Unlike most other Headless CMS providers, the Tina Cloud dashboard is not used for editing content. Content is edited directly on your website via a TinaCMS integration.

## Apps

**Apps** connect Tina Cloud with a GitHub repository. An app is the **connection point between your site and your users**, allowing authorized users to access and modify a site's content.

To setup an app on the Tina Cloud dashboard, you must first authenticate with GitHub. A window will open asking you to give Tina.io access to your repositories. If you are not already logged in, your provider will prompt you for login credentials first. This authentication allows Tina Cloud to pull and push content to and from your GitHub respositiory.

The next step is to choose the repository that houses your site's content. If you don't see your repository within the list of repositories on the dashboard, you may have to re-configure your Tina.io permissions within GitHub. Finally, give the app a name, or keep the default. This name will be shown to your users when they login to the app.

Once this initial authorization is done, your users will be able to log in directly to an App from within your site without the need to authenticate with GitHub or use the Tina Cloud dashboard.

## Organizations

An organization connects users (developers, editors, content creators, etc.) and apps through the Tina Cloud dashboard.

In order to use the Tina Cloud dashboard, you must first register an organization. To do so, navigate to the [Tina.io Registration Page](https://auth.tinajs.dev/register). Enter your organization name and your personal login credentials. Once your account is verified, you're able to access the dashboard.

From an organization level, you can add, edit and delete both apps and users.

> When creating an organization, take note of your `organization-id` as this is required when implementing your site(s).
