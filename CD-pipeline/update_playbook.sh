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
    - name: Remove existing Docker network
      docker_network:
        name: my_app_network
        state: absent
      ignore_errors: yes

    - name: Remove existing backend container if it exists
      docker_container:
        name: backend-container
        state: absent
      ignore_errors: yes 

    - name: Remove existing frontend container if it exists
      docker_container:
        name: frontend-container
        state: absent
      ignore_errors: yes 

    - name: Remove existing backend image if it exists
      docker_image:
        name: chanidukarunarathna/devops-backend
        state: absent
      ignore_errors: yes  

    - name: Remove existing frontend image if it exists
      docker_image:
        name: chanidukarunarathna/devops-frontend
        state: absent
      ignore_errors: yes  
    
    - name: Create Docker Network
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
          - "8000:8000" 
        env:
          MONGO: <Your MongoDB Address>
        networks:
          - name: my_app_network

    - name: Run Frontend Container
      docker_container:
        name: frontend-container
        image: chanidukarunarathna/devops-frontend:latest
        state: started
        restart_policy: unless-stopped
        published_ports:
          - "3000:3000" 
        env:
          REACT_APP_API_BASE_URL: "http://$SERVER_IP:8000"
        networks:
          - name: my_app_network
EOL
