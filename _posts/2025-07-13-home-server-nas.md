---
title: "Home Server: DIY Pi5 NAS - Part 1"
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

I work with this guy - Juan. He is great and, in his greatness, educated me about DietPi - a minimzed OS for Raspberry Pi. There site is pretty cool ([DietPi][dietpihome]) and it has some good information to get started. But before progressing too far, as with any well executed project, we need to do some research and planning. 

After skimming through several articles, forms, and official documentation pages I found there are several options for managing NAS:

1. Manually configure the drives and setup a file share services like SAMBA.
2. Use an open source software like trueNAS, Rockstar, OMV or similar.

I decided to go with Open Media Vault (OMV) as it seemed to bridge the gap between simplicity and complexity. Knowing now what we will use we can diagram and tabularize some useful data.

Starting with OMV ([Open Media Vault][omvPrerequisites]):

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

Having gathered information on hardware and software requirements we need to take inventory of what we have and then observe reality and risk:

* we have 2 SSD's covering `DRIVE` hardware requirements.
* We have an 8GB Pi5 coverign the other hardware requirements.
* **dropbear** via DietPi seems to conflict with `SSH Server` requirements for OMV.
* **ifupdown** also potentially clashes with `Network Man` services in OMV.

After consulting the forums there does not seem to be any problems with _ifupdown_. However, _dropbear_ does seem to have some issues for some users. Unfortunately, all the chatter is a little outdated so we will proceed and I will leave little notes at the top of the following sections as needed.

## Installing DietPi

### Step 1

Download the DietPi ISO image and flash it to your MicroSD card. You can get the image from [here][dietpidownload]. I use Balena Etcher to to flash the image which can be downlaoded from [here][balenaetcher].

Connect your MicroSD to your PC and flash away!

> After flashing you can explore the files. There are forums and articles that explain how you can edit some files to configure DietPi before installation (i.e. editing the `/DietPi.txt` file). I will create another post eventually that dives into this more.
{: .prompt-tip }

> If you do not have an ethernet cable you should enable wifi by editing the `/DietPi.txt` file
{: .prompt-tip }

> You should consider configuring a static IP address if your DHCP service does not reserve addresses. The default hostname should be `dietpi` but you can change that too if you want.
{: .prompt-tip }

### Step 2

By now you should have already opend up all your hardware and sufficiently admired it - if you haven't do so now. 

All we have to do for installing the OS is to install the <sup>1*</sup>Heatsink, insert the MicroSD card, plug in the power cable, and connect the ethernet cable. Once you've done all that you can turn it on!

> *<sup>1</sup>Do not forget to remove the last 3 fins from the heatsink - which is much easier to do before attatching it to the Pi.* 
> 
> If you choose not to do that then you should be prepared with extra spacers and some kind of extender for the 40 pin GPIO connector.
{: .prompt-warning }

### Step 3

Using the static IP address you set earlier (<sup>1</sup>or retrieving it by logging into your router) you should be able to SSH into your Pi.

```bash
ssh root@<ip>
```

_The default passwor is `dietpi`._

> If you aren't sure how to access your router you can always access it through the default gateway by going to `192.168.0.1` in your browser.
{: .prompt-tip }

> If all else fails you can try `ssh root@diepi`.
{: .prompt-tip }

### Step 4

You should see a preinstall script immediately running - do not interupt it. After its done it will reboot the Pi and kick you out of your SSH session, simply log back in after it reboots. At this point it should walk you through a full install. Be sure to recored your passwords and don't worry too much if you make a mistake as you can probably just reconfigure it later. I opted for a basic/minimal install.

## Post-installation

When you finish the installation you should pretend to be a good admin and immediately secure the system.

1. Change default passwords if you have not already done so.
2. Consider running `dietpi-config` and `dietpi-software`.
3. Consider new user other than `root` and disabling any predefined users you will not need.

I will create a documentation page that has useful commands for this debian based OS. When it is readable I will update and post it here.


## OMV Preinstallation

Unpack and install the sata hat hardware and SSDs. This [documentation][satahatinstall] contains some useful pictures for how the hardware goes together. You can store your 5v power adapter and use the 12v adapter directly on the sata hat. Be sure to plug the ethernet back in.

> OMV will install **SSH** which attempt to use port 22. This is the same port that **DropBear** is currently using.
>
> Change the default port for **Dropbear** to port 2222 with `sudo nano /etc/default/dropbear`. Restart the service with `sudo systemctl restart dropbear` (You can additionally restart the Pi with `sudo shutdown -r now`).
{: .prompt-warning }

> If you changed the port as described above you now have to specify the port when SSH into the pi:
>
> `ssh <root|<username>>@<ip address> -p 2222`
{: .prompt-info }

### Step 1

SSH into the Pi after all the hardware is connected and we can configure the PCIe port.

```bash
#add 'dtparam=pciex1' to the end of this file
sudo nano /boot/firmware/config.txt
```

After editing the file you can reboot with `sudo reboot`. After it is back online SSH back in and run `lsblk` to confirm the drives are listed (i.e. /dev/sda, /dev/sdb, /dev/sdc, /dev/sdd).

### Step 3

