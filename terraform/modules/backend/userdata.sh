#!/bin/bash
set -e

sudo apt-get update -y
sudo apt-get install -y unzip docker.io

sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version

newgrp docker