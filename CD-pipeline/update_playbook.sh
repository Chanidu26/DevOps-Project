#!/bin/bash

# Navigate to the Terraform directory
cd terraform || exit

# Get the public IP of the server from Terraform
SERVER_IP=$(terraform output -raw instance_public_ip)

# Navigate back to Ansible directory
cd ../ansible || exit

# Replace the IP address in the playbook
sed -i -E "s|REACT_APP_API_BASE_URL: \"http://[^\"]+:8000\"|REACT_APP_API_BASE_URL: \"http://$SERVER_IP:8000\"|g" ansible/playbook-webapp.yml