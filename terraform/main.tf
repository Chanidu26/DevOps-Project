resource "aws_instance" "free_tier_instance" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name
  security_groups = [var.security_group]

  tags = {
    Name = var.instance_name
  }
}

output "instance_id" {
  description = "The ID of the created EC2 instance"
  value       = aws_instance.free_tier_instance.id
}
output "instance_public_ip" {
  description = "The public IP of the created EC2 instance"
  value       = aws_instance.free_tier_instance.public_ip
}
