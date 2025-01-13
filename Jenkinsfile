pipeline {
    agent any
    
    tools {
        maven 'maven'
    }
    environment {
        REGISTRY = 'chanidukarunarathna'
        BACKEND_IMAGE = 'devops-backend'
        FRONTEND_IMAGE = 'devops-frontend'
        SONARQUBE_URL = 'http://localhost:9000'
        SONARQUBE_PROJECT_KEY = 'DevOps-Project'
        SONARQUBE_TOKEN = credentials('sonar-token') // Us
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/Chanidu26/DevOps-Project.git'
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    script {
                        bat '''
                            echo "Installing Frontend Dependencies..."
                            npm install
                        '''
                    }
                }
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    script {
                        bat '''
                            echo "Installing Backend Dependencies..."
                            npm install
                        '''
                    }
                }
            }
        }
        stage('SonarQube Scan') {
            steps {
                script {
                   bat 'sonar-scanner -v'
                }
            }
        }
       
        stage("Build frontend Image"){
            steps {
                dir("frontend"){
                    script {
                        bat "docker build -t ${FRONTEND_IMAGE}:latest ."
                    }
                }
            }
        }
        stage("Build backend Image"){
            steps {
                dir("backend"){
                    script {
                        bat "docker build -t ${BACKEND_IMAGE}:latest ."
                    }
                }
            }
        }
        stage("Trivy scan frontend image"){
            steps {
               script {
                   bat "trivy image ${FRONTEND_IMAGE}:latest"
               }
            }
        }
        stage("Trivy scan backend image"){
            steps {
               script {
                   bat "trivy image ${BACKEND_IMAGE}:latest"
               }
            }
        }
       
        stage("Tag frontend image"){
            steps {
                script {
                    bat "docker image tag ${FRONTEND_IMAGE}:latest ${REGISTRY}/${FRONTEND_IMAGE}:latest "
                }
            }
        }
        stage("Tag backend image"){
            steps {
                script {
                    bat "docker image tag ${BACKEND_IMAGE}:latest ${REGISTRY}/${BACKEND_IMAGE}:latest "
                   
                }
            }
        }
        stage("dockerhub login"){
            steps{
                echo "login to dockerhub"
                withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'DOCKERHUB_PASSWORD')]) {
                  bat "docker login -u ${REGISTRY} -p ${DOCKERHUB_PASSWORD}"
                }
                
            }
        }
    }
}