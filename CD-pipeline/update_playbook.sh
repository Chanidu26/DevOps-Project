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

    - name: Create Docker Volume for MongoDB Data
      docker_volume:
        name: mongo_data
        state: present

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

    - name: Pull MongoDB Docker Image if not present
      docker_image:
        name: mongo
        tag: latest
        source: pull

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

    - name: Ensure MongoDB Container is Running
      docker_container:
        name: mongo-container
        image: mongo:latest
        state: started
        restart_policy: unless-stopped
        published_ports:
          - "27017:27017"
        env:
          MONGO_INITDB_ROOT_USERNAME: admin
          MONGO_INITDB_ROOT_PASSWORD: password
        volumes:
          - mongo_data:/data/db
        networks:
          - name: my_app_network

    - name: Run Backend Container
      docker_container:
        name: backend-container
        image: chanidukarunarathna/devops-backend:latest
        state: started
        restart_policy: unless-stopped
        published_ports:
          - "8000:8000"  
        env:
          MONGO: "mongodb://admin:password@mongo-container:27017"
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
