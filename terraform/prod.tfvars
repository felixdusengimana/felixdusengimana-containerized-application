# Terraform Variables - Production
# Use: terraform apply -var-file="prod.tfvars"

aws_region            = "us-east-1"
project_name          = "agrimarket"
environment           = "production"
vpc_cidr              = "10.0.0.0/16"
bastion_instance_type = "t3.micro"
app_instance_type     = "t3.medium" # Larger for production
bastion_volume_size   = 30
app_volume_size       = 50
enable_monitoring     = true
