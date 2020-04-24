---
title: Set up the GitHub OAuth App
---

Now we need to set up an OAuth App in Github to allow for authorization. In GitHub, within your Account Settings, click <a href="https://github.com/settings/developers" target="_blank">OAuth Apps</a> under Developer Settings. Go ahead and create a "New OAuth App".

Since you are **testing your app locally**, you'll create a _development_ GitHub app that redirects to localhost. Eventually you'll need to create separate OAuth Apps: one for development and a production app whose URLs will connect to the 'live' domain. We'll circle back to the production app once when we cover hosting.

For now, fill in http://localhost:3000 for the _Homepage Url_. With the **Authorization callback URL**, enter the url for the "/github/authorizing" page that you created above (e.g http://localhost:3000/github/authorizing).

![oauth-app-config-example](/img/github-open-auth-cna/oAuth-app-config.png)

After creating the app, you should see a page with information such as **Client ID** and **Client Secret**. Next, we'll add those as environment variables to the project to connect this App to the Tina-GitHub helpers.

### Setting Environment Variables

[Environment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) are sensitive values specific to your project. The Tina-GitHub helpers will use these values to talk to your repository, enabling auth and data fetching via GitHub.

To set these variables, create a `.env` file in your project root. Add the _secret_ and _id_ values from the OAuth App, and fill in the repo name. _Do not commit this file_; you may need to add `.env` to the `.gitignore` file.

**.env**

```
# Taken from GitHub
GITHUB_CLIENT_ID=

# Taken from Github
GITHUB_CLIENT_SECRET=

# This is your github repository's owner / repo-name.
REPO_FULL_NAME=tinacms/tinacms.org
```

You can use the `dotenv` package to load the `.env` file:

```bash
yarn add dotenv
```

Now, to load these `.env` values in the front-end, create a file called [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) in the root of your project. Add the code from this example:

**next.config.js**

```js
require('dotenv').config()

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  // ...
}
```

> Note that we did not add `GITHUB_CLIENT_SECRET` to the config exports. This is the a secret key that should only be used from the server and should not be accessible through the browser.

After restarting the dev server **you should be able to authenticate with GitHub**! Click the 'Edit This Site' button again and try to authenticate. If auth is successful, you should see another modal prompting you to create a fork, go ahead and do so.

![github-create-fork-step](/img/github-open-auth-cna/create-fork-step.png)

Since you're the owner of this repository, your edits will go to the `master` branch. If you weren't the owner of this repository, a fork (also known as a _Working Repository_) would be made where someone else could commit edits and create a PR for review.

After you've authenticated and the _Working Repository_ is established, your `create-next-app` should look something like the image below:

![after-auth-and-fork-success](/img/github-open-auth-cna/after-auth-fork.png)
