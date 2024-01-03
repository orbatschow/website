---
layout: article
title: Kubeconfig management with kontext
date: 04-10-2023
tags: Kubernetes, kubeconfig, kontext
description: |
  When you start using Kubernetes on a day-to-day basis you might run into a situation, that will force you to 
  manage multiple kubeconfig files. This post will show you an opinionated way to handle multiple kubeconfig files
  within different environments.
---

# {{ $frontmatter.title }}

{{ $frontmatter.date }} • {{ $frontmatter.tags }}

{{ $frontmatter.description }}

## Prerequisites

### kontext

[kontext](https://github.com/orbatschow/kontext) is a _single binary application, that takes yet another approach on 
kubeconfig management_. We will use this tool to segregate our kubeconfig files into different groups and switch
between contexts easily.

### Organization

Our first step is to introduce a directory structure, that will allow us to segregate all kubeconfig files
into a meaningful tree:

```shell
mkdir -p $HOME/.config/kontext/kubeconfig/{local,dev,prod}
```

```shell
.config/kontext/
└── kubeconfig
    ├── dev
    ├── local
    └── prod
```

::: tip
You can change the tree to reflect your needs, but we will stick to this example within this post.
:::

You can create the Kubernetes clusters and kubeconfig files using [kind](https://kind.sigs.k8s.io/):

```shell
kind create cluster --name local --kubeconfig $HOME/.config/kontext/kubeconfig/local/local.yaml
kind create cluster --name dev --kubeconfig $HOME/.config/kontext/kubeconfig/dev/dev.yaml
kind create cluster --name prod --kubeconfig $HOME/.config/kontext/kubeconfig/prod/prod.yaml
```

After running the previous commands, you will end up with three Kubernetes clusters for different 
customers.

## Kontext

We will use [kontext](https://github.com/orbatschow/kontext) to manage all of our kubeconfig files.

### Configuration

Let's start to configure kontext with a minimum working example:

```yaml
# global configuration options
global:
  # kubeconfig location
  kubeconfig: "$HOME/.config/kontext/kubeconfig.yaml"
  verbosity: 3

# groups define a set of sources to include
groups:
  # a group named "default"
  - name: default
    # set a default context, that will be activated as soon as you switch to this group
    # note: the context has to be available within this group
    context: kind-dev
    # all sources referred by this group
    sources:
      - default

  # another group called local, that refers to local running clusters
  - name: local
    # set a default context, that will be activated as soon as you switch to this group
    # note: the context has to be available within this group
    context: kind-local
    sources:
      - local

  # another group called dev, that refers to a source called dev
  - name: dev
    sources:
      - local
      - dev

  # another group called prod, that refers to a source called prod
  - name: prod
    sources:
      - prod

# define all sources, that are used by groups
sources:
  # a source called local, that defines one include and one exclude glob
  - name: default
    include:
      - $HOME/.config/kontext/kubeconfig/**/*.yaml
    exclude:
      - $HOME/.config/kontext/kubeconfig/**/*prod*.yaml

  # a source called local, that defines one include and one no exclude glob
  - name: local
    include:
      - $HOME/.config/kontext/kubeconfig/local/**/*.yaml

  # a source called dev, that defines one include and one no exclude glob
  - name: dev
    include:
      - $HOME/.config/kontext/kubeconfig/dev/**/*.yaml
        
  # a source called prod, that defines one include and no exclude glob
  - name: prod
    include:
      - $HOME/.config/kontext/kubeconfig/prod/**/*.yaml
```

### Group

You can now start to use all the previously defined groups and their sources. Let's switch to the `dev` group:

```shell
kontext set group dev
```

After switching to the dev group lets list all kontexts:

```shell
kontext get context
```

We should see both, our local and the dev cluster, as we grouped them previously:

```shell
Active | Name       | Cluster    | AuthInfo
       | kind-dev   | kind-dev   | kind-dev
*      | kind-local | kind-local | kind-local
```

Let's add another cluster:

```shell
kind create cluster --name private --kubeconfig $HOME/.config/kontext/kubeconfig/local/private.yaml
```

Now lets reload the group and list all contexts again:

```shell
kontext reload
```

```shell
kontext get context
```

It should have extended the group to the new `kind-private` context:

```shell
Active | Name         | Cluster      | AuthInfo
       | kind-dev     | kind-dev     | kind-dev
*      | kind-local   | kind-local   | kind-local
       | kind-private | kind-private | kind-private
```

### Context

As we have three contexts available to work with, we can now start to switch between all of them by using one of 
three possible options:

```shell
# this will spawn an interactive shell
kontext
```

```shell
# this will spawn an interactive shell
# long form of just calling kontext
kontext set context
```

```shell
# this will immediately set the context to the given name
kontext set context kind-private
```

## Aliases

As it might be exhausting to always type the full commands, you can set some shortcuts for kontext,
that will speed up switching between clusters:

```shell
alias kx='kontext'
alias kxsg='kontext set group'
alias kxr='kontext reload'
alias kxg='kontext get context'
```

## Cleanup

Remove the kind clusters:

```shell
kind delete clusters local dev prod private
```

Delete all kontext configuration and kubeconfig files, you just created:

```shell
rm -r $HOME/.config/kontext
```

## Verdict

[Kontext](https://github.com/orbatschow/kontext) can be used to manage your kubeconfig files, split them into 
groups and sources and allows to switch between them very easily. It also allows for a better organisation 
within a well-defined directory structure.
