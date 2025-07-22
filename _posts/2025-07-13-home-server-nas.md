---
title: "Home Server: DIY Pi5 NAS - Part 1"
date: 2025-07-13 13:07:00 -0700
categories: [Home Server, Raspberry Pi]
tags: [homeserver, raspberrypi,nas, dietpi, omv]     # TAG names should always be lowercase
---

Network-Attached Storage (NAS) is not cheap and I never intended to include it in my Home Server until I stumbled upon the *Radxa Penta Sata Hat*. Long story short, this looks like fun and lower budget so lets give it a try.

> I did see other options like quad NVME M.2 hats via GeeekPi but decided to stick with the sata hat:
> * NVME is more expensive.
> * NVME uses more resources.
> * I am not convinced the performance will outweigh the cost.
{: .prompt-tip }

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

> *<sup>1</sup>You may need to purchase an additional adapter so that you can flash the MicroSD from a usb port.*
> 
> *<sup>2</sup>Make sure you buy from the official Radxa vendor or go through Radxa. Otherwise you will need to also purchase additional cables, screws, and other hardware.*
{: .prompt-info }

> *The Heatsink and Sata Hat don't fit because the 12V DC connector. Simplest solution is to remove the last 3 fins with pliers. Alternatively, you can get extra spacers and some kind of 40 pin GPIO extension cable.*
{: .prompt-warning }

## Selecting the Operating System and NAS Software

There are many options for an OS on the Raspberry Pi. I chose DietPi because of this guy Juan told me about it and he knows things. Their site and github are pretty informative and there is quite a bit of documentation and troubleshooting help within the communicaty and forums. 

[DietPi Website][dietpihome]

The options for choosing a NAS software had a little more variety and is a little less familiar.

* We could not use any service and manually setup and manage our NAS via tools like `mdadm` and `smb`.
* We could get a paid software UNRAID, QNAP, SYNOLOGY, etc....
* We could use an open source software like trueNAS, Rockstar, OMV, etc....

After some research I decided Open Media Vault (OMV) would best fit my goals. It seems to have a good balance between simplicity and complexity and there is a fairly large community behind it.

## Gathering Requirements and Specs

_**Content in the following tables is referenced from [OMV Prerequisites][omvPrerequisites]_

| Item  | supported      | Minimal | Best     | Recommendation                                |
| ----- | -------------- | ------- | -------- | --------------------------------------------- |
| DRIVE | SSD/HDD/USB…   | 1,any   | 2,HHD    | 2 disks: Seagate Firecuda, WD Black, IronWolf |
| RAM   | 1GiB+ any      | 1GiB    | 4Gig     | 8GiB+ dual channel DDR4/DDR3                  |
| NIC   | WiFi/Ether/USB | any     | 10Mb NIC | 1GiB NIC or 10Gb NICs: SFP fiber              |
| CPU   | arm,x86,x64    | 32bit   | 64bit    | Intel Dual Core, AMD Ryzen                    |


| Item | Software        | Minimal   | Best            | Recommendation                               |
| ---- | --------------- | --------- | --------------- | -------------------------------------------- |
| OS   | Debian Linux    | oldstable | stable          | Current stable (plus 1 month released)       |
| BOOT | BIOS,UBOOT,UEFI | BIOS,mbr  | BIOS,gpt        | Disable Secure boot, gpt table               |
| SDS  | HDD,SSD,USB…    | 1, 4GiB   | 2, 120+500GiB   | Disk drive with 120G root size, 8G swap size |
| DDS  | HDD,SSD,USB…    | 0 or any  | HHD,1 per share | One disk or part per shared resource         |
| NET  | LAN,WAN,SAN,VPN | LAN       | SAN,PAN,LAN     | Fiber IPv4, or at least cable LAN            |

<sup><em>**Additional content referenced from [DietPi Docs][dietpidocs]</em></sup>

| Service Type | OMV Service  | DietPi Service                                                | Possible Conflicts                                            |
| ------------ | ------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| HTTP Server  | nginx        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| HTTP System  | PHP          | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Display GUI  | lighdm,xdm.. | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Network Man  | netplan.io   | ifupdown                                                      | <span style="color:var(--clipboard-checked-color);">✓</span>  |
| SSH Server   | SSH          | DropBear                                                      | <span style="color:var(--clipboard-checked-color);">✓</span>  |
| SMB Server   | Samba        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |
| Quota Man    | quota        | <span style="color:var(--prompt-danger-icon-color);">✗</span> | <span style="color:var(--prompt-danger-icon-color);">✗</span> |


We seem to have all the hardware requirements covered from our list of parts. The table above highlights 2 possible software conflicts to be aware of:

