---
title: The New Github Auth Flow
date: '2020-06-16T13:47:03-03:00'
author: Joel Huggett
---
TinaCMS communicates with Github using a proxy, so the authentication token provided by Github is stored as an httpOnly cookie. This stops the client from accessing the token, and that's all very good. **But** what it doesn't account for is [CSRF]() attacks, which means any calls to the proxy, so long as that cookie is still there, will succeed, and that's not very good.

A common approach to mitigating this problem is to implement the [Token Synchronization Pattern](). The issue is that this pattern require some form of server-side session storage. That doesn't jive well with the stateless approach of static sites. So, we've introduced a variation that we call the Stateless Token Synchronization Pattern.

It works by storing a CSRF token as an httpOnly cookie and sending an encrypted (signed by the server's secret _Signing Key_) token that is the amalgamation of the CSRF token and the authentication token provided by Github. This amalgamated token is then stored client-side in local storage and sent to the proxy in a bearer authentication header. Then, server-side, the amalgamated token is decrypted and the CSRF tokens are compared to make sure they match. If all is well, the authentication token is extracted and the call is completed.

This new pattern help mitigate CSRF attacks and provides the authentication token in an encrypted format, all done statelessly.

## Upgrading to the new flow

### **react-tinacms-github**

Nothing needs to be changed. This package can handle both the old flow and the new one

### **next-tinacms-github**