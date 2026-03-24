#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   AgriMarket CI/CD Pipeline Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check for required tools
echo -e "${YELLOW}Checking for required tools...${NC}"

check_tool() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        return 1
    fi
}

required_tools=("terraform" "ansible" "aws" "git" "docker")
all_tools_ok=true

for tool in "${required_tools[@]}"; do
    if ! check_tool "$tool"; then
        all_tools_ok=false
    fi
done

if [ "$all_tools_ok" = false ]; then
    echo -e "${RED}Please install missing tools before proceeding${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Setting up SSH key for Ansible...${NC}"

# Setup SSH key
if [ ! -f "terraform/bastion_key.pem" ]; then
    echo -e "${YELLOW}Generating SSH key pair...${NC}"
    ssh-keygen -t rsa -N "" -f "terraform/bastion_key.pem" -C "agrimarket-bastion"
    chmod 600 "terraform/bastion_key.pem"
    echo -e "${GREEN}✓${NC} SSH key created at terraform/bastion_key.pem"
else
    echo -e "${GREEN}✓${NC} SSH key already exists"
fi

echo ""
echo -e "${YELLOW}Configuring Terraform...${NC}"

# Create terraform.tfvars if it doesn't exist
if [ ! -f "terraform/terraform.tfvars" ]; then
    cp "terraform/terraform.tfvars.example" "terraform/terraform.tfvars"
    echo -e "${GREEN}✓${NC} Created terraform/terraform.tfvars"
    echo -e "${YELLOW}   Please edit terraform/terraform.tfvars to customize your environment${NC}"
else
    echo -e "${GREEN}✓${NC} terraform/terraform.tfvars already exists"
fi

# Initialize Terraform
echo -e "${YELLOW}Initializing Terraform...${NC}"
cd terraform
terraform init
terraform validate
cd ..

echo -e "${GREEN}✓${NC} Terraform initialized and validated"

echo ""
echo -e "${YELLOW}Setting up Ansible...${NC}"

# Create Python virtual environment for Ansible
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✓${NC} Virtual environment created"
fi

# Activate venv and install Ansible dependencies
source venv/bin/activate
echo -e "${YELLOW}Installing Ansible and dependencies...${NC}"
pip install -q --upgrade pip setuptools wheel
pip install -q ansible boto3 botocore

echo -e "${GREEN}✓${NC} Ansible dependencies installed in venv"
echo -e "${YELLOW}   Run 'source venv/bin/activate' to activate the environment${NC}"

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   GitHub Secrets Configuration${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

echo -e "${YELLOW}Next steps to configure GitHub Secrets:${NC}"
echo ""
echo "1. Go to your GitHub repository settings:"
echo "   https://github.com/<your-org>/<repo>/settings/secrets/actions"
echo ""
echo "2. Create the following secrets:"
echo ""
echo -e "   ${BLUE}AWS Credentials:${NC}"
echo "   - AWS_ACCESS_KEY_ID: Your AWS access key"
echo "   - AWS_SECRET_ACCESS_KEY: Your AWS secret key"
echo "   - AWS_ACCOUNT_ID: Your AWS account ID (12 digits)"
echo ""
echo -e "   ${BLUE}Deployment:${NC}"
echo "   - BASTION_SSH_PRIVATE_KEY: $(cat <<'EOF'
Content of terraform/bastion_key.pem
EOF
)"
echo ""
read -p "      🔑 Please copy the content of terraform/bastion_key.pem and paste it as BASTION_SSH_PRIVATE_KEY"
echo ""
echo -e "   ${BLUE}Application:${NC}"
echo "   - DJANGO_SECRET_KEY: Generate with: python -c 'import secrets; print(secrets.token_urlsafe(50))'"
echo "   - POSTGRES_PASSWORD: Use a strong password"
echo ""
echo "3. (Optional) If using AWS OIDC:"
echo "   - AWS_ROLE_TO_ASSUME: arn:aws:iam::<account-id>:role/github-actions-role"
echo ""

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Deployment Strategy${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

echo "Environment Strategy:"
echo "  - Push to 'main' branch → Production deployment"
echo "  - Push to 'develop' branch → Staging deployment"
echo "  - Manual trigger available in Actions tab"
echo ""

echo "File Change Detection:"
echo "  - deployment only triggers if backend/ or frontend/ files changed"
echo "  - CI tests run on all PRs to main and develop branches"
echo ""

echo -e "${BLUE}========================================${NC}"

echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${YELLOW}Quick verification:${NC}"
echo "1. Edit terraform/terraform.tfvars if needed"
echo "2. Set GitHub Secrets as listed above"
echo "3. Commit and push to main or develop branch:"
echo "   git add -A"
echo "   git commit -m 'CI/CD pipeline setup'"
echo "   git push origin develop"
echo ""
echo "The GitHub Actions workflow will trigger automatically!"
echo""
echo -e "${YELLOW}For manual testing with Terraform:${NC}"
echo "   cd terraform"
echo "   terraform plan -var=\"environment=staging\""
echo "   terraform apply -var=\"environment=staging\""
echo ""
echo -e "${YELLOW}For manual testing with Ansible:${NC}"
echo "   source venv/bin/activate"
echo "   cd ansible"
echo "   ansible-playbook -vv playbooks/deploy.yml -i inventory/aws.ini"
echo ""
echo -e "${BLUE}========================================${NC}"
