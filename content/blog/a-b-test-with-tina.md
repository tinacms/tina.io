---
title: Using Tina to power AB testing
date: '2022-05-26T07:00:00.000Z'
author: James Perkins
prev: content/blog/basics-of-graphql.md
---

A/B testing is an essential part of any site. It allows you to increase user engagement, reduce bounce rates, increase conversion rate and effectively create content. 

Tina opens the ability to easily power any site A/B testing, allowing marketing teams to test content without the need for the development team once it has been implemented. 

## Create A/B testing with Tina.

We are going to break this tutorial into three sections:

1. Update the Tina schema to create a way to add new tests.
2. Create a method to decide how a user will see a variant.
3. Use Next.js Middleware to redirect the user to the correct variant

### Creating our Tina application

This blog post is going to use the Tina Cloud Starter. Use the `create-tina-app` command for that, when prompted select your package manager of choice, and then use Tailwind Starter:

```bash
# create our Tina application
 
npx create-tina-app@latest a-b-testing

✔ Which package manager would you like to use? › Yarn
✔ What starter code would you like to use? › Tailwind Starter
Downloading files from repo tinacms/tina-cloud-starter. This might take a moment.
Installing packages. This might take a couple of minutes.

## Move into the directory and make sure everything is updated.

cd a-b-testing

yarn upgrade
  
```

Now we have our application ready. Depending on your package manager, you can check the code and launch it using `yarn dev` or `npm run dev`. We need to update our code so are pages can be driven by A/B testing.

### Updating Tina Schema

We will have a collection that will allow our content teams to decide what page is going to be replaced. This is what the user will see: 

