#!/bin/bash
set -e

# Update system
apt-get update
apt-get upgrade -y

# Install Docker
apt-get install -y docker.io

# Install Docker Compose
apt-get install -y docker-compose-plugin

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Start Docker service
systemctl start docker
systemctl enable docker

# Install AWS CLI
apt-get install -y awscli

# Create docker system prune cron job (weekly cleanup)
echo "0 2 * * 0 /usr/bin/docker system prune -af" | crontab -u ubuntu -

echo "Docker installation completed"
