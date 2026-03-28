variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "bastion_security_group_id" {
  description = "Security group ID for bastion"
  type        = string
}

variable "app_security_group_id" {
  description = "Security group ID for app"
  type        = string
}

variable "internet_gateway_id" {
  description = "Internet Gateway ID for Bastion EIP"
  type        = string
}

variable "bastion_instance_type" {
  description = "EC2 instance type for bastion"
  type        = string
  default     = "t3.micro"
}

variable "app_instance_type" {
  description = "EC2 instance type for app server"
  type        = string
  default     = "t3.small"
}

variable "bastion_volume_size" {
  description = "Root volume size for bastion in GB"
  type        = number
  default     = 20
}

variable "app_volume_size" {
  description = "Root volume size for app server in GB"
  type        = number
  default     = 30
}

variable "bastion_public_key" {
  description = "SSH public key for bastion host (ssh-rsa format)"
  type        = string
}
