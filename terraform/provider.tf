terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Ensures compatibility with recent AWS provider versions
    }
  }
  required_version = ">= 1.0.0" # Ensures Terraform version is compatible
}

provider "aws" {
  region = var.aws_region
}