![A-B Test page one](https://res.cloudinary.com/forestry-demo/image/upload/v1653521516/blog-media/a-b-testing/a-b-test1.png)

The ID will allow the content team to identify the A/B test, and the Page field will be the page that the team wants to run the testing on. In this example, it would be the homepage. 

Then all the variants a user wants to run will be a list of different variants. For example, we have test `b` that will show a user page named `home-b.` 

![A-B Test page two](https://res.cloudinary.com/forestry-demo/image/upload/v1653521516/blog-media/a-b-testing/a-b-test2.png)

Open up your `schema.ts` and underneath the `Pages` collection, create a new collection with a `label` of `AB Test` and `abtest`. So far, your collection should look like this:

```jsx
{
      label: "AB Test",
      name: "abtest",
}
```

Then we need to set the path for the A/B test content. We can set that to `content/ab-tests` and set the format to JSON. 

```jsx
{
      label: "AB Test",
      name: "abtest",
      path: "content/ab-tests",
      format: "json",
}
```

We now need to add are fields we want our content team to be able to edit, so that would be the ID, the page to run the test against, and the variants we want to run. We also want to be able to run tests on any number of pages so that we will be using a list of objects. 


> If you want to learn more about all the different field types and how to use them, check them out in our [Content Modeling documentation.](https://tina.io/docs/schema/)


```json
fields: [
        {
          type: "object",
          label: "tests",
          name: "tests",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.testId };
            },
          },
          fields: [
            { type: "string", label: "Id", name: "testId" },
            {
              type: "string",
              label: "Page",
              name: "href",
              description:
                "This is the root page that will be conditionally swapped out",
            },
            {
              type: "object",
              name: "variants",
              label: "Variants",
              ui: {
                itemProps: (item) => {
                  return { label: item.testId };
                },
              },
              list: true,
              fields: [
                { type: "string", label: "Id", name: "testId" },
                {
                  type: "string",
                  label: "Page",
                  name: "href",
                  description:
                    "This is the variant page that will be conditionally used instead of the original",
                },
              ],
            },
          ],
        },
      ],
```


> You may notice the `ui` prop. We are using this to give a more descriptive label to the lists. Otherwise, each one would be `AB Test Item` you can read about this in our [extending Tina documentation.](https://tina.io/docs/extending-tina/customize-list-ui/)


Now we have a schema we can use, go ahead and launch the server using `yarn dev` and navigate to `[https://localhost:3000/admin](https://localhost:3000/admin)` and create a test. 

The test you want to create for this demo is: 

1. Create a new file called `index`
2. Create a test id home
3. Page to replace will be `/`
4. Create a variant id of b, and the page will be `/home-b`

Below is an example of the process of creating a new test. 

<Youtube embedSrc={"https://res.cloudinary.com/forestry-demo/video/upload/v1653521516/blog-media/a-b-testing/a-b-testing-video.mp4"} />

### Adding the `home-b` page.

We need to add a home-b page to our application described in our a/b testing variant. To do that, click pages on the left-hand side of the admin. Next, select the `Create New` button and give the filename `home-b` and add content to the page. 

We are now ready to create the code that will power our variant decisions. 

## Variant Code

The variant code is made of two parts:

1. a “random” value that maps to an array element
2. Returning the `ABTestResult`

So at the root of the project, let us create a folder structure of `utils` and then the folder `ab-test` inside the folder create a file called `getBucket.ts`

This `getBucket` will return a number to reference the bucket for which the user lands. We need first randomly to generate the number. Then use that number and the number of buckets, which is passed in as an array, to decide what bucket they are in. 

For the random value, we are going to use `crypto` 
 

```json
function cryptoRandom() {
    return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
  }
```

For our `getBucket` function, we will pass the array of options and use the `cryptoRandom` function we just wrote to decide which bucket the user lands in. 

```json
export function getBucket(buckets: readonly string[]) {
    // Get a random number between 0 and 1
    let n = cryptoRandom() * 100
    // Get the percentage of each bucket
    let percentage = 100 / buckets.length
    // Loop through the buckets and see if the random number falls
    // within the range of the bucket
    return (
      buckets.find(() => {
        n -= percentage
        return n <= 0
      }) ?? buckets[0]
    )

  }
```

To go over the function above step by step:

1. We are passing in our array of options (buckets)
2. Get a number between 0 and 1. 
3. Get the percentage of each bucket (2 would be 50% each)
4. Loop through the bucket, see if the number falls within the range, and return the bucket. 

### Creating our `getABTestResult`

Now we have a way to get a bucket. We need to return the URL and the bucket the user is in for when we use Next.js Middleware to power our A/B testing.

First, we need to import the `getBucket` code we just wrote, the `index.json` that holds our A/B Tests, and the types from our Tina schema.

```javascript
import { getBucket } from './getBucket'
import abTestDB from '../../content/ab-tests/index.json'
import { AbtestTests } from '.tina/__generated__/types'
```

Our `getABTestResult` function is going to take two parameters *`matchingABTest` and `bucketCookie`.* The `bucketCookie` is optional as users may not have a cookie when they land on the page. 

```javascript
import { getBucket } from './getBucket'
import abTestDB from '../../content/ab-tests/index.json'
import { AbtestTests } from '.tina/__generated__/types'

export const getABTestResult = (
  matchingABTest: AbtestTests,
  bucketCookie?: string
) => {}
```

We now need to use our getBucket function, but only if the `bucketCookie` is not passed to the function. 

```javascript
import { getBucket } from './getBucket'
import abTestDB from '../../content/ab-tests/index.json'
import { AbtestTests } from '.tina/__generated__/types'

export const getABTestResult = (
  matchingABTest: AbtestTests,
  bucketCookie?: string
) => {
  const bucket =
    bucketCookie ||
    getBucket([
      matchingABTest.testId,
      ...matchingABTest.variants.map(t => t.testId),
    ])
}
```

We have most of the code now, we need to check if the `matchingABTest` exists in our database, and if it does, we should return the URL and bucket. Otherwise, it’s invalid or the default URL. 

```javascript
export const getABTestResult = (
  matchingABTest: AbtestTests,
  bucketCookie?: string
) => {
  const bucket =
    bucketCookie ||
    getBucket([
      matchingABTest.testId,
      ...matchingABTest.variants.map(t => t.testId),
    ])

  const matchingVariant = matchingABTest.variants.find(t => t.testId == bucket)
  if (matchingVariant) {
    return {
      url: matchingVariant.href,
      bucket,
    }
  } else {
    //invalid bucket, or we're matched with the default AB test
    return {
      url: matchingABTest.href,
      bucket: matchingABTest.testId,
    }
  }
}
```

The final piece to our functionality code is adding the ability to `getExperiment` based on the pathname. This is a simple function we will also use in the Middleware.

```javascript
export const getExperiment = (pathname: string) =>
  abTestDB.tests.find(test => test.href == pathname)
```

Our `index.ts` file is now complete, and we can move on to creating the Middleware that will issue the cookie and provide the correct path based upon the A/B test. Below is the complete `index.ts` file.

```javascript
import { getBucket } from './getBucket'
import abTestDB from '../../content/ab-tests/index.json'
import { AbtestTests } from '.tina/__generated__/types'

export const getABTestResult = (
  matchingABTest: AbtestTests,
  bucketCookie?: string
) => {
  const bucket =
    bucketCookie ||
    getBucket([
      matchingABTest.testId,
      ...matchingABTest.variants.map(t => t.testId),
    ])

  const matchingVariant = matchingABTest.variants.find(t => t.testId == bucket)
  if (matchingVariant) {
    return {
      url: matchingVariant.href,
      bucket,
    }
  } else {
    //invalid bucket, or we're matched with the default AB test
    return {
      url: matchingABTest.href,
      bucket: matchingABTest.testId,
    }
  }
}

export const getExperiment = (pathname: string) =>
  abTestDB.tests.find(test => test.href == pathname)
```

## Middleware

Next.js Middleware allows you to use code over configuration. We need to check if there is an experiment for the URL, return the correct URL for the user, and finally add a cookie if the user doesn’t have one. 

Create the `_middleware.ts` file in the `pages` folder, then we need to import `getExperiment` and `getABTestResult` and then the `NextResponse` and `NextRequest` from Next.js 

```javascript
import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from '../utils/ab-test'
```

A middleware functionality uses a `req` as a prop, so our function will look like this: 

```javascript
import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from '../utils/ab-test'

// Check for AB tests on a given page
export function middleware(req: NextRequest) {}
```

We can now use a built-in clone function to create a URL variable that we will use to check what we need to do for our visitors.

```javascript
import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from '../utils/ab-test'

// Check for AB tests on a given page
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
}
```

Next, we need to use our `getExperiment` code to retrieve the experiments for the URL, and if there isn’t an experiment, we can stop and return the original response.

```javascript
import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from '../utils/ab-test'

// Check for AB tests on a given page
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const matchingABTest = getExperiment(url.pathname)

  if (!matchingABTest) {
    return NextResponse.next()
  }
```

We now need to create a variable for our cookie name so that we can use the `testId` 

```javascript

  const COOKIE_NAME = `bucket-${matchingABTest.testId}`
```

Then we can use our abTestResult using the cookie (if available) and the `matchingABTest` variable. 

```javascript

  const COOKIE_NAME = `bucket-${matchingABTest.testId}`

  const abTestResult = getABTestResult(matchingABTest, req.cookies[COOKIE_NAME])
```

We can then set the `url.pathname` to the result of the `abTestResult` 

```javascript

  const abTestResult = getABTestResult(matchingABTest, req.cookies[COOKIE_NAME])
  url.pathname = abTestResult.url
```

Then, set the URL response using the `NextResponse.rewrite` function. 

```javascript

  const res = NextResponse.rewrite(url)
```

Finally, we want to add the cookie to the users' browser so they will be served the correct experiment if they return to the site and then return the response. Below is the final result.

```javascript
import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from '../utils/ab-test'

// Check for AB tests on a given page
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const matchingABTest = getExperiment(url.pathname)

  if (!matchingABTest) {
    return NextResponse.next()
  }

  const COOKIE_NAME = `bucket-${matchingABTest.testId}`

  const abTestResult = getABTestResult(matchingABTest, req.cookies[COOKIE_NAME])
  url.pathname = abTestResult.url
  const res = NextResponse.rewrite(url)

  // Add the bucket to cookies if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, abTestResult.bucket)
  }

  return res
}
```

The A/B experiment is now ready to use, and you can test it by running it locally. You have a 50% chance of landing on `home-b`, so you may need to delete your cookie each time. 

## How to keep up to date with Tina?

The best way to keep up with Tina is to subscribe to our newsletter. We send out updates every two weeks. Updates include new features, what we have been working on, blog posts you may have missed, and more!

You can subscribe by following this link and entering your email: [https://tina.io/community/](https://tina.io/community/)

### Tina Community Discord

Tina has a community [Discord](https://discord.com/invite/zumN63Ybpf) full of Jamstack lovers and Tina enthusiasts. When you join, you will find a place:

- To get help with issues
- Find the latest Tina news and sneak previews
- Share your project with the Tina community, and talk about your experience
- Chat about the Jamstack

### Tina Twitter

Our Twitter account ([@tina_cms](https://twitter.com/tina_cms)) announces the latest features, improvements, and sneak peeks to Tina. We would also be psyched if you tagged us in projects you have built.