terraform {
  required_version = ">= 1.10"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  # Backend configuration is stored in environment-specific files (e.g. backend.dev.tfvars, backend.prod.tfvars).
  # Initialize the backend with: terraform init -backend-config=backend.<env>.tfvars
  backend "s3" {}

}

provider "aws" {
  region = var.region
  default_tags {
    tags = local.common_tags
  }
}

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = [
    "sts.amazonaws.com"
  ]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]
}
