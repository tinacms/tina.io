---
title: Advanced Usage Example
---
The purpose of this walkthrough is to demonstrate how to create and use a more complicated `schema` (which utilizes simple and complex `object` fields), write a `getDocument` GraphQL query, and utilize the query's result in rendering.
​
## Schema
​
The schema defines a `recipe` collection which consists of some standard fields (`name`, `photo`, `description`) and more advanced fields (`meta`, `sections`).
​
```ts, copy
// .tina/schema.ts
import { defineSchema } from "@tinacms/cli";
​
export default defineSchema({
  collections: [
    {
      name: "recipe",
      label: "Recipes",
      path: "content/recipes",
      fields: [
        {
          name: "datePublished",
          label: "Published On",
          type: "datetime",
          ui: {
            dateFormat: "MMM D, YYYY",
          },
        },
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "image",
          name: "photo",
          label: "Photo",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
        {
          type: "object",
          name: "meta",
          label: "Meta",
          fields: [
            {
              name: "prep",
              label: "Prep Time (in minutes)",
              type: "string",
            },
            {
              name: "cook",
              label: "Cook Time (in minutes)",
              type: "string",
            },
            {
              name: "servings",
              label: "Servings",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          name: "sections",
          label: "Sections",
          list: true,
          templates: [
            {
              name: "ingredients",
              label: "Ingredients",
              fields: [
                {
                  name: "items",
                  label: "Items",
                  type: "string",
                  list: true,
                },
                {
                  name: "details",
                  label: "Details",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              name: "directions",
              label: "Directions",
              fields: [
                {
                  name: "steps",
                  label: "Steps",
                  type: "string",
                  list: true,
                },
                {
                  name: "details",
                  label: "Details",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
            {
              name: "nutrition",
              label: "Nutrition",
              fields: [
                {
                  name: "details",
                  label: "Details",
                  type: "string",
                  ui: {
                    component: "textarea",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
```
​
## Query
​
To retrieve a single `recipe`, you would use a query like this one.
​
Notice that, for `sections`, we are using `__typename` to deobfuscate the available `templates`. While `__typename` can be omitted in the query, keeping it allows for comparisons later where you might want to use a different render for each `template` type.
​
Because `meta` does not have any `templates`, you do not need to deobfuscate and can access its properties directly.
​
```ts, copy
// pages/recipe/[filename].tsx
import { getStaticPropsForTina, gql } from "tinacms";
​
export const getStaticProps = async ({ params }) => {
  const recipe = await getStaticPropsForTina({
    query: gql`
      query GetRecipeDocument($relativePath: String!) {
        getRecipeDocument(relativePath: $relativePath) {
          data {
            datePublished
            name
            photo
            description
            meta {
              prep
              cook
              servings
            }
            sections {
              __typename
              ... on RecipeSectionsIngredients {
                items
                details
              }
              ... on RecipeSectionsDirections {
                steps
                details
              }
              ... on RecipeSectionsNutrition {
                details
              }
            }
          }
        }
      }
    `,
    variables: { relativePath: `${params.filename}.md` },
  });
​
  return {
    props: {
      ...recipe,
    },
  };
};
```
​
This query will return an `Object` in the shape of:
​
```ts, copy
{
  "data": {
    "getRecipeDocument": {
      "data": {
        "datePublished": string,
        "name": string,
        "photo": string,
        "description": string,
        "meta": {
          "prep": string,
          "cook": string,
          "servings": string,
        },
        "sections": [
          {
            "__typename": "RecipeSectionsIngredients",
            "items": [string],
            "details": string,
          },
          {
            "__typename": "RecipeSectionsDirections",
            "steps": [string],
            "details": string,
          },
          {
            "__typename": "RecipeSectionsNutrition",
            "details": string,
          }
        ]
      }
    }
  }
}
```
​
## Rendering
​
The important step here is correctly retrieve the queried `data` out of `props`. The common pattern is `data: { query: { data: document }}`.
​
Notice that `sections` is iterated via `map()` utilizing the `__typename` to determine how each `section` should be rendered. You could also use `_template`.
​
```tsx, copy
// pages/recipe/[filename].tsx
const RecipePage = (props) => {
  const {
    data: {
      getRecipeDocument: { data: recipe },
    },
  } = props;
  const { datePublished, name, photo, description, meta, sections } = recipe;
​
  /**
   * Because all `datetime` fields returned by GraphQL are in UTC, we
   * need to convert them to local `datetime` using `toLocaleDateString()`.
   * This returns the date as `Jan 1, 2021`, for example.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
   */
  let localDatePublished;
  if (datePublished) {
    localDatePublished = new Date(datePublished).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
​
  return (
    <div className="recipe-page">
      {photo ? <img src={photo} alt="photo" />}
      <h1>{name}</h1>
      {localDatePublished ? <h2>{datePublished}</h2>}
      <p>{description}</p>
      {meta && Object.keys(meta).length > 0 && (
        <dl>
          {meta.prep && (
            <>
              <dt>Prep Time</dt>
              <dd>{meta.prep} minutes</dd>
            </>
          )}
          {meta.cook && (
            <>
              <dt>Cook Time</dt>
              <dd>{meta.cook} minutes</dd>
            </>
          )}
          {meta.servings && (
            <>
              <dt>Servings</dt>
              <dd>{meta.servings}</dd>
            </>
          )}
        </dl>
      )}
      {sections && sections.map((section) => {
        if (section.__typename === "RecipeSectionsIngredients") {
          return (
            <RecipeIngredients key={`${name}.${section.__typename}`} {...section} />
          )
        }
        if (section.__typename === "RecipeSectionsDirections") {
          return (
            <RecipeDirections key={`${name}.${section.__typename}`} {...section} />
          )
        }
        if (section.__typename === "RecipeSectionsNutrition") {
          return (
            <RecipeNutrition key={`${name}.${section.__typename}`} {...section} />
          )
        }
      })}
    </div>
  )
```