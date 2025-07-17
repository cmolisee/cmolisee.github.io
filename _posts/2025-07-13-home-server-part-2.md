---
title: "Home Server: DIY Raspberry Pi 5 NAS"
date: 2025-07-13 13:07:00 -0700
categories: [Home Server, Raspberry Pi]
tags: [homeserver, raspberrypi,nas, dietpi, omv]     # TAG names should always be lowercase
---

Knowing that a NAS (Network-Attached Storage) is not cheap, I never intended to include it in my Home Server MVP. That is until I stumbled upon the *Radxa Penta Sata Hat*. Long story short, we are definitely adding a budget DIY NAS to our Home Server MVP.  

Before we get started I have to say I also discovered the quad NVME M.2 hats via GeeekPi but ultimately decided to go with the SATA hat for the following reasons:

  - NVME is more expensive.
  - NVME uses more energy and therefore more heat.
  - I am not convinced that the performance gains will end up outweighing the cost.

At the end of the day my primary motivations are budget and fun so here we go.

## Hardware

| Name                                     | Link                 | Approx cost |
| ---------------------------------------- | -------------------- | ----------- |
| 8GB Raspberry Pi 5                       | [Amazon][pi5]        | $90         |
| 5V Power Adapter                         | [Amazon][5vAdapter]  | $13         |
| Active Cooler Heatsink                   | [Amazon][heatsink]   | $10         |
| <sup>1</sup>32GB MicroSD                 | [Amazon][microsd]    | $7          |
| <sup>2</sup>Radxa Penta Sata Hat         | [Amazon][satahat]    | $80         |
| 4x 1TB SSD                               | [Amazon][ssd]        | 4x $50      |
| 4 Pack Female-Male Sata Cable (Optional) | [Amazon][satacables] | $10         |
| 20x4 LCD Module (Optional)               | [Amazon][lcdmodule]  | $10         |

> *<sup>1</sup>You may need to purchase an additional adapter so that you can flash the microsd from a usb port.*
> 
> *<sup>2</sup>Make sure you buy from the official Radxa vendor or go through Radxa. Otherwise you will need to also purchase additional cables, screws, and other hardware.*
{: .prompt-info }

## Selecting the Operating System and NAS Software

I work with this guy - Juan. He is great and in his greatness told me about this cool minimized Raspberry Pi OS called DietPi. There site is pretty cool ([DietPi][dietpihome]) and it has mostly all the information you need for this. Before we get too far along, as with any well executed project, we need to do a little research and make sure we know what to expect. 

After spending some time researching all the different open source NAS softwares in the market like trueNAS, Rockstar, OMV, even just straight up proxmox with ZFS; I ultimately went with OMV as it seemed to highlight features that vibed with me the best - not too complex, still feature rich, well documented, etc.... Finally, we can compare requirements, hardware, and services to determine if there are any gaps or concerns in our plan.

Looking at OMV ([Open Media Vault][omvPrerequisites]), it is a quick skim of the install guide to find requirements:

| Item  | supported      | Minimal | Best     | Recommendation                                |
| ----- | -------------- | ------- | -------- | --------------------------------------------- |
| DRIVE | SSD/HDD/USB…   | 1,any   | 2,HHD    | 2 disks: Seagate Firecuda, WD Black, IronWolf |
| RAM   | 1GiB+ any      | 1GiB    | 4Gig     | 8GiB+ dual channel DDR4/DDR3                  |
| NIC   | WiFi/Ether/USB | any     | 10Mb NIC | 1GiB NIC or 10Gb NICs: SFP fiber              |
| CPU   | arm,x86,x64    | 32bit   | 64bit    | Intel Dual Core, AMD Ryzen                    |

<sup><em>**Content from this table is from [OMV][omvPrerequisites]</em></sup>

| Item | Software        | Minimal   | Best            | Recommendation                               |
| ---- | --------------- | --------- | --------------- | -------------------------------------------- |
| OS   | Debian Linux    | oldstable | stable          | Current stable (plus 1 month released)       |
| BOOT | BIOS,UBOOT,UEFI | BIOS,mbr  | BIOS,gpt        | Disable Secure boot, gpt table               |
| SDS  | HDD,SSD,USB…    | 1, 4GiB   | 2, 120+500GiB   | Disk drive with 120G root size, 8G swap size |
| DDS  | HDD,SSD,USB…    | 0 or any  | HHD,1 per share | One disk or part per shared resource         |
| NET  | LAN,WAN,SAN,VPN | LAN       | SAN,PAN,LAN     | Fiber IPv4, or at least cable LAN            |

<sup><em>**Content from this table is from [OMV][omvPrerequisites]</em></sup>

| Service Type | OMV Service  | DietPi Service                                                | Possible Conflicts                                            |
| ------------ | ------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| HTTP Server  | nginx        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| HTTP System  | PHP          | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Display GUI  | lighdm,xdm.. | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Network Man  | netplan.io   | ifupdown                                                      | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| SSH Server   | SSH          | DropBear                                                      | <span style="color:var(--clipboard-checked-color);">✓</span>  |
| SMB Server   | Samba        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Quota Man    | quota        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |

