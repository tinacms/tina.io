# Tina.io website

Source code for the [tina.io](https://tina.io) website.

## Development

```
corepack enable
cp .env.example .env
yarn install
yarn dev
```

### Testing Local TinaCMS Changes

If you have the **tinacms** repository cloned locally you can use it when running **tina.io**:

```
TINA=../path/to/tinacms yarn dev
```

You can also specify which packages you want to watch:

```
TINA=../path/to/tinacms TINA_WATCH=@tinacms/forms,react-tinacms-inline
```

> ### Warning
>
> This will only work for packages loaded by webpack. That means that environments which don't use
> webpack (i.e. SSR builds) will not use this alias.
