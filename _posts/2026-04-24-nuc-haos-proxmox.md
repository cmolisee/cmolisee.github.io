---
layout: blog
title: "NUC, Home Assistant, and Proxmox"
date: 2026-04-24
author: Cody M.
read_time: 3
tags:
  - home assistant
  - proxmox
---

As a tech person I cannot own a home and not have some kind of home automation. My guide here is a review of the

process that I specifically used. I have a life so I referenced the technologies documentation but also a variety of

blogs and other guides:

- [Home Assistant: Proxmox VE 8.4 Quick Start Guide][derek-seaman-proxmox-guid]
- [Home Assistant Installation][home-assistant-installation]
- [Proxmox Forum][proxmox-forum]
- [Beelink NUC Product Page][beelink-nuc-product-page]

## The NUC

A NUC is essentially just a tiny PC. There are all sorts of NUCs on the market for all different purposes. A while

ago I opted in for a Beelink NUC as it was cost effective and met my requirements for performance. Most of the

community seems to recommend used dell OptiPlex or similar - the problem is that all these forums and communities are

advertising them and they can be challenging to find.

## Step 1: Proxmox

Proxmox is open source. It provides a lot of customization and we can virtualize/containerize anyting we want (e.g. HAOS,

Jellyfin, PiHole, etc...). We can also infer from their download page and their products other interesting use cases. For this

project our first step will be research and checking compatibility. At this time HAOS is on version - this is

also where we will start [Proxmox Downloads][proxmox-downloads].

- HA community says that proxmox 9.1 is supported.
- Proxmox community also says the ttek script supports HAOS. There are also documented workarounds for possible issues on install.

### ISO Image

_Before you start it is best to connect to internet via ethernet_

1. Get the [Proxmox 9.1 ISO image][proxmox-downloads]
2. Download/Install [Balena Etcher][balena-etcher]
3. Flash a USB with the ISO image
4. Go to your PC's BIOS and do the following
   - Enable virtualization
   - Enable Intel VT-d
   - Enable UEFI boot
   - Enable secure boot
   - Enable auto-power (see PC documentation for this)
   - Disable any PCIe power management
   - Set USB media to the top of the boot order

5. Save BIOS, run the install, follow directions

### Update to Proxmox 9.1

_Before you start it is best to connect to internet via ethernet_

If you already have proxmox installed you can upgrade with the [8 to 9][proxmox-8-9-migration] guide. I will be doing an in place upgrade

following the migration guide. If things don't go well we can always go scorched earth and fresh install.

## Step 2: Proxmox Post-Install

There are a handful of things to do after install. Some are optional but consider all.

### Post Install Script

With your NUC connecected to the network still, access proxmox in your browser via your NUC's IP a

### Setup SSH

First validate that SSH is enabled from your Proxmox shell:

1. Check verify SSH `sudo systemctl status ssh`
2. Install SSH as needed `sudo apt update && sudo apt install -y openssh-server`
3. Enable SSH as needed `sudo systemctl enable --now ssh`

**Option 1**: Connect to the NUC from another computer via the CMD. You need the NUC's IP address which is hopefully reserved or static.

You will also need root credentials unless you've configured other credentials.

`ssh root@YOUR_PROXMOX_IP`

**Option 2 (better)**: Setup an SSH key. From any PC you will use to SSH into the NUC, open the CMD and generate

an SSH key `ssh-keygen -t ed25519 -C "your_email@example.com"`.

Next add the key to the NUC directly or you can copy it and add it manually `ssh-copy-id -i ~/.ssh/id_rsa.pub root@YOUR_PROXMOX_IP`

or `cat ~/.ssh/id_rsa.pub | clip`.

This is your first blog post. Edit or delete it, then start writing your own content in the `_posts/` directory.

Posts are named using the format `YYYY-MM-DD-title.md` and automatically picked up by Jekyll.

## Front matter

Each post supports the following front matter fields:

| Field       | Required | Description                    |
| ----------- | -------- | ------------------------------ |
| `layout`    | Yes      | Always `blog` for posts        |
| `title`     | Yes      | Post title                     |
| `date`      | Yes      | Publication date               |
| `author`    | No       | Author name                    |
| `read_time` | No       | Estimated read time in minutes |
| `tags`      | No       | Array of tag strings           |
| `image`     | No       | Path to hero image             |
| `image_alt` | No       | Alt text for hero image        |

## Writing content

Use standard Markdown — headings, lists, code blocks, images, links — all styled
through the `@tailwindcss/typography` plugin.

```ruby
# Code blocks are syntax-highlighted via Rouge
def hello
  puts "Hello, world!"
end
```

Happy writing!

[derek-seaman-proxmox-guid]: https://www.derekseaman.com/2023/10/home-assistant-proxmox-ve-8-0-quick-start-guide-2.html
[proxmox-forum]: https://forum.proxmox.com/
[home-assistant-installation]: https://www.home-assistant.io/installation/
[beelink-nuc-product-page]: https://www.bee-link.com/collections/product
[proxmox-downloads]: https://www.proxmox.com/en/downloads
[balena-etcher]: https://www.balena.io/etcher#download-etcher
[proxmox-8-9-migration]: https://pve.proxmox.com/wiki/Upgrade_from_8_to_9
