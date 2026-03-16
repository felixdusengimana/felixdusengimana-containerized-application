# Generate SSH key pair for EC2 instances
resource "tls_private_key" "agrimarket" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Create AWS key pair from the generated public key
resource "aws_key_pair" "agrimarket" {
  key_name   = "agrimarket-prod"
  public_key = tls_private_key.agrimarket.public_key_openssh

  tags = {
    Name        = "agrimarket-prod"
    Environment = "production"
  }
}

# Output the private key (sensitive - for local storage)
output "private_key_pem" {
  value       = tls_private_key.agrimarket.private_key_pem
  sensitive   = true
  description = "Private key for SSH access - save this locally: terraform output -raw private_key_pem > ~/.ssh/agrimarket-prod.pem"
}

# Output the key pair name for reference
output "key_pair_name" {
  value       = aws_key_pair.agrimarket.key_name
  description = "EC2 key pair name for GitHub Secrets: AWS_EC2_KEY_PAIR_NAME"
}
