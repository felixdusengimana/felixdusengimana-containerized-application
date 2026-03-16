output "bastion_public_ip" {
  description = "Public IP address of the Bastion Host"
  value       = aws_eip.bastion.public_ip
  sensitive   = true
}

output "app_vm_private_ip" {
  description = "Private IP address of the Application VM"
  value       = aws_instance.app_vm.private_ip
  sensitive   = true
}

output "rds_endpoint" {
  description = "RDS database endpoint (hostname:port)"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "rds_address" {
  description = "RDS database host address only"
  value       = aws_db_instance.main.address
  sensitive   = true
}

output "rds_port" {
  description = "RDS database port"
  value       = aws_db_instance.main.port
  sensitive   = true
}

output "ecr_backend_repository_url" {
  description = "URL of the ECR repository for backend"
  value       = aws_ecr_repository.backend.repository_url
  sensitive   = true
}

output "ecr_frontend_repository_url" {
  description = "URL of the ECR repository for frontend"
  value       = aws_ecr_repository.frontend.repository_url
  sensitive   = true
}

output "ecr_backend_repository_uri" {
  description = "URI of the ECR repository for backend"
  value       = aws_ecr_repository.backend.repository_url
  sensitive   = true
}

output "ecr_frontend_repository_uri" {
  description = "URI of the ECR repository for frontend"
  value       = aws_ecr_repository.frontend.repository_url
  sensitive   = true
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
  sensitive   = true
}

output "public_subnet_id" {
  description = "Public subnet ID"
  value       = aws_subnet.public.id
  sensitive   = true
}

output "private_subnet_id" {
  description = "Private subnet ID"
  value       = aws_subnet.private.id
  sensitive   = true
}

output "bastion_instance_id" {
  description = "Instance ID of the Bastion Host"
  value       = aws_instance.bastion.id
  sensitive   = true
}

output "app_vm_instance_id" {
  description = "Instance ID of the Application VM"
  value       = aws_instance.app_vm.id
  sensitive   = true
}

output "db_instance_identifier" {
  description = "RDS database instance identifier"
  value       = aws_db_instance.main.identifier
  sensitive   = true
}

output "terraform_outputs_json" {
  description = "All outputs as JSON for CI/CD integration"
  value = jsonencode({
    bastion_public_ip           = aws_eip.bastion.public_ip
    app_vm_private_ip           = aws_instance.app_vm.private_ip
    rds_endpoint                = aws_db_instance.main.endpoint
    rds_address                 = aws_db_instance.main.address
    rds_port                    = aws_db_instance.main.port
    ecr_backend_repository_url  = aws_ecr_repository.backend.repository_url
    ecr_frontend_repository_url = aws_ecr_repository.frontend.repository_url
    vpc_id                      = aws_vpc.main.id
    public_subnet_id            = aws_subnet.public.id
    private_subnet_id           = aws_subnet.private.id
    bastion_instance_id         = aws_instance.bastion.id
    app_vm_instance_id          = aws_instance.app_vm.id
    db_instance_identifier      = aws_db_instance.main.identifier
  })
  sensitive = true
}
