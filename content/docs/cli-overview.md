---
title: The TinaCMS CLI
---

## Available Commands

```sh
> yarn run tinacms

Usage: @tinacms/cli command [options]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  server:start [options]    Start Filesystem Graphql Server
  schema:compile [options]  Compile schema into static files for the server
  schema:types [options]    Generate a GraphQL query for your site's schema,
                            (and optionally Typescript types)
  init [options]            Add TinaCMS to an existing project
  help [command]            display help for command
```

## Basic Usage:

### init

> The init command must be run inside of a Next.js project

```bash,copy
npx @tinacms/cli init
```

This will,

1. Install all of the dependencies you need
2. Setup a basic content model in your [`schema.ts` file](/docs/schema/)
3. Drop in a ready to go `_app.js` file
4. Add an editable page at http://localhost:3000/demo/blog/helloWorld

### `server:start`

> To run this command, you must have a valid `.tina/schema.ts` file.

`server:start` will compile the schema into static files, generates typescript types for you to use in your project and starts a graphQL server on http://localhost:4001

This command also takes an argument (`-c`) that allows you to run a command as a child process. For example:

```json,copy
"scripts": {
  "tina-dev": "yarn tinacms server:start -c \"next dev\"",
  "tina-build": "yarn tinacms server:start -c \"next build\"",
  "tina-start": "yarn tinacms server:start -c \"next start\"",
  ...
},
```

### `schema:compile`

`schema:compile` is used to compile and transpile the schema files into static file(s) ready to be used with the server. The compilation can be found in the `.tina/__generated__/config` directory.


### `schema:types` 

`schema:types` will generate a GraphQL query for your site's schema and typescript files. You will find the generated files in the `.tina/__generated__/` directory.