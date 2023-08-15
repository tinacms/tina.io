---
title: Bring your own Authentication Provider
id: '/docs/reference/self-hosted/authentication-provider/bring-your-own'
prev: '/docs/reference/self-hosted/authentication-provider/tina-cloud'
next: null
---

To self host your own authentication, you must implement several functions. These functions are passed to the TinaCMS client when it is initialized. The following functions are available:

`authenticate`: This function is called when the user goes into `/admin` and they are not logged in (determined by `getUser`). This function should redirect the user to the login page or do whatever is necessary to authenticate the user.

`getUser`: This function is called when the user goes into `/admin` and is used to determine if the user is logged in. If it returns a truthy value, the user is logged in and if it returns a falsy value the user is not logged in.

`getToken`: This function is called when a request is made to the GraphQL endpoint. It should return an object with an `id_token` property. This will be passed as an `Authorization` header in the format `Bearer <id_token>`

`logOut`: This function is called when the user clicks the logout button in the admin.

Set `customAuth` to `true` in the config to enable this.

Add the functions to your `tina/config.{ts,js}`&#x20;

```javascript
export default defineConfig({
// This is the url to your graphql endpoint
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      customAuth: true,
      // This is called when they want to authenticate a user. For a lot of implementations it just may be redirecting to the login page
      async authenticate() {
        console.log('Authenticating...')
        localStorage.setItem(
          'local_cache',
          JSON.stringify({ name: 'Logan', role: 'admin' })
        )
        return {}
      },
      // Get token this will be called when a request and will be passed as an `Authorization` header in the format `Bearer <id_token>`
      getToken: async () => {
        return {
          id_token: 'Foo',
        }
      },
      // Called to log the user out
      async logOut() {
        console.log('logOut...')
        localStorage.removeItem('local_cache')
        window.location.href = '/'
      },
      // The CMS uses this function to get info about the user. It also uses it to see if the user is logged in. Provide a truthy value if the user is logged in and a falsy value if the user is not
      async getUser() {
        console.log('getUser...')
        const userStr = localStorage.getItem('local_cache')
        if (!userStr) {
          return undefined
        } else {
          try {
            return JSON.parse(userStr)
          } catch {
            return null
          }
        }
      },
      //...

```

Next you can use the value passed from `getToken` in your backend function to make sure the user is authenticated:

`pages/api/gql.{js,ts}`

```ts
import { NextApiHandler } from 'next'
import { isUserAuthorized } from '@tinacms/auth'
import databaseClient from '../../tina/__generated__/databaseClient'

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Example if using custom auth
  const isAuthorized = await myCustomAuthFunction({
    token: req.headers.authorization,
  })

  if (isAuthorized) {
    const { query, variables } = req.body
    const result = await databaseClient.request({ query, variables })
    return res.json(result)
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export default nextApiHandler
```
