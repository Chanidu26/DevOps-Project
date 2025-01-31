#!/bin/bash

# Navigate to the Terraform directory
cd terraform || exit

# Get the public IP of the server from Terraform
SERVER_IP=$(terraform output -raw instance_public_ip)

# Navigate back to Ansible directory
cd ../ansible || exit

# Clear the previous content of the playbook
echo "" > playbook-webapp.yml

# Add the new playbook content
cat <<EOL > playbook-webapp.yml
---
- name: Run Frontend and Backend Docker Containers
  hosts: all
  become: yes
  tasks:
    - name: Create Docker network
      docker_network:
        name: my_app_network
        state: present

    - name: Pull Frontend Docker Image
      docker_image:
        name: chanidukarunarathna/devops-frontend
        tag: latest
        source: pull

    - name: Pull Backend Docker Image
      docker_image:
        name: chanidukarunarathna/devops-backend
        tag: latest
        source: pull

    - name: Run Backend Container
      docker_container:
        name: backend-container
        image: chanidukarunarathna/devops-backend:latest
        state: started
        restart_policy: unless-stopped
        published_ports:
          - "8000:8000"  # Mapping host port 8000 to container port 8000
        env:
          MONGO: "mongodb+srv://dbuser:dbuser@cluster0.knduhpw.mongodb.net/student_management?retryWrites=true&w=majority&appName=Cluster0"
        networks:
          - name: my_app_network

    - name: Run Frontend Container
      docker_container:
        name: frontend-container
        image: chanidukarunarathna/devops-frontend:latest
        state: started
        restart_policy: unless-stopped
        published_ports:
          - "3000:3000"  # Mapping host port 3000 to container port 3000
        env:
          REACT_APP_API_BASE_URL: "http://$SERVER_IP:8000" 
        networks:
          - name: my_app_network
EOL