* **dropbear** via DietPi seems to conflict with `SSH Server` requirements for OMV.
* **ifupdown** also potentially clashes with `Network Man` services in OMV.

I was not able to find any issues online, official or otherwise, between `ifupdown` and `netplan.io` so we are safe there. There is going to be a small issue with the `SSH Server` services. Luckily for you, the reader, I will go through the trial and error of resolving this and share with you the solution below. For now, lets focus on first steps.

## Installing DietPi

### Step 1

Download the DietPi ISO image and flash it to your MicroSD card.

* You can get the image from [here][dietpidownload].
* I use Balena Etcher to flash the image which can be downlaoded from [here][balenaetcher].

> After flashing you can explore the files. There are forums and articles that explain how you can edit some files to configure DietPi before installation (i.e. editing the `/DietPi.txt` file). I will create another post eventually that dives into this more.
{: .prompt-tip }

> If you do not have an ethernet cable you should enable wifi by editing the `/DietPi.txt` file
{: .prompt-tip }

> You should consider configuring a static IP address if your DHCP service does not reserve addresses. The default hostname should be `dietpi` but you can change that too if you want.
{: .prompt-tip }

### Step 2

With all your hardware unpacked and sufficiently admired - connect the <sup>1*</sup>Heatsink, insert the MicroSD card, plug in the power cable, and connect the ethernet cable. Take your time, don't break anything or hook it up backwards. Turn it on when everything is connected.

> *<sup>1</sup>Do not forget to remove the last 3 fins from the heatsink - which is much easier to do before attatching it to the Pi.* 
> 
> If you choose not to do that then you should be prepared with extra spacers and some kind of extender for the 40 pin GPIO connector.
{: .prompt-warning }

### Step 3

In a previous step you should have configured a static IP. If you did not do that you can find the IP by logging into your router or by using another IP scanning tool. 

> If your DHCP service does not set static IP's or it does not at least reserve IP's then you will likely have a different IP for this device every time you connect it.
{: .prompt-warning }

> If you aren't sure how to access your router you can always access it through the default gateway by going to `192.168.0.1` in your browser.
{: .prompt-tip }

With the IP address you can open a terminal and SSH into your device. You will be prompted for a password which should be `dietpi`, consult the DietPi documentation if it is not.

```bash
ssh root@<ip>
```

> If all else fails you can try `ssh root@diepi` using the same default password `dietpi`.
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

There are a lot of forums and articles that say you have to manually install `mdadm` and create the array manually, blah blah.... Don't do that. With OMV 7 i think they've resolved a lot of the past issues. If you do this manually you wont be able to manage anything from the OMV WebGUI which basically defeats the entire purpose of using OMV.

Instead we need to install the `MD` plugin from OMV and proceed within the OMV WebGUI. Go to System > Plugins > search for MD and you should see an entry in the list resembling `openmediavault-md` with a description containing the text `multiple devices` - install that. Once installed you should restart your system and then you should be able to see Multiple Devices under Storage. Click the plus icon in the top right to create a new RAID array using RAID 10 and select all your devices. It basically does the same thing you would've done manually except it handles the updating of the OMV database and other special files that you shouldn't be touching.

> It will likely create the array at /dev/md0 unless you have other stuff.
{: .prompt-tip }

After it completes you should restart. You can then verify it exists by doing some of the following:

```bash
lsblk
ls -la /dev/md0
sudo mdadm --details /dev/md0
sudo findmnt --verify
```

### Create Filesystem

Go to Storage > File System and you should now be able to create a file system using the RAID 10 array you created. If it doesn't show up you can try to manually refresh the database and then restart from your SSH session.

```bash
sudo omv-confdbadm populate
sudo systemctl reload openmediavault-engined
sudo shutdown -r now
```

### Add Shared Folder

Adding a shared folder here is as simple in the WebGUI. Go to Storage > Shared Folders and add a new folder to the file system we just created. Note that this folder is not actually shared until SMB is configured for it in all instances which we will cover next.

## Making the Share Folder Shareable

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

[balenaetcher]: https://etcher.balena.io/

[dietpihome]: https://dietpi.com/
[dietpidocs]: https://dietpi.com/docs/
[dietPiInstallGuide]: https://dietpi.com/docs/install/
[dietpidownload]: https://dietpi.com/#downloadinfo

[radxasatahat]: https://docs.radxa.com/en/accessories/penta-sata-hat
[satahatinstall]: https://docs.radxa.com/en/accessories/penta-sata-hat/penta-for-rpi5

[omvPrerequisites]: https://docs.openmediavault.org/en/stable/prerequisites.html
[omvinstall]: https://wiki.omv-extras.org/doku.php?id=omv7:raspberry_pi_install#raspberry_pi_os_updates_and_upgrades
