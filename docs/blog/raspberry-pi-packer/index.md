---
layout: article
title: Automate Raspberry Pi image creation with Hashicorp Packer
date: 03-26-2023
tags: Raspberry Pi, Packer
description: |
    Raspberry Pi's are still on a supply shortage, but let's be honest, they are still
    fun if you already own one, and you can still do amazing things with them. Creating an image
    for your Raspberry Pi can be tedious and time-consuming. This post will have a look at
    Hashicorp Packer and how it can be used to automate the creation of customized images for your
    Raspberry Pis.
---

# {{ $frontmatter.title }}

{{ $frontmatter.date }} • {{ $frontmatter.tags }}

{{ $frontmatter.description }}

## Prerequisite

### Hardware

In order to follow this post you need to own this hardware:

- [Raspberry Pi](https://www.raspberrypi.com/products)

### Software

We are going to use [HashiCorp Packer](https://www.packer.io/) to create the images.

```sh [yay]
$ yay -S packer
```

As Raspberry Pis follow the ARM architecture, we won't be able to build the image
on an x86 machine, without installing some qemu libraries, that allow us to do
cross compilation.

```sh [yay]
$ yay -S qemu-user-static qemu-user-static-binfmt
```

::: warning
Depending on your operating system you might need to change the installation commands.
:::

## Directory structure

As we will do a lot of customizations, we need some kind of directory structure, that
allows us to keep a structure, that will not be tedious when adding more and more
files. I went with this structure, but this can be changed at any time:

```shell
.
├── build.pkr.hcl
├── files
│   ├── boot
│   │   └── ssh
│   ├── etc
│   │   └── cloud
│   │       └── cloud.cfg.d
│   │           ├── 99_datasource.cfg
│   │           └── 99_user.cfg
│   └── usr
│       └── local
│           └── bin
│               └── install-cloud-init.sh
└── sources.pkr.hcl
```

## Configuration

### Image

Let's start with the `sources.pkr.hcl` file. This file will tell packer which base image should be used. I went with the
Raspberry Pi OS (64-bit) Lite image. You can find a list of all available images and their corresponding checksum
files within the official [sources](http://downloads.raspberrypi.org/raspios_lite_arm64/images/).

::: code-group
<<< @/blog/raspberry-pi-packer/code/sources.pkr.hcl
:::

::: warning
Depending on your operating system you might need to change the qemu binary paths.
:::

::: tip
You can also use other images, e.g. [Arch Linux ARM](https://archlinuxarm.org/), but keep
in mind, that you might need to change the partition layout.
:::

### Build

After we have defined our sources, we need to specify the build instructions for our image. This will be done
within the `build.pkr.hcl` file. Let's take a moment and think about what we want to achieve:

- configure a user
- enable SSH login by using a public key
- configure the network to use DHCP

All the tasks mentioned above can be done by using pure bash. But there are better solutions, e.g. 
[cloud-init](https://cloud-init.io/). The `build.pkr.hcl` file will therefore, install cloud-init,
and provide a cloud init configuration, that will allow us to use the image without changing the configuration
at all

::: code-group
<<< @/blog/raspberry-pi-packer/code/build.pkr.hcl
:::

### SSH

As seen in the `build.pkr.hcl`, a file called `/boot/ssh` with empty content will be created.
This will instruct Raspberry Pi OS (64-bit) Lite to allow incoming SSH connections.

::: danger
The file will be copied by packer and has to exist within the 
[directory structure](#directory-structure). The file also shall
not be empty, but contain a single empty line.
:::

### DHCP

Raspberry Pi OS (64-bit) Lite will automatically use DHCP, if you don't change
anything within your network configuration, so DHCP should work out of the box.

### cloud-init

<br>

#### User

As mentioned before, we can use cloud-init to set up the user. In order to do so, we need to create
an SSH key first:

```shell
ssh-keygen -t ed25519 -C "nils@orbat.sh" -f /tmp/packer
```

We can inspect our generated public SSH key with:

```shell
cat /tmp/packer/packer.pub
```

The output should be something like:

```shell
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJLPHJkPwMIJ+TZuCzfqWYobOGkinHbOzygKa5kQFzvO nils@orbat.sh
```

After we have prepared the SSH key, we can create the new user configuration for our image:

::: code-group
<<< @/blog/raspberry-pi-packer/code/files/etc/cloud/cloud.cfg.d/99_user.cfg{yaml}
:::

::: danger
Remember to change your SSH key within the `99_user.cfg` file and only use your public key!
:::

#### Datasource

The datasource within cloud-init is usually used to determine metadata for a cloud provider.
As we do bare metal provisioning here, and we don't manage a cloud metadata server we need to 
create a file called `99_datasource.cfg`, that will specify the `NoCloud` property.

::: code-group
<<< @/blog/raspberry-pi-packer/code/files/etc/cloud/cloud.cfg.d/99_datasource.cfg{yaml}
:::


## Packer

Now, that the whole configuration is done, we can finally build the desired image.
In order to do we need to have a running installation of [Docker](https://www.docker.com/).

```shell
docker run --rm --privileged -v /dev:/dev -v $PWD:/build mkaczanowski/packer-builder-arm:1.0.2 build .
```

This will generate an image, that can be flashed onto a micro sd card:

The command mentioned above will use [packer-builder-arm](https://github.com/mkaczanowski/packer-builder-arm),
an opens-source project, that will stich all the pieces together and instruct packer to build the image. Have
a look at their documentation and examples for deeper insights.

::: tip
Usually you can use a `plugins.pkr.hcl` file within your packer directory and packer will automatically download
and configure all specified plugins. The plugin we're using does not fulfill some requirements for this to work.
There is already an open [issue](https://github.com/mkaczanowski/packer-builder-arm/issues/100) on GitHub and I 
will update this post, if this gets resolved.
:::


```shell
dd if=2022-09-26-raspios-bullseye-arm64-lite.img of=/dev/sdX bs=64k oflag=dsync status=progress
```

### Debugging

You can check if all files were copied correctly by creating a loopback device:

```shell
udisksctl loop-setup --file 2022-09-26-raspios-bullseye-arm64-lite.img
```

After this, we can mount both of our partitions:

```shell
mkdir -p /tmp/rpi/{boot,root}
mount /dev/loop0p1 /tmp/rpi/boot
mount /dev/loop0p2 /tmp/rpi/root
```

Check the contents of the directories:

```shell
nilsorbat in /tmp/rpi/boot 🔒
[I] ➜  ll
drwxr-xr-x    - root 22 Sep  2022 overlays
.rwxr-xr-x  30k root 30 Aug  2022 bcm2710-rpi-2-b.dtb
.rwxr-xr-x  32k root 30 Aug  2022 bcm2710-rpi-3-b-plus.dtb
.rwxr-xr-x  32k root 30 Aug  2022 bcm2710-rpi-3-b.dtb
.rwxr-xr-x  30k root 30 Aug  2022 bcm2710-rpi-cm3.dtb
.rwxr-xr-x  31k root 30 Aug  2022 bcm2710-rpi-zero-2-w.dtb
.rwxr-xr-x  31k root 30 Aug  2022 bcm2710-rpi-zero-2.dtb
.rwxr-xr-x  52k root 30 Aug  2022 bcm2711-rpi-4-b.dtb
.rwxr-xr-x  52k root 30 Aug  2022 bcm2711-rpi-400.dtb
.rwxr-xr-x  53k root 30 Aug  2022 bcm2711-rpi-cm4.dtb
.rwxr-xr-x  50k root 30 Aug  2022 bcm2711-rpi-cm4s.dtb
.rwxr-xr-x  52k root 30 Aug  2022 bootcode.bin
.rwxr-xr-x  154 root 22 Sep  2022 cmdline.txt
.rwxr-xr-x 2.1k root 22 Sep  2022 config.txt
.rwxr-xr-x  19k root 30 Aug  2022 COPYING.linux
.rwxr-xr-x 7.3k root 30 Aug  2022 fixup.dat
.rwxr-xr-x 5.4k root 30 Aug  2022 fixup4.dat
.rwxr-xr-x 3.2k root 30 Aug  2022 fixup4cd.dat
.rwxr-xr-x 8.4k root 30 Aug  2022 fixup4db.dat
.rwxr-xr-x 8.4k root 30 Aug  2022 fixup4x.dat
.rwxr-xr-x 3.2k root 30 Aug  2022 fixup_cd.dat
.rwxr-xr-x  10k root 30 Aug  2022 fixup_db.dat
.rwxr-xr-x  10k root 30 Aug  2022 fixup_x.dat
.rwxr-xr-x  145 root 22 Sep  2022 issue.txt
.rwxr-xr-x 8.2M root 30 Aug  2022 kernel8.img
.rwxr-xr-x 1.6k root 30 Aug  2022 LICENCE.broadcom
.rwxr-xr-x    0 root 28 Mar 13:37 meta-data
.rwxr-xr-x    0 root 28 Mar 13:37 ssh
.rwxr-xr-x 3.0M root 30 Aug  2022 start.elf
.rwxr-xr-x 2.2M root 30 Aug  2022 start4.elf
.rwxr-xr-x 804k root 30 Aug  2022 start4cd.elf
.rwxr-xr-x 3.7M root 30 Aug  2022 start4db.elf
.rwxr-xr-x 3.0M root 30 Aug  2022 start4x.elf
.rwxr-xr-x 804k root 30 Aug  2022 start_cd.elf
.rwxr-xr-x 4.8M root 30 Aug  2022 start_db.elf
.rwxr-xr-x 3.7M root 30 Aug  2022 start_x.elf
.rwxr-xr-x    0 root 28 Mar 13:37 user-data
```

```shell
nilsorbat in /tmp/rpi/root 🔒
[I] ➜  ls -l
total 76
lrwxrwxrwx  1 root root     7 Sep 22  2022 bin -> usr/bin/
drwxr-xr-x  2 root root  4096 Sep 22  2022 boot/
drwxr-xr-x  4 root root  4096 Sep 22  2022 dev/
drwxr-xr-x 82 root root  4096 Mar 28 13:37 etc/
drwxr-xr-x  3 root root  4096 Sep 22  2022 home/
lrwxrwxrwx  1 root root     7 Sep 22  2022 lib -> usr/lib/
drwx------  2 root root 16384 Sep 22  2022 lost+found/
drwxr-xr-x  2 root root  4096 Sep 22  2022 media/
drwxr-xr-x  2 root root  4096 Sep 22  2022 mnt/
drwxr-xr-x  2 root root  4096 Sep 22  2022 opt/
drwxr-xr-x  2 root root  4096 Sep  3  2022 proc/
drwx------  2 root root  4096 Sep 22  2022 root/
drwxr-xr-x  6 root root  4096 Sep 22  2022 run/
lrwxrwxrwx  1 root root     8 Sep 22  2022 sbin -> usr/sbin/
drwxr-xr-x  2 root root  4096 Sep 22  2022 srv/
drwxr-xr-x  2 root root  4096 Sep  3  2022 sys/
drwxrwxrwt  2 root root  4096 Mar 28 13:37 tmp/
drwxr-xr-x 11 root root  4096 Sep 22  2022 usr/
drwxr-xr-x 11 root root  4096 Sep 22  2022 var/
```

## Verdict

By using Packer you can fully automate and customize Raspberry Pi image creation,
so let the mass production begin.

![Mass production](factory.jpg)