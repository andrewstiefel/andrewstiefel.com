---
layout: post
title: How I Use GitHub as a CMS
description: GitHub makes it easy to build a free content management system for your blog.
permalink: github-cms-blog/
image: 
date: 2025-02-02
category: guides
stage: evergreen
tags:
  - blogging
  - writing
  - coding
---
I use [[2021-12-20-blog-jekyll-netlify|Jekyll to build and publish my blog on Netlify]]. For a long time my content management system (CMS) was just a bunch of markdown files on my laptop. Most of the time I don't need anything else — it's simple, and it's just me. 

But as I've wanted to focus on writing more often, I wanted to find an easier way to track future ideas, what I'd like to work on now, and easily see what I've done.

That's where GitHub comes in.

## Why?

GitHub is built for software development, but many of the features work just as well for content development. In fact, is has about everything I need as you'll see in my setup section below. This includes templates, project boards, and workflows for publishing. 

Plus it's easy to review and collaborate with other people. I don't do that much as a solo writer, but I do get readers who spot typos or who share feedback—and then it's easy to track and add their contributions.

But let's be honest — this is one of the projects I took on because I could, not so much because it really saves me any time. Choose your adventure accordingly :)

## Basic setup

If you're already using GitHub to host the code for your blog (like I do with Jekyll), then you can get started with this in 15 minutes or less!

1. **Create a project:** Go to the GitHub repository for your blog (or make a new one!) and select projects and [create your project](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project).
2. **Choose a format:** GitHub projects lets you [customize views](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project) of items in your project using a Kanban board or table format. I recommend starting with the Kanban format. You can always change this later. 
3. **Organize your workflow:** Once you've created your project, take a couple minutes to configure your workflow. I have sections for no status (my backlog), in progress, ready, and done.

You can [see an example of mine on GitHub](https://github.com/users/andrewstiefel/projects/2), or with the screenshot below:

{% include image.html
   src="/assets/img/github-cms.png"
   alt="GitHub CMS"
%}

## Use issues to track posts

Once you've created the basic structure, it's time to start tracking your writing! You'll want to create new issues so you can track your progress. I decided to create a new template so I wouldn't have to add the same info every time.

If you'd like to create one, all you need to add is a markdown file in your repository at the location below:

```
.
├── .github 
│   └── ISSUE_TEMPLATE
│      └── cms.md
```

Here's [an example](https://github.com/andrewstiefel/andrewstiefel.com/blob/main/.github/ISSUE_TEMPLATE/cms.md?plain=1) of what mine looks like:

```markdown
---
name: cms
about: Submit an idea for the blog
title: "[blog post] "
labels: cms
assignees: ''
---

**What is this post about?**


**Outline**
1. 

**Tasks**
- [ ] Write outline
- [ ] Draft blog post
- [ ] Find (1) reviewer
- [ ] Create pull request
```

I use the format `[blog post] example title` so I can see at a glance that the issue covers a new blog post, and roughly what it's about. I provide a brief description (usually when I first have the idea). Later I'll come back and outline the post.

## Writing and publishing posts

Jekyll comes with basic structure which makes it easy to get started. I save my draft writing in the `_drafts` folder and move finished posts into the `_posts` folder.

```
.
├── _drafts 
├── _posts
```

But you have a few options to customize your workflow a bit further:

* **Work directly in your main branch** and publish by moving the your finished drafts from the `_drafts` folder to the  `_posts` folder. 
* **Create a new branch** for each post as you work and merge into your main branch when you're ready to publish.

>**JEKYLL TIP** 
You can preview your posts in your development environment as you work! Just append the `--`drafts flag to the build or serve command. For example,  `jekyll serve --drafts`. Each draft post will be added using the last modified time as the publication date. 

I prefer to create a new branch and to submit a pull request when I'm ready to publish (although I'll admit, I'm not super consistent since it's just me). Either way, when you're ready to publish, you'll [close the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue) for your blog by writing a commit message that includes the number of the issue. For example, when I published this blog, I used "Closes 212" to tell GitHub to mark the issue as done.

Now if you visit your project, you'll see your post has automatically been moved to the "done" column!

{% include image.html
   src="/assets/img/github-pull-request.png"
   alt="GitHub Pull Request"
%}

## Final thoughts

I've been exploring ways to [customize this further by creating new views](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project) — for example, a table view that adds publication dates so I can when I want to publish a post. But most importantly, I'm enjoying the flexibility and close integration between what I write and how it's published. 

## Further Reading
- [[2021-12-20-blog-jekyll-netlify|How I Built My Blog with Jekyll and Netlify]]
- [[2025-01-17-markdown-files-not-apps|Markdown Files, Not Apps]]