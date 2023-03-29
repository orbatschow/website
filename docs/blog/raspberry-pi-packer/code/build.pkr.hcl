build {

  # specify the build source image
  sources = [
    "source.arm.raspios_bullseye_arm64"
  ]

  # install and start cloud init
  provisioner "shell" {
    scripts = [
      "files/usr/local/bin/install-cloud-init.sh"
    ]
  }

  # configure cloud init (datasource)
  provisioner "file" {
    source = "files/etc/cloud/cloud.cfg.d/99_datasource.cfg"
    destination = "/etc/cloud/cloud.cfg.d/99_datasource.cfg"
  }

  # configure cloud init (users)
  provisioner "file" {
    source = "files/etc/cloud/cloud.cfg.d/99_user.cfg"
    destination = "/etc/cloud/cloud.cfg.d/99_user.cfg"
  }

  # set hostname via dhcp
  provisioner "shell" {
    inline = ["echo 'localhost' > /etc/hostname"]
  }

  # disable file system resize, this is already done by packer
  provisioner "shell" {
    inline = ["rm /etc/init.d/resize2fs_once"]
  }

  # disable the customization dialog, that raspberry pi os will show at boot
  provisioner "shell" {
    inline = ["rm /usr/lib/systemd/system/userconfig.service"]
  }

  # enable ssh access
  provisioner "file" {
    source = "files/boot/ssh"
    destination = "/boot/ssh"
  }

}