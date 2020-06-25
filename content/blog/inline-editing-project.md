---
title: Inline Editing Revamped
date: '2020-06-25T05:00:00.000Z'
author: Kendall Strautman
---

6 weeks ago, we embarked on a dedicated project with the goal of _improving Inline Editing_. We believe that **this way of creating content is the future**, and we want to be a driver in actualizing that future. We chose to specifically focus on Inline Blocks, to hone in on the page builder capacities of Tina.

<iframe width="100%" height="398" src="https://www.youtube.com/embed/4qGz0cP_DSA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Here are some things we improved / added throughout the course of this project:

## Aesthetics

![comparison of controls and focus ring]()

### Focus Ring

For inline editing, the focus behavior has a huge impact on the editing experience. It should fluidly shift from active to quiet based on user input, communicating editing state and fostering a sense of control. The feedback loop needs to be tight, without being overbearing. The UI needs to be clear and yet subtle; it should not eclipse the content.

With this understanding, we chose to make the visual focus indication more nuanced — taking the stroke to 1px and incorporating a subtle drop shadow. This design helps differentiate an active block from the background while also not distracting from the content.

### Controls UI

With the editing controls, we had a similar desire to tone down the visual presence and improve the functional clarity. This became manifest through neutralized colors, a unified panel with tightened shapes, updated icons, and an elegant drop-shadow.

We also wanted to rethink the 'Add Block' interface, opting to isolate this action from the other controls and translate the label into a 'plus' icon. Editors can now add blocks before or after their siblings and set the direction on a horizontal or vertical axis.

## UI Customization

We wanted to not only clean up the visual aesthetic of the focus ring, but also to surface more customization opportunities for the developer.

### Styles & Position

When building blocks-based layouts, we noticed that page-width blocks might cause the focus ring and controls to bleed off the screen. This was due to the 1rem offset between the focus ring and the block element.

We surfaced the ability to precisely control the amount of this offset by passing 'x' and 'y' values to the focus ring configuration. And we provided an `insetControls` prop that will tuck the group or block controls _within_ the upper corner of the element.

![inset controls and focus ring]()

Developers can also control the border radius of the ring — to allow for focus rings that are fully flush with the content or even for a circular shaped bloc

### Block Limits

As we made side projects to test these editing features, we wanted the ability to limit the block range. These min / max numbers can be set on the Inline Blocks. When the minimum is reached, blocks can no longer be deleted, and likewise when the maximum is reached, additional blocks cannot be added.

This feature allows designers & developers to craft flexible layouts for their while also employing guardrails to uphold their design.

## Editing

### Drag & Drop Reordering

In doing research for inline editing UI, a feature that wasn't common but stood out to us was the ability to reorder via dragging blocks. Leaning on [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd), editors can drag blocks on either horizontal or vertical axes to adjust their order.

The axes is set via the `direction` prop mentioned above. We chose to place the drag handle directly in the controls UI to minimize interference with inputs. The overall result is a simple opt-in feature that further elevates the interactive editing context.

### Nested Blocks Focus

Something that was important to us was supporting [nested blocks](https://tinacms.org/guides/general/inline-blocks/nested-blocks](https://tinacms.org/guides/general/inline-blocks/nested-blocks) well — meaning blocks can render other blocks without the controls and focus states conflicting.

One issue we quickly noticed with nested blocks was overpopulated focus rings. When hovering over fields and fields, numerous focus rings might display at the same time — to indicate both the block and the field within the block have potential active states. To mitigate this, all inline fields now accept a `focusRing` boolean to denote whether to show the focus ring at all. This provides greater control over focus clutter.

We also improved the focus logic to mitigate parent / child conflicts. Now, when you click on any block area, the parent block is selected first. When the parent block is active, the child blocks can then be focused on. This sequential focus helps the user know what is available to edit at various block levels. Moving up the chain involves clicking on the parent block area again.

## Fields

### New [Inline Group Field](https://tinacms.org/docs/inline-editing/inline-group)

Before this field was introduced, the only way to edit metadata in the _Settings Modal_ was through a block. This field provides an opportunity to add blocks-like controls and a focus ring to a group of regular inline fields.

Inline Groups can helpful for regular inline fields where you need to edit metadata but the field isn't within a block. Take a single inline image for example; you may want to edit the alt tag or other metadata on that field so you could wrap it with an inline group.

Inline Groups are also a great way to organize numerous inline fields into cohesive chunks if you don't need the additional blocks functionality such as adding, deleting, or reordering its children.

## General Improvements

### Settings Modal

One glaring UX issue we noticed was the setting modal action interface. There was only a cancel and 'exit' button, which effectively did the same thing — closed the modal.

We introduced a _confirm_ button and adjusted the functionality of the cancel button so it actually resets form changes. These buttons improve the clarity for editors to better control and implement changes to the form.

### Enabling edit mode through the CMS

During the course of this project, the ability to enabled or disable the CMS entirely was introduced to the project. With this feature, we can now control _Inline Editing Mode_ through this `enabled` or `disabled` state. When the CMS is enabled, the inline editing state is automatically active.

This simplifies inline editing configuration. Developers no longer need to make a separate 'Enable Edit Mode' toggle to _engage_ that active editing state. They can control whether the CMS is enabled throughout their entire project at the App level.

## Final Thoughts

We know this is just the beginning. We are very passionate about the inline editing experience and will work to continually improve this API.

We want to give developers the freedom to build fully custom page-builder type experiences. While we have some ideas already on how to take this further, but we'd love to hear your feedback! Feel free to reach out with ideas on Twitter, or in the Forum.

To dive deeper, please read this guide to get more familiar with the technical implementation of these new features. Also look into these demos for reference & inspiration!
