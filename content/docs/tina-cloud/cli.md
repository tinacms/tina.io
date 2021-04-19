---
title: Tina Cloud CLI
---

The _Tina Cloud CLI_ can be used to set up your project with Tina Cloud configuration, and run a local version of the Tina Cloud content-api (using your file system's content).

## Getting started

The CLI can be installed as a dev dependency in your project.

Npm:

```bash
npm install --save-dev tina-graphql-gateway-cli
```

Yarn:

```bash
yarn add --dev tina-graphql-gateway-cli
```

## Usage

Arguments wrapped in `<>` in the command name are required.
Arguments wrapped in `[]` in the command name are optional.

## Help

You can get help on any command with `-h` or `--help`.

e.g:

```bash
yarn tina-gql schema:gen-query --help
```

This will describe how to use the schema:gen-query command.

## Commands

### tina-gql server:start \[options\]

Start a GraphQL server using your Filesystem's content as the datasource. Your site will need to have a valid .tina configuration to define its schema.

#### Options

--port <port> Specify a port to run the server on. (default 4001)

### tina-gql schema:types \[options\]

Generate Typescript types based on your site's schema.

#### Options

--schema, -s Dump the graphql SDL

### tina-gql schema:audit \[options\]

Check for **.tina/front_matter/templates** folder for any issues.

#### Options

--path <tinaPath> Specify a relative path to the .tina folder (eg. my-site)

### tina-gql schema:dump \[options\]

Dump JSON schema into specified path

#### Options

--folder <folder> Dump the schema into the given path

## Development

To run this project locally in another directory, you can create a symlink by running

```bash
npm link
```

Then `tina-gql` can be run in another directory by running:

```bash
tina-gql <commands>
```

_Alternatively, the CLI can be added to a project instead of being used globally._

To run the command locally in this project directory, you can run:

```bash
yarn tina-gql <commands>
```
