---
title: 'FAQ: Content API Errors'
---

## Invalid or undefined branch
The current branch that Tina is using is invalid or undefined. Double check that the correct branch is selected and it does in fact exist.
## .tina directory (with generated subdirectory) not pushed to git
The `.tina` directory and everything inside needs to be pushed up as well. Be sure to add it to your git repository (and make sure you don't have it listed in a `.gitignore`). 
## API URL is misformatted
The ContentAPI URL isn't formatted correctly. {Is there a resource we can link to here to provide more info?}
## Trying to access local GraphQL server when it's not running or in prod.
#### In production
Make sure your API URL isn't set to point at your local GraphQL server when in production. You should be pointing to the ContentAPI.
#### Working locally
If you are working locally, make sure your GraphQL server is running. See [here](/docs/graphql/cli/) for more information.
## Document doesn't exist
Double check you aren't trying to access a document that doesn't exist.