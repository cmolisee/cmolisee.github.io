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

| Name                                     | Link                   | Approx cost |
| ---------------------------------------- | ---------------------- | ----------- |
| 8GB Raspberry Pi 5                       | [Amazon][pi5]          | $90         |
| 5V Power Adapter                         | [Amazon][5vAdapter]    | $13         |
| 12V 3A Power Adapter                     | [Amazon][12v3aAdapter] | $10         |
| Active Cooler Heatsink                   | [Amazon][heatsink]     | $10         |
| <sup>1</sup>32GB MicroSD                 | [Amazon][microsd]      | $7          |
| <sup>2</sup>Radxa Penta Sata Hat         | [Amazon][satahat]      | $80         |
| 4x 1TB SSD                               | [Amazon][ssd]          | 4x $50      |
| 4 Pack Female-Male Sata Cable (Optional) | [Amazon][satacables]   | $10         |

> *<sup>1</sup>You may need to purchase an additional adapter so that you can flash the microsd from a usb port.*
> 
> *<sup>2</sup>Make sure you buy from the official Radxa vendor or go through Radxa. Otherwise you will need to also purchase additional cables, screws, and other hardware.*
{: .prompt-info }

> *The Heatsink and Sata Hat don't fit because the 12V DC connector. It is easiest to just take a pair of pliers and remove the last 3 fins of the heatsink that block it. Alternatively, you can get extra spacers for the hat but this will require some kind of extension cable for the 40 pin GPIO connector.*
{: .prompt-warning }

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
| Network Man  | netplan.io   | ifupdown                                                      | <span style="color:var(--clipboard-checked-color);">✓</span>  |
| SSH Server   | SSH          | DropBear                                                      | <span style="color:var(--clipboard-checked-color);">✓</span>  |
| SMB Server   | Samba        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Quota Man    | quota        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |

<sup><em>**Content from this table is from [OMV][omvPrerequisites]</em></sup>

So we have 4 SSD's which covers `DRIVE` and the 8GB pi 5 covers the rest of the hardware requirements. We have also identified a possible conflict with the `SSH Server` and `Network Man` services. There are some older forums that indicate that *Dropbear* and *SSH* are an issue but there is no indication on any recent documentation that it still is. Considering we will need the SSH Service to do a headless install of DietPi (because who owns a microHDMI anything anymore) and to install OMV - we are just going to let it ride and see how wrong or right we are later.

## Installing DietPi

### Step 1

 Go and install Balena Etcher program [here][balenaetcher].

### Step 2

Go and install the DietPi ISO image [here][dietpidownload].

### Step 3

Connect your MicroSD card, open Balen Etcher, and flash the MicroSD card with the DietPi image

You can now open and edit the files on the MicroSD you just flashed. The `/DietPi.txt` file contains configurations that you can alter before installation and first boot. There is plenty of forums and documentation with details on the ohher files. It is not required to edit any of them for this setup.

### Step 4

If you haven't already unboxed all the goodies, you are a psycho and should do it now. <sup>1</sup>Connect the heatsink to your RaspberryPi - it's easier to connect the cable and then punch down the heatsink, insert the MicroSD, plug in the 5v adapter to the wall and the pi, connect your ethernet cable into the RJ45 port, and finally turn it on!

> *<sup>1</sup>Do not forget to remove the last 3 fins from the heatsink so the sata hat can fit. Otherwise, make sure you are prepared with additional spacers and an extender for the 40 pin GPIO.*
{: .prompt-info }

### Step 5

Find the IP address by logging into your router or using one of the many open source IP scanning tools in the market. It will likely have a hostname of 'DietPi' because there are some nifty little scripts that run as soon as you turn on the pi.

### Step 6

 Get into your terminal and ssh into your pi. 

```bash
ssh root@your-ip-address
```

The default password should be 'dietpi'. Once you log in you get to just sit back and feel like hackerman. Scripts will run and when they are finished they will kick you out to reboot the pi.

### Step 7

After the pi has rebooted you can ssh back into the device and complete the install (*Make sure you write down any passwords you set!*). There are lots of options that you can step through - I simply did a minimal/basic install without adding anything extra.

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

> Another useful tip is to add the new account to the sudoers file so you do not have to enter your password or run `sudo` for everything.
>
> Run `sudo visudo` to open the sudoers file.
> 
> Add a copy of the line `<username> ALL=(ALL:ALL) NOPASSWD: ALL` underneath the root entry for user privilege specification.
{: .prompt-info }


## Additional Setup and Install of OMV

Unpack and install the sata hat hardware. This [documentation][satahatinstall] contains some useful pictures for how the hardware goes together.

### Step 1

Connect the hardware. Carefully connect the PCIe ribbon cable, screw in the columns, connect the hat on top while paying attention to the 40pin connector and secure top screws of the spacer columns. You can use the hardware to fasten your SSDs together or leave them apart. If you got the SATA Male-Female cables you can hook those up or connect the SSDs straight to the sata ports on the hat.

