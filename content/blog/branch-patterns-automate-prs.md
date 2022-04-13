---
title: Branch patterns and automating PRs
date: '2022-04-14T07:00:00.000Z'
author: James Perkins
prev: read-only-tokens-content-anytime.md
---

When working on a git backed site you don’t normally want to work directly on your main branch. Ideally, you want to be able to finish your post or site update, check if it looks good, and schedule the release. A good branch pattern and scheduler is key to making this work. In this post, we are going to cover two different options to automate your PRs and an example of the branch pattern I use with Tina.

## Branch Pattern

Branching patterns are very much a personal or business decision, however it usually comes down to how we work on a feature or fix, where we stage the code, and finally when we deploy it. 

My preferred branch pattern looks like the following:

### Permanent Branches:

**main** - This holds the production site that is live and is also the source of truth.

**staging** - This holds the current planned work that is ready for release but may also be a copy of the main branch.

### Temporary Branches:

**feature-name** - Used for a new feature on a site or application.

**bug-fix-name** - Used to fix a bug that was found.

**blog-post-name** - Used for a blog post article. 

When work on a temporary branch is complete, the pull request will go to staging. Here, it will be tested and determined if everything works as expected. A pull request will then be opened to production. Once the production release is complete, the temporary branch will be removed.

## PR Scheduler

PR Scheduler is a GitHub integration that can be installed directly within your GitHub repositories. It was built by [Tom Kadwill](https://tomkadwill.com/) with the goal to make it easy to schedule pull requests. Instead of having to write your own GitHub action, you can write a comment in your pull request and the application will take care of it for you.

### How to install

1. Open [PR Scheduler's GitHub App page](https://github.com/apps/pr-scheduler).
2. Click the 'Install' button
3. Select whether to install PR Scheduler on all repositories or only specific repositories. Then click 'Install'.

### How to schedule a pull request

Now, the PR Scheduler can now be used to schedule any of your pull requests. To initiate,do the following:

1. Open  the pull request that you want to schedule.
2. Add a new comment with DD/MM/YYYTHH:MM for example `@prscheduler 05/04/2022T14:00`
3. PR Scheduler will respond back telling you it's ready.


That's it! Now when that time comes, your PR will be merged. If you make a mistake with the time or date, just run the same command and it will reschedule.

![Example Image of PR Scheduled](https://res.cloudinary.com/forestry-demo/image/upload/v1649865121/blog-media/branch-automate-pr/Screen_Shot_2022-04-12_at_7.34.54_AM.png)

## Github Actions

Github Actions are a powerful and flexible way to allow you to run all sorts of DevOps operations without needing separate tooling. Github Actions use YAML to create and run your operations. 

### Creating your GitHub action

Create a file in your project called `.github/workflows/scheduler.yml`. We will use this to create our action.

There are quite a few options for Github Actions. I have used **merge-schedule-action**  in quite a few projects. This action takes a few different arguments and uses the date to schedule your PR:

```
name: Merge Schedule
on:
  pull_request:
    types:
      - opened
      - edited
      - synchronize
  schedule:
    # Check every hour.
    - cron: 0 * * * *

jobs:
  merge_schedule:
    runs-on: ubuntu-latest
    steps:
      - uses: gr2m/merge-schedule-action@v1
        with:
          merge_method: merge
          #  Time zone to use. Default is UTC.
          time_zone: "America/New_York"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

So let us break down what is happening. We have given this job a name of Merge Schedule. It will only trigger on pull requests that are opened, edited, or synchronized. Every hour we run a job called `merge_schedule`, thanks to the cronjob `0 * * * *` 

The steps are the most important here. First, the job needs to use `gr2m/merge-schedule-action@v1` and tell it the merge method to use. I have set it to merge but you could use squash if you prefer. The `time_zone` is t set to UTC by default, but can be any time zone you need.

The `GITHUB_TOKEN` doesn’t need to be set, since GitHub will retrieve a `GITHUB_TOKEN` to use for the account. 

### How to run the action

Now that we have created the action, when you create a pull request, you need to add `/schedule YYYY-MM-DD` to your pull request description. At this point the action will check all PRs until the date matches and then deploy the code. If you need precise deployments you can use `/schedule 2019-12-31T00:00:00.000Z.`

## How to keep up to date with Tina?

The best way to keep up with Tina is to subscribe to our newsletter, we send out updates every two weeks. Updates include new features, what we have been working on, blog posts you may have missed, and so much more!

You can subscribe by following this link and entering your email: [https://tina.io/community/](https://tina.io/community/)

### Tina Community Discord

Tina has a community [Discord](https://discord.com/invite/zumN63Ybpf) that is full of Jamstack lovers and Tina enthusiasts. When you join you will find a place:

*   To get help with issues
*   Find the latest Tina news and sneak previews
*   Share your project with Tina community, and talk about your experience
*   Chat about the Jamstack

### Tina Twitter

Our Twitter account ([@tina\_cms](https://twitter.com/tina\_cms)) announces the latest features, improvements, and sneak peeks to Tina. We would also be psyched if you tagged us in projects you have built.
