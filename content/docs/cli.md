---
title: TinaCMS CLI
last_edited: '2021-08-02T20:17:22.444Z'
---
The TinaCMS CLI has many uses, it's main usage is to start the local graphql server for serving static content, compiling the schema, and providing an **init** command that allows one to get up and running with Tina quickly.

You can run commands without having the CLI installed by using `npx @tinacms/cli commandName`. If you wish, you can also [install the CLI](/docs/cli-overview/#installation) and run commands with `yarn run tinacms commandName`.

## Init Command

> **Hint:** If you don't have a next.js site on hand you can first bootstrap one with
>
> ```bash,copy
> npx create-next-app --example with-typescript demo-project
> ```

In an **existing** Next.js project you can run

```bash,copy
npx @tinacms/cli init
```

This will,

1. Install of the dependencies you need
2. Setup a basic content model in your [`schema.ts` file](/docs/schema/)
3. Drop in a ready to go `_app.js` file
4. Add an editable page at http://localhost:3000/demo/blog/helloWorld

## Starting the server

Once the CLI [is installed](/docs/cli-overview/#installation), you can start the CLI with

```bash,copy
yarn tinacms sever:start
```

This will compile the schema into a static files, generates typescript types for you to use in your project and starts a graphQL server on http://localhost:4001

This command also takes a argument (`-c`) that allows you to run a command as a child process. This is very helpful for running a dev server and building your next.js app. The scripts portion of your package.json should look like this.

```json,copy
"scripts": {
  "tina-dev": "yarn tinacms server:start -c \"next dev\"",
  "tina-build": "yarn tinacms server:start -c \"next build\"",
  "tina-start": "yarn tinacms server:start -c \"next start\"",
  ...
},
```

## Compiling and Generating Types

Sometimes you might want to only compile your schema.ts into a static files for the server to use. This can be done with

```bash,copy
yarn tinacms schema:compile
```

You also might only want to generate the types. We have a command for that.

```bash,copy
yarn tinacms schema:types
```

This will look at your graphql schema an and generate typescript types based on that. The output is in `.tina/__generated__/types.ts`