<sup><em>**Content from this table is from [OMV][omvPrerequisites]</em></sup>

So we have 4 SSD's which covers `DRIVE` and the 8GB pi 5 covers the rest of the hardware requirements. We have also identified a possible conflict with the `SSH Server` services. There are some older forums and posts that say you have to disable *DropBear* but there is also some newer content that has indicated we can just install without any adjustement. Considering we will need the SSH Service to do a headless install of DietPi (because who owns a microHDMI anything anymore) I'm just going to let it ride and see how wrong or right I am later.

*Note: I saw no conflicts or issues with ifupdown and netplan.io in any of the forums and articles I read through so we are also treating that as a non-issue until it is.*

## Installing DietPi

**Step 1:** Go and install Balena Etcher program [here][balenaetcher].

**Step 2:** Go and install the DietPi ISO image [here][dietpidownload].

**Step 3:** Connect your MicroSD card, open Balen Etcher, and flash the MicroSD card with the DietPi image

At this point you can actually open the files that you flashed to the MicroSD in your file explorer. The `/DietPi.txt` file contains configurations that you can alter before installation and first boot. Go through this just to be familiar with it and to make any edits you see fit. There are a bunch of other files but you'll have to do your own research on those because I didn't touch them.

**Step 4:** If you haven't already unboxed all the goodies, do it now you psycho. Connect the heatsink to your RaspberryPi - it's easier to connect the cable and then punch down the heatsink, insert the MicroSD, plug in the 5v adapter to the wall and the pi, connect your ethernet cable into the RJ45 port, and finally turn it on!

**Step 5:** Find the IP address by logging into your router or using one of the many open source IP scanning tools in the market. It will likely have a hostname of 'DietPi' because there are some nifty little scripts that run as soon as you turn on the pi.

**Step 6:** Get into your terminal and ssh into your pi. 

```bash
ssh root@your-ip-address
```

The default password should be 'dietpi'. Once you log in you get to just sit back and feel like hackerman. Scripts will run and when they are finished they will kick you out to reboot the pi.

**Step 7:** After the pi has rebooted you can ssh back into the device and complete the install (*Make sure you write down any passwords you set!*). There are lots of options that you can step through - I simply did a minimal/basic install without adding anything extra.

## Post DietPi installation

When you install DietPi there are 2 default accounts: 'DietPi' and 'root'. You have ssh'd into 'root' already but it is probably worth creating yourself an account with sudo access and disabling or deleting the 'DietPi' account. Below are some commands you can use to manage accounts:

**Show a list of all user accounts:**
```bash
cat /etc/psswd
```

**Add a new user:**
```bash
adduser <username>
```

**Get entries for the specified database:**
_This will show a list with the following info: username:userId:groupId_
```bash
getent group
```

**To lock a user account:**
```bash
sudo usermod --lock <username>
```

**To unlock a user account:**
```bash
sudo usermod --unlock <username>
```

**Switch accounts:**
```bash
su <username>
```

## Additional Setup and Install of OMV

Unpack and install the sata hat hardware - you can use this [documentation][satahatinstall] with pictures if you like.

<!-- Links -->
[pi5]: https://www.amazon.com/Raspberry-Pi-8GB-SC1112-Quad-core/dp/B0CK2FCG1K/ref=pd_ci_mcx_pspc_dp_2_t_2
[5vAdapter]: https://www.amazon.com/dp/B0CQ2DL2RW/ref=sspa_dk_detail_1
[heatsink]: https://www.amazon.com/Raspberry-Pi-Active-Cooler/dp/B0CLXZBR5P?ref_=ast_sto_dp
[microsd]: https://www.amazon.com/PNY-Elite-microSDHC-Memory-P-SDU32GU185GW-GE/dp/B07R8GVGN9/ref=sr_1_3
[satahat]: https://www.amazon.com/Radxa-Penta-SATA-HAT-Raspberry/dp/B0DX1HQWB2/ref=sr_1_2
[ssd]: https://www.amazon.com/PNY-CS900-Internal-Solid-State/dp/B07Y5VDNT9/ref=sr_1_1_sspa
[satacables]: https://www.amazon.com/Longdex-Female-Power-Combo-Extension/dp/B084Q8L6GK
[lcdmodule]: https://www.amazon.com/GeeekPi-Interface-Adapter-Backlight-Raspberry/dp/B07QLRD3TM

[dietpihome]: https://dietpi.com/
[dietPiInstallGuide]: https://dietpi.com/docs/install/
[dietpidownload]: https://dietpi.com/#downloadinfo
[radxasatahat]: https://docs.radxa.com/en/accessories/penta-sata-hat
[satahatinstall]: https://docs.radxa.com/en/accessories/penta-sata-hat/penta-for-rpi5
[omvPrerequisites]: https://docs.openmediavault.org/en/stable/prerequisites.html

[balenaetcher]: https://etcher.balena.io/
