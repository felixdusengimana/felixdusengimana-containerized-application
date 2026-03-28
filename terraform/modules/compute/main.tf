# Data source for Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# SSH Key Pair for EC2 instances
resource "aws_key_pair" "bastion" {
  key_name   = "${var.project_name}-bastion-key"
  public_key = var.bastion_public_key

  tags = {
    Name        = "${var.project_name}-bastion-key"
    Environment = var.environment
  }
}

# Bastion Host (t3.micro in public subnet)
resource "aws_instance" "bastion" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.bastion_instance_type
  subnet_id              = var.public_subnet_ids[0]
  vpc_security_group_ids = [var.bastion_security_group_id]
  key_name               = aws_key_pair.bastion.key_name

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.bastion_volume_size
    delete_on_termination = true
  }

  monitoring    = true
  ebs_optimized = false

  tags = {
    Name        = "${var.project_name}-bastion"
    Environment = var.environment
    Role        = "Bastion"
  }
}

# Elastic IP for Bastion
resource "aws_eip" "bastion" {
  instance = aws_instance.bastion.id
  domain   = "vpc"

  tags = {
    Name        = "${var.project_name}-bastion-eip"
    Environment = var.environment
  }

  depends_on = [var.internet_gateway_id]
}

# App Server (t3.small in private subnet)
resource "aws_instance" "app" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.app_instance_type
  subnet_id              = var.private_subnet_ids[0]
  vpc_security_group_ids = [var.app_security_group_id]
  key_name               = aws_key_pair.bastion.key_name

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.app_volume_size
    delete_on_termination = true
  }

  monitoring    = true
  ebs_optimized = false

  tags = {
    Name        = "${var.project_name}-app"
    Environment = var.environment
    Role        = "AppServer"
  }
}

# ECR Repository
resource "aws_ecr_repository" "backend" {
  name                 = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = false
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project_name}-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = false
  }

  tags = {
    Environment = var.environment
  }
}

# Lifecycle policy for ECR repositories to clean up old images
resource "aws_ecr_lifecycle_policy" "backend" {
  repository = aws_ecr_repository.backend.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["latest"]
          countType     = "imageCountMoreThan"
          countNumber   = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["latest"]
          countType     = "imageCountMoreThan"
          countNumber   = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
