# DevOps CICD Pipeline Implementation 🚀

This project demonstrates robust Continuous Integration (CI) and Continuous Delivery (CD) pipelines built using Jenkins, Docker, Terraform, and Ansible for efficient application development and deployment.

---

## 📊 CI Pipeline Overview

| Stage 
|-------
| Declarative Tool Install
| Checkout 
| Install Dependencies 
| Run Tests
| SonarQube Scan
| Build Frontend Image
| Build Backend Image
| Tag Images 
| Dockerhub Login 
| Push to Dockerhub 
| Post Actions 

### CI Pipeline Key Highlights
- **Tool Install**: Ensures all necessary dependencies are installed.
- **Code Quality**: Integrated with SonarQube for static code analysis.
- **Dockerized Builds**: Builds both frontend and backend Docker images and pushes them to DockerHub.

---

## 📦 CD Pipeline Overview

| Stage 
|-------
| Setup AWS Credentials 
| Terraform Init 
| Terraform Plan 
| Terraform Apply 
| Update Playbook 
| Update Inventory 
| Run Ansible Playbook 
| Run Ansible Webapp Playbook 
| Post Actions 

### CD Pipeline Key Highlights
- **Infrastructure as Code (IaC)**: Utilizes Terraform for resource provisioning.
- **Configuration Management**: Automates configuration using Ansible playbooks.
- **AWS Integration**: Seamlessly deploys to AWS cloud environments.

---

## 🚀 How to Use

1. **CI/CD Pipeline Setup**:
   - Clone this repository.
   - Set up Jenkins with the provided Jenkinsfile for both CI and CD pipelines.
   - Integrate with SonarQube and DockerHub.
   - Configure AWS credentials for CD.

2. **Run Pipelines**:
   - Trigger the CI pipeline for build and test automation.
   - Trigger the CD pipeline for deployment to AWS.

---

## 📸 Screenshots

### CI Pipeline Stage View
![CI Pipeline](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/CI.png)

### CD Pipeline Stage View
![CD Pipeline](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/CD.png)

---

## 🤖 Tools Used
- **Jenkins** for CI/CD
- **Docker** for containerization
- **SonarQube** for code quality analysis
- **Terraform** for IaC
- **Ansible** for configuration management
- **AWS** for cloud infrastructure

---

## 📝 License
This project is licensed under the MIT License.
