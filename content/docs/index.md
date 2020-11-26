---
title: TinaCMS Documentation
id: introduction
last_edited: '2020-11-26T14:37:54.481Z'
---
Tina is a **toolkit for building visual editing** into your site. By creating a custom editing experience with Tina instead of opting for a conventional CMS, developers can give their teams a contextual, intuitive editing experience without sacrificing code quality.

## First Steps

Are you new to using Tina to build content management systems? Start with these resources to build your understanding of Tina and what's possible.

* Go through the [**Getting Started Tutorial**](/docs/getting-started/introduction "Getting Started"): [Installing ](/docs/getting-started/cms-set-up#install-tinacms)_[tinacms](/docs/getting-started/cms-set-up#install-tinacms)_ | [Creating a CMS instance and adding the ](/docs/getting-started/cms-set-up#create-a-cms-instance-add-tinaprovider)_[TinaProvider](/docs/getting-started/cms-set-up#create-a-cms-instance-add-tinaprovider)_
  | [Configuring the CMS object](/docs/getting-started/cms-set-up#configure-the-cms-object)
  | [Enabling the CMS](/docs/getting-started/cms-set-up#enabling-the-cms)
  | [Creating and registering a form plugin](/docs/getting-started/edit-content#create--register-a-form)
  | [Loading content from an external API](/docs/getting-started/backends#loading-content-from-an-external-api)
  | [Saving content changes](/docs/getting-started/backends#saving-content)
  | [Adding alerts](/docs/getting-started/backends#adding-alerts)
* Click **Edit this Site** at the bottom of the page to fork the [tinacms.org repository](https://github.com/tinacms/tinacms.org "Tinacms.org Repository"), make changes, and then open a Pull Request!
* Checkout [this video of a page builder](https://youtu.be/4qGz0cP_DSA "Inline Editing Demo Video") created with TinaCMS.

## Getting Help

Have questions on how to use Tina to build your CMS?

* Visit the [Tina Forum](https://community.tinacms.org "Tina Forum") to engage with the core team and community.
* Report bugs using [GitHub Issues](https://github.com/tinacms/tinacms/issues "Tina Github Issues")
* [FAQ](docs/getting-started/faq)

## How This Site Is Organized

Learning how to build a CMS is no small feat! We've compiled a variety of resources to help you along.

* Docs describe the main Tina concepts and how to use them to build your CMS.
* [Guides](/guides "Tina Guides") take you through the steps involved in addressing key problems and specific use-cases.
* The [Blog](/blog "Tina Blog") is where release notes, tips, and other announcements are posted.
* Visit the [Packages Reference](/docs/packages) to find more tools and make building your CMS even easier.

## Constructing The User Interface

Tina lets you choose the user interface that best fits your workflow. You can use one of its default interfaces or construct your own. You can even build editing capabilities directly into your page!

* Learn about the [Toolbar](/docs/ui#toolbar-configuration "Tina Toolbar") and [Sidebar](/docs/ui#sidebar-configuration "Tina Sidebar") UI components.
* Take control of the appearance of your CMS using [Custom Styling](/docs/ui/styles "Styles")
* Add features to your CMS using [Screen Plugins](/docs/plugins/screens "Screen Plugins") and [Toolbar Widgets](/docs/plugins/toolbar-widgets).
* Wander off the beaten trail and create a totally custom UI _(Coming Soon)_

## Tools for Managing Content

Tina gives you the tools you need to manage content from the data source of your choosing. These docs will show you how to craft your ideal content editing experience.

* **Editing Content:** [Creating Forms](/docs/plugins/forms), [Fields](/docs/plugins/fields),[ Custom Fields](/docs/plugins/fields/custom-fields), [Inline Editing](/docs/ui/inline-editing), [Working with Inline Blocks](/guides//general/inline-blocks/overview)
* **Creating Content:** Using [Content Creators](/docs/plugins/content-creators)
* **Deleting Content:** Using Form Actions. _(Coming Soon)_
* **Media Management:** [Media Stores](/docs/media "Tina Media Store"), [Image Fields](/docs/plugins/fields/image "Image Field Plugin"), [Inline Images](/docs/ui/inline-editing/inline-image "Inline Images")
* **Custom Fields:** [How to Make a Custom Field Component](/blog/custom-field-components)

## Integrating with React Frameworks

Tina is designed to work with just about any React framework. Once you're comfortable with the basics of TinaCMS, these guides will help you learn the specifics of building a CMS with Next.js or Gatsby.

* [Next.js](/docs/integrations/nextjs)
* [Gatsby](/docs/integrations/gatsby)