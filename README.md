# DevOps CICD Pipeline Implementation 🚀

This project demonstrates robust Continuous Integration (CI) and Continuous Delivery (CD) pipelines built using Jenkins, Docker, Terraform, and Ansible for efficient application development and deployment.

---

## Workflow Diagram

![workflow](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/workflow.png)

---

## 📊 CI Pipeline Overview

| Stage | Description |
|-------|-------------|
| 🔧 **Declarative Tool Install** | Setup of required dependencies and tools |
| 📥 **Checkout** | Retrieval of source code from version control |
| 📦 **Install Dependencies** | Resolution of project dependencies |
| 🧪 **Run Tests** | Execution of unit and integration tests |
| 🔍 **SonarQube Scan** | Static code analysis and vulnerability detection |
| 🛠️ **Build Frontend Image** | Creation of containerized frontend application |
| 🛠️ **Build Backend Image** | Creation of containerized backend services |
| 🏷️ **Tag Images** | Version management for container images |
| 🔑 **Dockerhub Login** | Authentication with container registry |
| 📤 **Push to Dockerhub** | Publication of verified container images |
| 📢 **Post Actions** | Notification and reporting on pipeline status |

### CI Pipeline Key Highlights
- **Tool Install**: Ensures all necessary dependencies are installed.
- **Code Quality**: Integrated with SonarQube for static code analysis.
- **Dockerized Builds**: Builds both frontend and backend Docker images and pushes them to DockerHub.

---

## 📦 CD Pipeline Overview

| Stage | Description |
|-------|-------------|
| 🧹 **Clean Workspace** | Remove previous build artifacts to ensure a fresh deployment |
| 🔄 **Git Checkout Configs** | Fetch the latest configuration files from the repository |
| 🔑 **Retrieve PEM File from S3** | Securely fetch the private key for SSH access to instances |
| 🔐 **Setup AWS Credentials** | Secure access configuration for AWS services |
| 🌱 **Terraform Init** | Initialization of infrastructure as code environment |
| 📋 **Terraform Plan** | Resource allocation planning and validation |
| 🏗️ **Terraform Apply** | Provisioning of cloud infrastructure |
| 📝 **Update Playbook** | Configuration of deployment automation scripts |
| 📊 **Update Inventory** | Management of target deployment hosts |
| 🚀 **Run Ansible Playbook** | Application of infrastructure configurations |
| 🌐 **Run Ansible Webapp Playbook** | Deployment of application components |
| 📢 **Post Actions** | Notification through Slack and validation of deployment success |

### CD Pipeline Key Highlights
- **Secure Access for secret files** : Ensures sensitive pemfile are securely stored and retrieved from AWS S3
- **Infrastructure as Code (IaC)**: Utilizes Terraform for resource provisioning.
- **Terraform State Management and Locking** : Used AWS S3 bucket and AWS DynamoDb table
- **Configuration Management**: Automates configuration using Ansible playbooks.
- **AWS Integration**: Seamlessly deploys to AWS cloud environment.

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

### Sonarqube Analysis View
![SonarQube](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/CodeQuality.png)

### Build status Slack Notifications
![Slack](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/Slack.png)

### AWS S3 Buckets
![S3 Buckets](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/S3-Buckets.png)

### AWS DynamoDb Table
![DynamoDb Table](https://raw.githubusercontent.com/Chanidu26/DevOps-Project/refs/heads/main/figures/DynamoDb-Table.png)

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
