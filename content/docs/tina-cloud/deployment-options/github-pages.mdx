---
id: '/docs/tina-cloud/deployment-options/github-pages'
title: Deploying to GitHub Pages
---

GitHub Pages is a popular hosting option for static sites. GitHub Pages can be configured in **<your-repo>** > **Settings** > **Pages**.

## Build Configuration

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
  run: yarn build
  # This assumes that your "build" script in your
  # package.json is "tinacms build"
```

Your GitHub Action will look something like:

![GitHub Action](https://res.cloudinary.com/forestry-demo/image/upload/v1675783496/tina-io/docs/tina-cloud/gh-config.png 'GitHub Action')

## Common Issues:

### Common Issue: 'Missing script: "tinacms"'

This error might occur from the following reasons:

#### 1. tinacms dependencies not added to package.json.

Make sure that both the `tinacms` & `@tinacms/cli` dependencies are listed in your package.json.

#### 2. Dependencies aren't being installed in CI.

If you are using npm make sure that `npm ci` is being run before the TinaCMS build command. If you are using yarn, make sure you are running `yarn install --frozen-lockfile` before running the build command.

#### 3. Needing to define a 'tinacms' script.

If your CI is running something like `yarn tinacms build` instead of `npx tinacms build`, you'll need to add a custom script to your package.json:

```json
  "scripts": {
    "tinacms": "tinacms",
    // ...
```

### Common Issue: /admin is giving a 404

This can happen for a number of reasons but here are the most common reasons and fixes:

#### 1. Not providing a custom build workflow

If your site is deploying with GitHub Pages, it may be using GitHub's default build steps. In this case, TinaCMS won't be included in the build.

![GitHub Pages configuration](https://res.cloudinary.com/forestry-demo/image/upload/v1683212636/gh-pages.png).

To fix this, you'll need to select the "GitHub Actions" source, and build the tinacms admin along with your site. You can see our doc above for help setting up this GitHub Action.

#### 2. 'tinacms build' is not running in CI

Check to make sure that the build command is running and not failing

> Note: If you are using [the github pages setup from hugo](https://gohugo.io/hosting-and-deployment/hosting-on-github/) you will need to make sure that a `package-lock.json` exists in the root of your repo.

## Environment variables

Assuming that your Tina `clientID` and `token` are setup as environment variables, you will need to add those to the GitHub Secrets for your project. The secrets we used in the code snippet above were `TINA_PUBLIC_CLIENT_ID` & `TINA_TOKEN`
