---
title: The Evolution of Inline Editing
date: '2021-05-05T10:00:00.000Z'
author: Mitch MacKenzie & DJ Walker
last_edited: '2021-05-05T10:00:00.000Z'
---

Inline editing removes many usability hurdles that content editors face when they are working with traditionally decoupled CMS forms. Editors get to see their content changes immediately in the context of their actual website. But developers have been sharing the trade-offs associated with inline editing's current implementation with us.

We're continuing to learn from our development community and looking at better ways of integrating the superpowers that inline editing bestows.

## A review of the original approach

Let's take a look at a simple [inline editing](https://tina.io/docs/ui/inline-editing/) scenario where we make the title of a page editable.

We wrap our page with the TinaCMS `InlineForm` component so that our child components behave like a form. We can edit the title value by using the `InlineText` component to inject a text input.

<iframe src="https://codesandbox.io/embed/tina-inline-editing-y28os?fontsize=14&hidenavigation=1&theme=dark&view=split&editorsize=65"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tina-inline-editing"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

We gain a lot of control as developers with this approach. The inline editing components live with your layout components and behave pretty much as you would expect them to.

But there are a few trade-offs to this approach that we've [discussed before](/blog/more-changes-coming-to-inline-editing/).

- Components like `InlineText` add markup and behaviour that can interfere with your desired layout and styling. You now have an `input` element and wrapping divs where you'd normally just render text. 
- Sidebar editing forms are constructed from a single configuration object. Inline editing brings a separate developer experience and set of concepts to understand. 

Another side effect of having inline editing coupled to your components is that you're now bringing TinaCMS with your components, everywhere.

We could try conditionally adding the inline editing components, but it's clear that the logic needed to include inline editing is now coupled to our page and components. It's now more difficult to maintain, share, or re-use those components.

The usability benefits of inline editing could possibly outweigh these concerns for your use case. But we're searching for solutions with fewer trade-offs.

## Alternative approaches

### Ref-Based Inline Editing

`useFieldRef` is the first part of an experimental new API for creating a [ref-based inline editing](https://github.com/tinacms/tinacms/blob/master/packages/react-tinacms-inline/README.md#usefieldref-ref-based-inline-editing) experience with Tina. With `useFieldRef`, inline editing components are defined in the form configuration, and you assign a [ref](https://reactjs.org/docs/refs-and-the-dom.html) to the component in your layout that the field should attach to.

Inline fields created in this fashion will be absolutely positioned on top of the referenced component and conform to its dimensions. This makes it possible for the field to appear as if it were replacing the layout component in the DOM without altering the markup.

In contrast to our first example, we define an `inlineComponent` key in our form configuration object. We've now added an inline editing component in the same manner as setting up sidebar editing!

We then call `useFieldRef` to acquire the ref that will be attached to our title element.

<iframe src="https://codesandbox.io/embed/tina-ref-based-inline-editing-p8kx4?fontsize=14&hidenavigation=1&theme=dark&view=split&editorsize=65"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="tina-inline-editing"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Editing Routes

We can create editing-specific routes if we are concerned about the performance implications of TinaCMS being bundled with a website. Frameworks like [Next.js](https://nextjs.org) will optimize Javascript bundles so that TinaCMS is not included on routes that don't include it.

The drawback of this approach is that we will need to duplicate aspects of our website's components between the normal view-only routes and the routes where TinaCMS is included.

## What's next?

We'll be making it clear in our documentation and guides that the original inline editing approach and Ref-Based inline editing are still experimental.

Sidebar editing avoids most of the friction of integrating inline editing and provides many of the same usability wins. [Tina Cloud](/early-access/) auto-generates sidebar forms based on your content's schema and represents our current recommended best practices.

Stay tuned! (Or help out! TinaCMS is open-source and built with many hands. [Share an idea or solution](https://github.com/tinacms/tinacms/issues))