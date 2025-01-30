variable "aws_region" {
  description = "AWS region for the provider"
  default     = "us-east-1"
}

variable "ami_id" {
  description = "Amazon Machine Image (AMI) ID"
  default     = "ami-04b4f1a9cf54c11d0"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}

variable "key_name" {
  description = "Key pair name for the instance"
  default     = "devops"
}

variable "security_group" {
  description = "Security group for the instance"
  default     = "My-security"
}

variable "instance_name" {
  description = "Tag for the instance"
  default     = "FreeTierUbuntuInstance"
}
