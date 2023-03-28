---
title: Common Errors when Migrating
id: '/docs/forestry/common-errors/'
prev: '/docs/forestry/migrate'
next: '/docs/forestry/accessing-cms'
---

Here is a list of the the common things that someone may run into when migrating from Forestry to TinaCMS.

## Migrating fields with non alphanumeric characters

In TinaCMS all fields can only contain alphanumeric characters or underscores. While in forestry you could have fields with non alphanumeric characters, such as `my-field-name` or `my field name`.

TinaCMS provides a `nameOverride` property, that allows you to specify how a field with special characters gets output.

E.g:

```js
// collection fields
{
  name: `my_field_name`,
  nameOverride: `my-field-name`
}
```

> The Forestry migration tool (`npx @tinacms/cli init`) should automatically apply nameOverride when importing your templates.

## Migrating Blocks

### \_template vs template

The concept of using [blocks as field types in forestry](https://forestry.io/docs/settings/fields/blocks/) is supported in TinaCMS as [providing templates in an object field](/docs/editing/blocks/). During the migration, the migration tool will convert your blocks into templates in the Tina schema but it will not update your content.

In TinaCMS, instead of the `template` key we use `_template` to avoid name collisions. You will have to update this in your content. As well, it is common for front matter templates to have `-` in the name and since TinaCMS does not support `-` in the name you will have to update the name of the template to use `_` instead.

For example if you had a front matter template that looked like this.

```yaml
---
label: landing-page
fields:
  - type: blocks
    name: sections
    label: Sections
    template_types:
      - template-name
      - feature
      - hero
```

And content that looked like this

```yaml
sections:
  - template: template-name
  #   ...
  - template: feature
  #   ...
```

You would have to update your content to be

```yaml
- _template: call_to_action
#   ...
- _template: feature
#   ...
```

> NOTE: when you update your content you should restart your dev server to see the change in the admin

Since you have updated your content you will have to update all uses of `template` in your rendering code to be `_template` and update `template-name` to be `template_name`.

### templates with common field names of different types

If you have multiple block templates that share a common field name, but the types differ (E.g, multiple templates with a `heading` field, where one is required and the other is not), then you may run into [this GraphQL error](/docs/forestry/common-errors/#graphql-error).

## Common error message and how to fix them

### GraphQL error

```
Error: GraphQL Document Validation failed with 11 errors;
  Error 0: Fields "<FieldName>" conflict because they return conflicting types "String!" and "String". Use different aliases on the fields to fetch both if this was intentional.
```

This error is because two fiends in your schema have the same name with different types and when querying for both GraphQL throws an error. This error occurs when generating the GraphQL client so if you are not using our data fetching you can mitigate this error by passing the `--noSDK` option to both `tinacms dev` and `tinacms build`.

You can [read more about this issue here](https://github.com/tinacms/tinacms/issues/3150#issuecomment-1239796350)

### Error when getting content in the admin

```
[Error] GetCollection failed: Unable to fetch, errors: Error querying file <File> from collection pages. Please run "tinacms audit" or add the --verbose option for more info
```

![](https://res.cloudinary.com/forestry-demo/image/upload/v1673619483/tina-io/docs/forestry-migration/Screen-Shot-Error-Messager.png)

This can happen for many reasons. Some common reasons are because the data you are trying to fetch is

- not in the correct format
- missing a required field
- is missing the `_template` key.
  If you look at the error message in the terminal you should see the exact error that is causing the issue.

For example, if you are missing `_template` you will see an error like this

```
Error: Unable to determine template for item at hugo/content/about.md, no template name provided for collection with multiple templates
    at TinaSchema.getCollectionAndTemplateByFullPath (/Users/logananderson-forestry-mac/dev/forestry.io/forestry.io/node_modules/@tinacms/schema-tools/dist/index.js:224:19)
```

This can be fixed by adding the `_template` key to the front matter of the file.

```md
---
# ...
_template: my_template
---
```

..where "my_template" is the name of the template in the collection to which the file belongs.

## Error `YAMLException: duplicated mapping key`

This happens when you have two keys in the frontmatter of your markdown files that are the same. In forestry, this was allowed but in TinaCMS it is not. You will have to remove one of the keys.

For example, if you have a file that looks like this

```md
---
date: 2021-01-01
date: 2021-01-02
---
```

It will have to be changed to

```md
---
date: 2021-01-02
---
```

## Info: Match ${match} was transformed to ${newMatch}

The match property works a bit differently in TinaCMS than it does in Forestry. In Forestry, the match property is a glob pattern that includes the file extension. In TinaCMS, the match property is a glob pattern that does not include the file extension.

In TinaCMS the match property is set for each collection and is nested.

```js
{
  label: 'Pages',
  name: 'pages',
  match: {
    include: "{foo,ba}/**/*"
  }
  //..
}
```

Check out the [match property docs](/docs/collections/#match) for more info.

Since this migration tool is converting from Forestry to TinaCMS, it will automatically convert the match property to the TinaCMS format. It is a good idea to double check that is matching correctly.
