terraform {
  backend "s3" {
    bucket         = "chanidu-terraform-devops-state-bucket"                     
    key            = "chanidu_terraform_devops_state_dir/terraform.tfstate"      
    region         = "us-east-1"
    encrypt        =  true
    dynamodb_table = "chanidu-terraform-devops-state-lock"
  }
}