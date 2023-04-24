---
title: Connecting the site
next: /docs/tina-cloud/faq
---

Once you've created a project in **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To have editing work in production, in the `tina/config.<ts|js>` file, configure the `clientId` to point to your Tina Cloud project, and add your generated `token`.

```tsx
// tina/config.ts
//...
export default defineConfig({
  //...
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ]}
})
```

<div class="short-code-warning">
  <div>
    <p>Note ⚠️ If you're loading your schema config values from a local environment file, note that Tina's build process will only pickup `.env` files, (not `.env.local` or `.env.development` files)</p>
  </div>

  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z" />
  </svg>
</div>

## Configuring the branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```diff
// tina/config.ts
//...
+ const branch =
+  process.env.NEXT_PUBLIC_TINA_BRANCH ||
+  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
+  process.env.HEAD ||
+  ''
export default defineConfig({
  //...
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ]}
})
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit.
> `HEAD` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata).

Your fully configured `tina/config.{js,ts}` should look something like this:

```ts
import {  defineConfig } from 'tinacms'

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD

export default defineConfig({
  token: '<Your Read Only Token>' // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    // ...
  },
})
```

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.

## Deploying your site (with the TinaCMS admin)

The next step is to update your deployment configuration, so the TinaCMS admin gets built alongside your site. This allows your editors to enter the CMS through `<your-site>/admin` (or `your-site/admin/index.html`).

Here are some popular deployment options:

### Option: Netlify

#### Build Configuration

In Netlify, your build configuration can be updated at **Settings** > **Build & Deploy** > **Build Command**.

![Netlify build config](http://res.cloudinary.com/forestry-demo/image/upload/v1674607585/Screen_Shot_2023-01-24_at_8.45.23_PM_gbqyqb.png 'Netlify build config')

> If your package.json has a "build" script like `tinacms build && <your-site-build-cmd>`, this likely doesn't need to be changed. If your Netlify config is not running a custom build script (e.g `next build`), you would have to change this to `tinacms build && next build`

> If your project has a `netlify.toml` with a build command set, that will take precendence over the above build command UI

#### Environment variables

Assuming that your Tina `clientID` and `token` are setup as environment variables, you will need to add those to the Netlify UI for your project. You can learn more about environment variables [here](https://docs.netlify.com/environment-variables/overview/?_ga=2.128850127.213489666.1674607241-1149277376.1674150726 'netlify environment variables')

### Option: Vercel

#### Build Configuration

In Vercel, your build configuration can be updated at **Settings** > **General** > **Build & Development Settings**.

![Vercel Build Settings](https://res.cloudinary.com/forestry-demo/image/upload/v1674653527/tina-io/docs/tina-cloud/vercel-build-settings_vubza8.png 'Vercel Build Settings')

> If your package.json has a "build" script like `tinacms build && <your-site-build-cmd>`, this likely doesn't need to be changed. If your Vercel config is not running a custom build script (e.g `next build` instead of `npm run build`), you would have to change this to `tinacms build && next build`

#### Environment variables

Assuming that your Tina `clientID` and `token` are setup as environment variables, you will need to add those to the Vercel "Environment Variables" tab for your project.

### Option: GitHub Pages

GitHub Pages is a popular hosting option for static sites. GitHub Pages can be configured in **<your-repo>** > **Settings** > **Pages**.

#### Build Configuration

GitHub Pages offers a few build options:

- GitHub Actions
- Deploy from a branch

![GitHub Actions](https://res.cloudinary.com/forestry-demo/image/upload/v1674654344/tina-io/docs/tina-cloud/Screen_Shot_2023-01-25_at_9.40.52_AM_fby9q2.png 'GitHub Actions')

We want to choose "**GitHub Actions**" so that we can control the build script, and make sure it's also building the TinaCMS admin

By clicking "Configure" on the action it's created for us, we can then tweak the build script to build tinacms along with our site.

Add the following step **before** your site's build step:

If you are using npm as your package name, you can use the following:

```yml
- name: Build TinaCMS
  env:
    TINA_PUBLIC_CLIENT_ID: ${{ secrets.TINA_PUBLIC_CLIENT_ID }}
    TINA_TOKEN: ${{ secrets.TINA_TOKEN }}
  run: npx tinacms build
```

or if you are using yarn:

```yml
- name: Build TinaCMS
  env:
    TINA_PUBLIC_CLIENT_ID: ${{ secrets.TINA_PUBLIC_CLIENT_ID }}
    TINA_TOKEN: ${{ secrets.TINA_TOKEN }}
  run: yarn tinacms build
```

Your GitHub Action will look something like:

![Github Action](https://res.cloudinary.com/forestry-demo/image/upload/v1675783496/tina-io/docs/tina-cloud/gh-config.png 'Github Action')

#### Common error: Tina is not showing up at /admin

This can happen for a number of reasons but here is the most common reasons and fixes.

##### 1. The .gitignore added by tina is blocking upload

We add a .gitignore to the admin folder so that the admin folder does not get committed to your repo. Depending on how you are using Github Pages you may need to run `rm <YourPublicFolder>/admin/.gitignore` to remove the .gitignore file.

##### 2. The build command is not running the build script

Check to make sure that the build command is running and not failing

##### 3. Error: "npm ERR! could not determine executable to run" or "command `tinacms` is not found"

This is because the `@tinacms/cli` package is not installed. Make sure you are installing javascript dependencies before running the build command. If you are using npm make sure that `npm ci` is being run before the TinaCMS build command. If you are using yarn, make sure you are running `yarn install --frozen-lockfile` before running the build command.

> Note: If you are using [the github pages setup from hugo](https://gohugo.io/hosting-and-deployment/hosting-on-github/) you will need to make sure that a `package-lock.json` exists in the root of your repo.

#### Environment variables

Assuming that your Tina `clientID` and `token` are setup as environment variables, you will need to add those to the GitHub Secrets for your project. The secrets we used in the code snippet above were `TINA_PUBLIC_CLIENT_ID` & `TINA_TOKEN`
