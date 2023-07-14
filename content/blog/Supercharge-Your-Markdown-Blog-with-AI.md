---
title: Supercharge Your Markdown Blog with AI
date: '2023-07-14T04:00:00.000Z'
last_edited: '2023-07-14T04:00:00.000Z'
author: Logan Anderson
---

## Leveraging Your Workflow with TinaCMS

<Youtube embedSrc="https://www.youtube.com/embed/3SkumYmH8nc" />

With TinaCMS, all your content changes are committed directly to Git. This enables your team to create a variety of workflows for reviewing and merging content updates. By leaning on GitHub's robust infrastructure, you're empowered to seamlessly integrate CI/CD into your content workflow.

To illustrate the potential of this combination, we're excited to introduce:

..."**t-ai-na**"?

...Hmm, maybe not. It doesn't quite roll off the tongue.

..."**AI'paca**"?

...Oh, that's even worse. Don't worry, we won't subject you to any more dreadful puns.

In the end, we've simply gone with **ai-content-suggestions** for our bot. (Name suggestions are always welcome!)

# Introducing a GitHub Bot for Content Suggestions

## A Useful Aid, Not a Replacement

AI can be a valuable tool for assisting with writing and editing content. We've designed this bot not to replace content editors, but rather to augment their capabilities. The bot offers content suggestions directly in your pull requests. If you find the suggestions helpful, you can commit them with a click. If not, they're just as easily dismissed.

![AI Suggestion in Github](http://res.cloudinary.com/forestry-demo/image/upload/v1688483462/blog-media/supercharge-markdown-blog/Screenshot_2023-07-04_at_11.03.24_AM_bfqnld.png "AI Suggestion in Github")

## Efficient Content Suggestions with AI

AI's increasing role in content development can't be ignored. However, getting useful, easily applicable AI suggestions for your content has not always been straightforward. This often involved copying and pasting from AI outputs and making incremental updates to the real content. We knew there had to be a better way, so we developed a GitHub bot that allows us to receive these suggestions right within a GitHub pull request.

## Working with the GitHub Bot

After you've integrated the bot into your repository, you can command it to make suggestions by commenting `ai fix: <path to file>`.  A custom prompt can be added by using `prompt: <Custom Prompt>`  underneath. The bot will then offer commit suggestions in the form of a pull request review.

## Looking Ahead: AI and Git-based Content

Our GitHub bot works hand in hand with TinaCMS to enhance the content creation process. No longer do you need to manually copy and paste suggestions. The bot brings suggestions right to your pull requests for a smooth, efficient experience.

We can envision some impressive custom workflows being built with AI and Git-based content. For instance, you could build off of this bot to:

* Trigger the AI bot with custom events, such as opening a PR.
* Utilize analytics to suggest recommendations based on your top/bottom performing pages.
* Integrate this bot with your feedback widget, to open PRs based on user feedback.

These are just a few of the many possibilities we see for integrating AI with Git-based content. We're excited about the potential here and look forward to seeing the creative workflows that the community will build.