(Optional) Run a speed test before configuring PCIe Gen 3:

> The `dd` command can possibly overwrite memory. If there is already data on your drives you should move the files elsewhere.
{: .prompt-warning }

```bash
sudo dd if=/dev/zero of=/dev/sda bs=32M status=progress count=100 oflag=direct
```

> I was expecting around 100 MB/s based on the forums but I was surprised to get 439 MB/s.
{: .prompt-info }

Now configure Gen 3 by editing the config file once more

```bash
#add 'dtparam=pciex1_gen=3' to the end of this file
sudo nano /boot/firmware/config.txt
```

Reboot the system and rerun the speed test again:

```bash
sudo dd if=/dev/zero of=/dev/sda bs=32M status=progress count=100 oflag=direct
```

> Oh my cows - I am at 520 MB/s now!
{: .prompt-info }

You are now ready to install OMV.

## Installing OMV

The following steps are well documented in a lot of different places:

### Update and Upgrade

```bash
sudo apt update && apt upgrade
```

### Preinstall script

```bash
wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/preinstall | sudo bash
```

Reboot the Pi with `sudo shutdown -r now` and reconnect. Before proceeding we should verify the preinstall worked:

```bash
#ensure 10-persistnet-etho0.link exists
ls /etc/systemd/network/
#ensure Name=eth0 exists
cat /etc/systemd/network/10-persistent-eth0.link
```

### Full Install

Run the following and DO NOT interrupt it. This could take some time...

```bash
wget -O - https://github.com/OpenMediaVault-Plugin-Developers/installScript/raw/master/install | sudo bash
```

There might be some errors but before moving forward we should `sudo reboot` and then reconnect.

## Handling Errors

When I installed I received the following:

> [ERROR   ] Unable to compare desired timezone 'set_timezone' to system timezone: Can't find a local timezone "set_timezone"
> [ERROR   ] Command '/usr/bin/systemd-run' failed with return code: 1
> [ERROR   ] stderr: Running scope as unit: run-r5c87ade93a39451db2add93237ba68a4.scope
> Job for ssh.service failed because the control process exited with error code.
> See "systemctl status ssh.service" and "journalctl -xeu ssh.service" for details.
> [ERROR   ] retcode: 1
> [ERROR   ] Job for ssh.service failed because the control process exited with error code.
> See "systemctl status ssh.service" and "journalctl -xeu ssh.service" for details.

> The SSH error is likely because I did this install without changing the default **DropBear** port to 2222. If you did that already you might not see this warning.
{: .prompt-info }

Now if you try `sudo systemd-journl -xe` you will get a lot of text that seems to just repeat and it will probably have some errors in there like:

>$ sudo systemctl restart sshd.service
> Job for ssh.service failed because the control process exited with error code.
> See "systemctl status ssh.service" and "journalctl -xeu ssh.service" for details.
>
> 'nginx' failed to start (exit status 1) -- '/bin/systemctl start nginx': Job for nginx.service > failed because the control process exited with error code.
> See "systemctl status nginx.service" and "journalctl -xeu nginx.service" for details.

`nginx` is the service that basically runs our WebGUI for OMV. If you were following other installations you might have tried to access the WebGUI but it kept failing - it's because nginx is not running. What I did here was:

1. Check the installed services to see if they are running `sudo systemctl status sshd`, `sudo systemctl status nginx`, etc...
2. I started by changing the default port for **DropBear** and restarted the service with `sudo systemctl start sshd` and it worked.
3. I ignored the timezone crap because that will probably resolve itself once everything else is fixed.
4. Finally, I found some forums that had similar nginx issues. Long story short, the install was interrupted and we need to manually add some files:

```bash
sudo mkdir /var/log/nginx
sudo touch /var/log/nginx/error.log
sudo chown 222-data:adm -R /var/log/nginx
```

Now restart nginx with `sudo systemctl start nginx` and you should now be able to access the WebGUI.

## OMV Login and setup

Access OMV WebGUI via https://<ip address> in your browser bar. Login with 'admin' as the username and 'openmediavault' as the password.

### Reset default password

Change the admin password and write it down. You can do this by clicking the account icon in the top-right and following the 'change password' instructions. 

You can also do this via SSH by typing `sudo omv-firstaid` and select 'Change Workbench administrator password'.

### Add Widgets to the dashboard

Go to the User Settings top-right > select Dashboard > check any boxes you want.

### Clean you disks

Go to Storage > Disks > For each disk click on it and then select the eraser icon in the top-left > Choose quick (Secure will take 500 years).

### Setup RAID 10

I decied to go with RAID 10 for the best combination of safety and performance. To start you need to install `mdadm`:

```bash
sudo apt-get update && sudo apt-get install mdadm
```

Run `lsblk` to see the name of all your drives then run the following to configure RAID 10 array:

```bash
sudo mdadm --create --verbose /dev/md0 --level=10 --raid-devices=4 /dev/sd[a-d]
```

> update `/dev/sd[a-d]` to reflect the name of your drives.
{: .prompt-info }

This will take some time. You can run `sudo watch -n 1 -d cat /proc/mdstat` to see real time progress on the creation of the array.




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
