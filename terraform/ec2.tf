# Data source for the most recent Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Bastion Host (in public subnet)
resource "aws_instance" "bastion" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.bastion_instance_type
  key_name               = aws_key_pair.agrimarket.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.bastion.id]

  associate_public_ip_address = true

  tags = {
    Name = "${var.project_name}-bastion"
  }
}

# Application VM (in private subnet)
resource "aws_instance" "app_vm" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.app_instance_type
  key_name               = aws_key_pair.agrimarket.key_name
  subnet_id              = aws_subnet.private.id
  vpc_security_group_ids = [aws_security_group.app_vm.id]

  # IAM instance profile for ECR access
  iam_instance_profile = aws_iam_instance_profile.app_vm_profile.name

  tags = {
    Name = "${var.project_name}-app-vm"
  }

  depends_on = [aws_nat_gateway.main]
}

# Elastic IP for Bastion (optional, but useful for stable access)
resource "aws_eip" "bastion" {
  instance = aws_instance.bastion.id
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-bastion-eip"
  }

  depends_on = [aws_internet_gateway.main]
}

# IAM Role for App VM (to access ECR)
resource "aws_iam_role" "app_vm_role" {
  name_prefix = "${var.project_name}-app-vm-role-"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-app-vm-role"
  }
}

# IAM Policy for ECR access
resource "aws_iam_role_policy" "ecr_access" {
  name_prefix = "${var.project_name}-ecr-access-"
  role        = aws_iam_role.app_vm_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer",
          "ecr:DescribeImages"
        ]
        Resource = "*"
      }
    ]
  })
}

# IAM Instance Profile for App VM
resource "aws_iam_instance_profile" "app_vm_profile" {
  name_prefix = "${var.project_name}-app-vm-profile-"
  role        = aws_iam_role.app_vm_role.name
}
