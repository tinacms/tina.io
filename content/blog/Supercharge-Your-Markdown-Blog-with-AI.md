---
title: Markdown Bot - An AI friend who improves your content
date: '2023-07-14T04:00:00.000Z'
last_edited: '2023-07-14T04:00:00.000Z'
author: Logan Anderson
---

With [TinaCMS](https://tina.io), all your content changes are committed directly to Git. This enables your team to create a variety of workflows for reviewing and merging content updates. By leaning on GitHub, you can integrate CI/CD into your content workflow.

To illustrate the potential of this combination, we're excited to introduce **Markdown Bot**, an AI friend who improves your content by making suggestions to your Pull Requests.

<Youtube embedSrc="https://www.youtube.com/embed/3SkumYmH8nc" />

> Want to skip the reading and jump straight to the code? [Check out the open source repo](https://github.com/tinacms/ai-content).

## A Useful Aid, Not a Replacement

AI can be a valuable tool for assisting with writing and editing content. We've designed this bot not to replace content editors, but rather to augment their capabilities. The bot offers content suggestions directly in your pull requests. If you find the suggestions helpful, you can commit them with a click. If not, they're just as easily dismissed.

![AI Suggestion in Github](http://res.cloudinary.com/forestry-demo/image/upload/v1689957326/blog-media/markdown-bot/Screenshot_2023-07-21_at_12.34.42_PM_kh2czf.png "AI Suggestion in Github")

## Markdown Bot Works On Your PRs

There are many AI writing tools out there but if you use them with markdown content it often involved copying and pasting from AI outputs. We wanted something that could interact with our Content in GitHub. That's why we developed a GitHub bot that allows us to receive these suggestions right within a GitHub pull request.

## Working with the GitHub Bot

After you've integrated the bot into your repository, you can command it to make suggestions by commenting `ai fix: <path to file>`. A custom prompt can be added by using `prompt: <Custom Prompt>` underneath. The bot will then offer commit suggestions in the form of a pull request review.

To get started [check out the open source repo](https://github.com/tinacms/ai-content "AI Content Github repo").

## Looking Ahead: AI and Git-based Content

Our GitHub bot works hand in hand with TinaCMS to enhance the content creation process. No longer do you need to manually copy and paste suggestions. The bot brings suggestions right to your pull requests for a smooth, efficient experience.

We can envision some impressive custom workflows being built with AI and Git-based content. For instance, you could build off of this bot to:

* Trigger the AI bot with custom events, such as opening a PR.
* Utilize analytics to suggest recommendations based on your top/bottom performing pages.
* Integrate this bot with your feedback widget, to open PRs based on user feedback.
* Catch insensitive, inconsiderate writing with tools like [alex](https://github.com/get-alex/alex)

These are just a few of the many possibilities we see for integrating AI with Git-based content. We're excited about the potential here and look forward to seeing the creative workflows that the community will build.
