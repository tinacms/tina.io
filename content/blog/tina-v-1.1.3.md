---
title: 'TinaCMS V1.1.3'
date: '2023-01-11T22:00:00.000Z'
last_edited: '2023-01-11T22:00:00.000Z'
author: James O'Halloran
---

TinaCMS Version `1.1.3` (and `@tinacms/cli@1.0.6`) brings some improvements for various frameworks, and form list-fied improvements.

## Improved Shortcode Support

The user can now model a shortcode like so:

```
    name: "rimg",
    label: "rimg",
    match: {
      start: "{{<",
      end: ">}}",
    },
    fields: [
      {
        name: "myprop",
        label: "my prop",
        type: "string",
      },
    ],
```

outputs `<<% rimg myprop="" %>>`

Previously, this would match any content within `{{<` and `>}}`. Now, this will only match when the name of the shortcode also matches.

Editors will also be able to edit fields in the shortcodes indivudually, instead of through a global `text` field.

See [here](https://tina.io/docs/reference/types/rich-text/#custom-shortcode-syntax) for more info.

## Min/Max Support in list fields

The field UI object now accepts a min and max when the field is `list: true`. If the list/group list/block field is at the max or min value, the add or remove buttons are disabled. If the min and max values are the same, the field is considered 'fixed length' and the add/remove buttons are removed entirely, unless the data is invalid (you can still add items if there's not enough to satisfy the validation).

https://user-images.githubusercontent.com/5075484/211587949-a19681e1-f8c9-4f91-820a-f7f55eeb0e6d.mp4

## TOML & YML Support

### Customizable Frontmatter Format Updates

Collections can now specify `{ frontmatterFormat: 'toml' | 'yaml' | 'json' }` and `{frontmatterDelimiters: string | [string, string] }`.

This allows the user to have more conrtol of how their frontmatter is parsed.

### `yaml` and `toml` Document Formats

In a collection `format` can now be `yaml` or `toml`.

## Other Improvements & Fixes

- Errors on list field now show below field
- Error styles updated
- Minor form styling fixes
