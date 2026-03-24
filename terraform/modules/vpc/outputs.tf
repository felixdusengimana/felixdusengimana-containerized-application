output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "internet_gateway_id" {
  description = "Internet Gateway ID"
  value       = aws_internet_gateway.main.id
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "List of private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "bastion_security_group_id" {
  description = "Security group ID for bastion"
  value       = aws_security_group.bastion.id
}

output "app_security_group_id" {
  description = "Security group ID for app server"
  value       = aws_security_group.app.id
}
