# VPC Module
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr     = var.vpc_cidr
  project_name = var.project_name
  environment  = var.environment
}

# Compute Module
module "compute" {
  source = "./modules/compute"

  project_name              = var.project_name
  environment               = var.environment
  vpc_id                    = module.vpc.vpc_id
  public_subnet_ids         = module.vpc.public_subnet_ids
  private_subnet_ids        = module.vpc.private_subnet_ids
  bastion_security_group_id = module.vpc.bastion_security_group_id
  app_security_group_id     = module.vpc.app_security_group_id
  internet_gateway_id       = module.vpc.internet_gateway_id
  bastion_instance_type     = var.bastion_instance_type
  app_instance_type         = var.app_instance_type
  bastion_volume_size       = var.bastion_volume_size
  app_volume_size           = var.app_volume_size
}
