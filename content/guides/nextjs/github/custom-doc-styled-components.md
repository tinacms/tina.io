---
title: Add a Custom Document for Styled Components
---

With Next.js Preview Mode, we will actually be editing while on the production site. In order for the Tina UI to render properly in production, we need to add a [custom document](https://nextjs.org/docs/advanced-features/custom-document) to [load the Tina styled components](https://styled-components.com/docs/advanced#server-side-rendering) in Preview Mode.

Create a new file in the `pages` directory called `_document.tsx`, copy this code to that file:

**pages/\_document.tsx**

```tsx,copy
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```
