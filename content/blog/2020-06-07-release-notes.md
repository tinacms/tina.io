---
title: 2020-06-07 Release Notes
date: '2020-07-07T11:21:15-03:00'
author: Nolan Phillips
---
This marks the second week of the TinaCMS team's cool down period. Next week we will be announcing a set of new projects that we'll be taking on in the following 6 weeks. 

In the meantime, here's a few updates to the project 

## Changes

### **tinacms**

* `cms.enable()` and `cms.disable()` are now lamdas which makes it easier for them to be used as `onClick` handlers.

### **react-tinacms-editor**

* Fixed a bug which caused the editor history to be lost when focus was lost

### **react-tinacms-github**

* Updated documentation to reflect changes to APIs in the previous release.
* Add`getDownloadUrl` for previewing media
* Media can now be overwritten 
* Allows leading slashes in paths
* Introduced `GithubFile` and `useGithubFile`. Docs coming soon. 
* Introduced new event: `github:commit`

### **next-tinacms-github**

* Send more helpful error messages when preview mode cannot be enabled

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 11 | DJ |
| 10 | Nolan Phillips |
| 2 | sakulstra |
| 1 | Joel Huggett |
| 1 | jpuri |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/31?closed=1) for all the details on this weeks release!