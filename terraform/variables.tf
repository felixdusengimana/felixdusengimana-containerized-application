variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name (used for resource naming)"
  type        = string
  default     = "agrimarket"
}

# VPC and Networking
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet (App VM)"
  type        = string
  default     = "10.0.2.0/24"
}

variable "private_rds_subnet_cidr" {
  description = "CIDR block for the private RDS subnet"
  type        = string
  default     = "10.0.3.0/24"
}

# Bastion Configuration
variable "bastion_instance_type" {
  description = "EC2 instance type for Bastion"
  type        = string
  default     = "t3.micro"
}

variable "bastion_ssh_cidr" {
  description = "CIDR block allowed to SSH to Bastion (e.g., your IP or 0.0.0.0/0)"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# App VM Configuration
variable "app_instance_type" {
  description = "EC2 instance type for App VM"
  type        = string
  default     = "t3.small"
}

# RDS Configuration
variable "db_name" {
  description = "Name of the PostgreSQL database"
  type        = string
  default     = "agrimarketdb"
}

variable "db_master_username" {
  description = "Master username for RDS"
  type        = string
  default     = "postgres"
  sensitive   = true
}

variable "db_master_password" {
  description = "Master password for RDS (min 8 characters, alphanumeric + special chars)"
  type        = string
  sensitive   = true
}

variable "rds_instance_class" {
  description = "Instance class for RDS"
  type        = string
  default     = "db.t3.micro"
}

variable "rds_allocated_storage" {
  description = "Allocated storage for RDS (in GB)"
  type        = number
  default     = 20
}

variable "postgres_engine_version" {
  description = "PostgreSQL engine version"
  type        = string
  default     = "15.15"
}
