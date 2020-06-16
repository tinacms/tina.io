---
title: 'Upgrade Notice: TinaCMS + GitHub Packages'
date: '2020-06-16T13:47:03-03:00'
author: Joel Huggett
---
TinaCMS communicates with GitHub using a proxy, so the authentication token provided by GitHub is stored as an httpOnly cookie. This stops the client from accessing the token, and that's all very good. However, this strategy is still vulnerable to [Cross-Site Request Forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) attacks. This means that any calls to the proxy, so long as that cookie is still there, will succeed, and that's not very good.

A common approach to mitigating this problem is to implement the [Token Synchronization Pattern](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#synchronizer-token-pattern). The issue is that this pattern require some form of server-side session storage. That doesn't jive well with the stateless approach of static sites. So, we've introduced a variation that we call the Stateless Token Synchronization Pattern.

**Stateless Token Synchronization** works by storing a CSRF token as an httpOnly cookie and sending an encrypted (signed by the server's secret _Signing Key_) token that is the amalgamation of the CSRF token and the authentication token provided by Github. This amalgamated token is then stored client-side in local storage and sent to the proxy in a bearer authentication header. Then, server-side, the amalgamated token is decrypted and the CSRF tokens are compared to make sure they match. If all is well, the authentication token is extracted and the call is completed.

This new pattern help mitigate CSRF attacks and provides the authentication token in an encrypted format, all done statelessly.

## Upgrading to the new flow

### **react-tinacms-github**

Nothing needs to be changed. This package can handle both the old flow and the new one on its own without further configuration.

### **next-tinacms-github**

**next-tinacms-github** api routes now require a secret _Signing Key_.

The _Signing Key_ should be a random 256-bit key, used server-side to encrypt and decrypt authentication tokens sent to the client.

You can generate a key by running `openssl rand -base64 32` in your terminal, using the output as your _Signing Key_.

`createAuthHandler`, `apiProxy`, and `previewHandler` now  **require** the _Signing Key_ to be passed as a parameter.

E.g., the proxy-github route:

```TSX
import { apiProxy } from 'next-tinacms-github'

export default apiProxy(
    process.env.SIGNING_KEY
)
```

**Also**, `enterEditMode` needs to pass the new token that is in local storage as an authorization header to the `/api/preview` route, like this:

```TSX
const enterEditMode = () => {
  const token = localStorage.getItem('token') || null

  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }


  return fetch(`/api/preview`, { headers: headers }).then(() => {
    window.location.href = window.location.pathname
  })
}
```

## Questions?

Discuss it in the [forums]().