> *At this point you will want to swap out the 5V power supply on the pi5 for the 12V power supply connected to the SATA hat.*
{: .prompt-info }

### Step 2

We've already installed DietPi so now we need to just boot up the system and SSH in. Once in we need to configure the PCIe port:

_Option 1:_ 

```bash
#add 'dtparam=pciex1' to the end of this file
sudo nano /boot/firmware/config.txt
```

_`ctrl+o` to save and `ctrl+x` to exit_

> `sudo` is still required but entering your password is not, if you edited your profile in sudoers.
{: .prompt-info }

After editing the file you can reboot with `sudo reboot`.

### Step 3

After ssh-ing back into the pi run `lsblk` and you should see your drives listed. You can run the following to do a basic write test:

```bash
sudo dd if=/dev/zero of=/dev/sda bs=32M status=progress count=100 oflag=direct
```

> I was expecting around 100 MB/s but I was surprised to get 439 MB/s.
{: .prompt-info }

> Be careful running the `dd` command as it might overwrite memory. It should be safe to use it now because we don't have any memory on our new disks.
> {: .prompt-warning }

### Step 4

Edit the `/boot/firmware/config.txt` file one more time to enable gen3 for the pcie port. Use the same commands as before to add `dtparam=pciex1_gen=3` to the end of the file.

Once again you will `sudo reboot`. Reconnect via ssh after it restarts and try the speed test again.

```bash
sudo dd if=/dev/zero of=/dev/sda bs=32M status=progress count=100 oflag=direct
```

> Oh my cows - I am at 520 MB/s now. that's not bad at all!
{: .prompt-info }

_*MWah - chef's kiss_

## Installing OMV

Following this guide for the [OMV install][omvinstall].

### Update and Upgrade

```bash
sudo apt update
sudo apt upgrade
```

### Preinstall script

```bash
wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/preinstall | sudo bash
```

_Reboot when completed and/or prompted_

```bash
sudo reboot
```

> You may see an error like 'Failed to connect to bus: ...'. This is fine.
{: .prompt-info }

> After the system starts back up you can reconnect and verify the pre-install worked by
>
> ```bash
ls /etc/systemd/network/
#ensure 10-persistnet-etho0.link exists
cat /etc/systemd/network/10-persistent-eth0.link
#ensure Name=eth0 exists
```
{: .prompt-info }

### Full Install

Run the following, DO NOT interrupt it. The wiki says it could take up to 30 minutes - I am going to get some snacks.

```bash
wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/install | sudo bash
```

> You may have to call `sudo reboot` when finished. If so you could get some weird looking warnings and erros in yellow and red - this is fine. Be patient and it will restart. Give it an extra 3-5 minutes before trying to ssh in again!
{: .prompt-info }

## Logging in to OMV Web GUI and Initial Setup

To Be Continued...

<!-- Links -->
[pi5]: https://www.amazon.com/Raspberry-Pi-8GB-SC1112-Quad-core/dp/B0CK2FCG1K/ref=pd_ci_mcx_pspc_dp_2_t_2
[5vAdapter]: https://www.amazon.com/dp/B0CQ2DL2RW/ref=sspa_dk_detail_1
[12v3aAdapter]: https://www.amazon.com/Arkare-100V-240V-Security-Microphone-Receiver/dp/B0B51R6R2Y/ref=sr_1_1_sspa
[heatsink]: https://www.amazon.com/Raspberry-Pi-Active-Cooler/dp/B0CLXZBR5P?ref_=ast_sto_dp
[microsd]: https://www.amazon.com/PNY-Elite-microSDHC-Memory-P-SDU32GU185GW-GE/dp/B07R8GVGN9/ref=sr_1_3
[satahat]: https://www.amazon.com/Radxa-Penta-SATA-HAT-Raspberry/dp/B0DX1HQWB2/ref=sr_1_2
[ssd]: https://www.amazon.com/PNY-CS900-Internal-Solid-State/dp/B07Y5VDNT9/ref=sr_1_1_sspa
[satacables]: https://www.amazon.com/Longdex-Female-Power-Combo-Extension/dp/B084Q8L6GK

[dietpihome]: https://dietpi.com/
[dietPiInstallGuide]: https://dietpi.com/docs/install/
[dietpidownload]: https://dietpi.com/#downloadinfo
[radxasatahat]: https://docs.radxa.com/en/accessories/penta-sata-hat
[satahatinstall]: https://docs.radxa.com/en/accessories/penta-sata-hat/penta-for-rpi5
[omvPrerequisites]: https://docs.openmediavault.org/en/stable/prerequisites.html
[omvinstall]: https://wiki.omv-extras.org/doku.php?id=omv7:raspberry_pi_install#raspberry_pi_os_updates_and_upgrades

[balenaetcher]: https://etcher.balena.io/
