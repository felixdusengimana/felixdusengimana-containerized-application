output "bastion_instance_id" {
  description = "Bastion instance ID"
  value       = aws_instance.bastion.id
}

output "bastion_private_ip" {
  description = "Bastion private IP"
  value       = aws_instance.bastion.private_ip
}

output "bastion_public_ip" {
  description = "Bastion public IP (Elastic IP)"
  value       = aws_eip.bastion.public_ip
}

output "app_instance_id" {
  description = "App server instance ID"
  value       = aws_instance.app.id
}

output "app_private_ip" {
  description = "App server private IP"
  value       = aws_instance.app.private_ip
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "backend_ecr_repository_name" {
  description = "Backend ECR repository name"
  value       = aws_ecr_repository.backend.name
}

output "frontend_ecr_repository_name" {
  description = "Frontend ECR repository name"
  value       = aws_ecr_repository.frontend.name
}
