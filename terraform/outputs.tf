output "bastion_public_ip" {
  description = "Bastion public IP address (use this for SSH access)"
  value       = module.compute.bastion_public_ip
}

output "bastion_private_ip" {
  description = "Bastion private IP address"
  value       = module.compute.bastion_private_ip
}

output "app_private_ip" {
  description = "App server private IP address (access via bastion)"
  value       = module.compute.app_private_ip
}

output "bastion_instance_id" {
  description = "Bastion instance ID"
  value       = module.compute.bastion_instance_id
}

output "app_instance_id" {
  description = "App server instance ID"
  value       = module.compute.app_instance_id
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL"
  value       = module.compute.backend_ecr_repository_url
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL"
  value       = module.compute.frontend_ecr_repository_url
}

output "ecr_repository_url" {
  description = "ECR registry URL (without specific image name)"
  value       = replace(module.compute.backend_ecr_repository_url, "/agrimarket-backend$", "")
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnet_ids
}

output "bastion_security_group_id" {
  description = "Bastion security group ID"
  value       = module.vpc.bastion_security_group_id
}

output "app_security_group_id" {
  description = "App server security group ID"
  value       = module.vpc.app_security_group_id
}

output "environment" {
  description = "Deployment environment"
  value       = var.environment
}

output "project_name" {
  description = "Project name"
  value       = var.project_name
}
