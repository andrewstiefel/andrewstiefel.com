---
layout: post
title: Building a Personal Monorepo for Writing
description: How I created a workflow for researching and blogging with Obsidian and Jekyll
permalink: monorepo/
image:
date: 2025-07-19
category: guides
stage: budding
tags:
  - blogging
  - writing
  - coding
---
I use [Obsidian](https://obsidian.md/) to organize my thinking and writing. But I’ve always been dissatisfied with the process of turning what I write into a formatted post for my website. I either had to manage multiple vaults—adding complexity and violating one of my core principles of note-taking—or copy, paste, and edit my writing in another tool like VS Code.

I also prefer to keep my content separate from the website’s design, and I wanted to do that without introducing a CMS or additional tooling. Static site generators like Jekyll are great at converting Markdown into websites, but they usually require you to store content alongside all the other website files.

After some experimenting, I landed on a better solution: building a personal monorepo for my writing and publishing workflow.

## Why use a monorepo?

A _monorepo_—short for monolithic repository—combines code for multiple projects into a single repository. A common pattern is to store both frontend and backend code in one place.

That’s actually a good analogy for how I think about writing. The “backend” is my Obsidian vault, where I research and take notes. The “frontend” is the website where I publish finished posts.

## Basic Setup

To start ,I moved my Obsidian vault and Jekyll website into a new `personal-monorepo` directory structured like this:

```
~/personal-monorepo
├── /notes
└── /website
```

If you don’t already have an Obsidian vault or Jekyll site, you can easily replicate this from scratch. Install Obsidian, open the **/notes** directory using the “Open folder as vault” option, and you’re ready to go. 

Setting up Jekyll requires a bit more technical work, but [you can find installation instructions here](https://jekyllrb.com/docs/installation/).

## Configuring Obsidian

For this approach it's important to make a directory where you will only store published posts. I'm going to use `/notes/posts` for this tutorial but you can configure this directory any way you wish.

I also recommend installing two Obsidian community plugins:
* [Obsidian Git](https://github.com/Vinzent03/obsidian-git) – adds version control and makes publishing easy
* [Obsidian Permalink Opener](https://github.com/kepano/obsidian-permalink-opener) – lets you open post URLs in your browser for previewing

For Git, you can push commits manually or set up periodic syncs. For the Permalink Opener plugin, I added both my website’s base URL and my local development URL so I can preview posts in the browser while editing.

With that we're ready to move on to building our website.

## Connecting Jekyll and Obsidian

By default, Jekyll looks for posts in `/website/_posts`. But I want it to use the content in `/notes/posts`. The simplest solution is to create a symbolic link.

First, open Terminal and make sure you're in the root of your monorepo (`~/personal-monorepo`). **Back up your content**, then delete the existing `_posts` directory:

```bash
rm -rf website/_posts
```

Next, create a symlink that points to your Obsidian posts:

```bash
cd website
ln -s ../notes/_posts _posts
```

**Note:** Folder names in symlinks are case-sensitive. If your Obsidian vault uses `Posts` instead of `posts`, your symlink won't work with the above command. Folder names must match exactly.

## Publishing with Netlify

[Netlify](https://www.netlify.com/) provides first-class support for working with monorepos, but you'll need to do a little additional configuration.

In your project dashboard or `netlify.toml` file, set the base directory to `website`, and make sure the build command installs dependencies before running Jekyll:

Here's what my full `netlify.toml` looks like, and what is reflected in my dashboard:

```yaml
[build]
  base = "website"
  command = "bundle install && bundle exec jekyll build"
  publish = "_site"
```

Netlify follows symlinks automatically, but Jekyll needs one extra setting. In your `website/_config.yml`, add:

```yaml
# Enable access to symlinked content
lax_symlink_lookup: true
```

This lets Jekyll access files stored outside its root directory (e.g. the `website` folder). Without the site will build but won't pull in your content from the `notes/_posts` directory.

## Final Workflow

I have Obsidian configured to add new notes to my writing inbox under the `~inbox` directory. Anything I start writing goes there. Once I've finished writing a note, I can then either move it into my permanent notes or add it to the `posts` directory if I want to publish it. Once I push the commit Netlify will build and publish my site.

While I'm writing, I can preview what the note will look like by starting the Jekyll development server (`bundle exec jekyll serve`) and adding the note to the `posts` directory. I can use the Obsidian hotlinks command to open a preview of the post in my browser.

To wrap up, your final workflow looks something this this:

1. Write, edit, and link notes in Obsidian
2. Commit and push changes to Github
3. Netlify will pick up the changes and publish your posts

## Bonus: Convert Backlinks to Weblinks

It's outside the scope of this post, but I also wrote a custom plugin to convert backlinks to web links. That way I can use Obsidian's backlinks within my published posts. 

[You can grab the code here](https://github.com/andrewstiefel/andrewstiefel.com/blob/main/_plugins/backlinks.rb).

## Additional Resources
* [Jekyll Blogging with Obsidian](https://alexoliveira.cc/guide/jekyll-with-obsidian)
* [Obsidian Jekyll workflow](https://refinedmind.co/obsidian-jekyll-workflow)
* [Blogging with Obsidian and Jekyll](https://dev.to/adrianogil/blogging-with-obsidian-and-jekyll-5bgl)
* [How I Use Obsidian](https://stephango.com/vault)