terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # Backend config values will be provided via -b ackend-config flags in CI/CD
    # Configuration:
    # - bucket: S3 bucket for state
    # - key: path within bucket (e.g., agrimarket/staging/terraform.tfstate)
    # - region: AWS region (e.g., us-east-1)
    # - encrypt: true for server-side encryption
    # - dynamodb_table: DynamoDB table for state locking
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
