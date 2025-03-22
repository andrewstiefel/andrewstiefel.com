---
layout: post
title: Working with Multiple GitHub Accounts and SSH Keys
description: Learn how to use 1Password to sign Git commits for multiple GitHub accounts on one machine
permalink: working-multiple-github-accounts/
image: 
date: 2024-05-09
category: articles
tags:
  - coding
---

I have multiple GitHub accounts – one for work, one for demos, and one for personal projects. Each has a unique email address, password, and 2FA associated with it. They also each have a unique SSH key. In fact, the SSH keys are all saved in different 1Password accounts (personal, demo, and work).

In some cases I perform the development on the same device, like when I'm building a demo on my work device. In that case I need to make sure that I'm using the correct GitHub account and SSH key.

I use 1Password as my [SSH agent](https://developer.1password.com/docs/ssh) because it keeps the private keys off my device, plus it makes authorizing SSH connections a breeze. I can authenticate a connection using Touch ID, so just a fingerprint touch on my keyboard and then I'm off to my next task.

Fortunately, this only takes a few minutes to setup!

## Organize your local directory

All my repositories are saved under a GitHub folder and then I use directories to organize my projects by account. Although I prefer to keep personal and work separate, you could configure all three accounts for a single device like in the example below:

```
~/github
├── /demo
├── /personal
└── /work
```

This will make it very easy to configure which profile and SSH key to use in the following steps.

## Set your global gitconfig file

In this example, I'm setting my personal Git configuration as the global default. Using `[includeIf]` I specify a different `.gitconfig` file for the **demo **and **work **directories.

```shell
[user]
  name = <github_personal_name>
  email = <github_personal_email>
  signingkey = <your_ssh_key>

[gpg]
  format = ssh

[gpg "ssh"]
  program = "/Applications/1Password.app/Contents/MacOS/op-ssh-sign"

[commit]
  gpgsign = true

[includeIf "gitdir:~/github/demo"]
  path = ~/github/demo/.gitconfig

[includeIf "gitdir:~/github/work"]
  path = ~/github/work/.gitconfig
```

## Create gitconfig files for each directory

Next I'll create `.gitconfig` files and save them in the **demo **and **work **directories. I'll use a similar template, but this time I'll provide the GitHub name, email, and public signing key for my demo and work accounts.

```shell
[user]
  name = <github_work_name>
  email = <github_work_email>
  signingkey = <your_ssh_key>

[gpg]
  format = ssh

[gpg "ssh"]
  program = "/Applications/1Password.app/Contents/MacOS/op-ssh-sign"

[commit]
  gpgsign = true
```

## Configure the SSH agent

In order to call the correct SSH keys, I'll need to update the SSH agent config file located at `~/.ssh/config`.

I start by setting the 1Password SSH agent as the default for all hosts. Then I create custom hosts for each account, in this case** Demo**,** Personal**, and** Work**.

Next, I downloaded the public keys from 1Password for my demo, personal, and work accounts. I renamed each file (for example, `demo_git.pub`) and saved the all to my `~/.ssh/` folder.

```shell
# By default, use the 1Password SSH agent for all hosts
Host *
  IdentityAgent "~/Library/Group Containers/2BUA8C4S2C.com.1password/t/agent.sock"

# Demo GitHub
Host gh-demo
    HostName github.com
    User git
    IdentityFile ~/.ssh/demo_git.pub
    IdentitiesOnly yes

# Personal GitHub
Host gh-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/personal_git.pub
    IdentitiesOnly yes

# Work GitHub
Host gh-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_git.pub
    IdentitiesOnly yes
```

## Reset your local repositories

Finally, I'll need to reset each individual repository so it uses one of the hosts specified above. This will make sure it uses the correct SSH key to authenticate with GitHub and when pushing Git commits.

```shell
git remote set-url origin <host>:<organization>/<repository>.git
```

Finally, run `git remote -v` to confirm that Git is using the correct remote repository. You can run `git fetch` to confirm that 1Password offers up the correct SSH key for authentication.

## Resources

- [Configure Multiple Git Signing Setups](https://developer.1password.com/docs/ssh/git-commit-signing#configure-multiple-commit-signing-setups "Configure Multiple Git Commit Signing Setups") (1Password)
- [Use Multiple GitHub Accounts](https://developer.1password.com/docs/ssh/agent/advanced#use-multiple-github-accounts "Use Multiple GitHub Accounts") (1Password)
- [Adding a New SSH Key to Your GitHub Account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account "Adding a New SSH Key to Your GitHub Account") (GitHub)
- [Register a Public SSH Key with GitHub](https://developer.1password.com/docs/ssh/git-commit-signing#step-2-register-your-public-key "Register a Public SSH Key with GitHub") (1Password)
- [Testing Your SSH Connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection "Testing Your SSH Connection") (GitHub)
- [Switching Remote URLs from HTTPS to SSH](https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey#verify-the-public-key-is-attached-to-your-account "Switching Remote URLs from HTTPS to SSH") (GitHub)
- [Optimize Your Git Setup: Strategies for Handling Multiple GitHub Accounts](https://dev.to/sisco/optimize-your-git-setup-strategies-for-handling-multiple-github-accounts-3ji8 "Optimize Your Git Setup") (Dev.to)