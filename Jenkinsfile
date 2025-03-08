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
        SONAR_TOKEN = credentials('sonar-token')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/Chanidu26/DevOps-Project.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    script {
                        bat '''
                            echo "Installing Frontend Dependencies..."
                            npm install
                        '''
                    }
                }
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
        stage('Run tests') {
            steps {
                dir('frontend') {
                    script {
                        bat '''
                            echo "testing Frontend..."
                            npm test
                        '''
                    }
                }
                dir('backend') {
                    script {
                        bat '''
                            echo "testing Backend..."
                            npm test
                        '''
                    }
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') { 
                        dir('frontend') {
                            bat '''
                                sonar-scanner -Dsonar.projectKey=DevOps-Frontend \
                                    -Dsonar.sources=. \
                                    -Dsonar.language=js \
                                    -Dsonar.exclusions=node_modules/**,coverage/**,dist/** \
                                    -Dsonar.login=%SONAR_TOKEN%
                            '''
                        }

                        dir('backend') {
                            bat '''
                                sonar-scanner -Dsonar.projectKey=DevOps-Backend \
                                    -Dsonar.sources=. \
                                    -Dsonar.language=js \
                                    -Dsonar.exclusions=node_modules/**,coverage/**,dist/** \
                                    -Dsonar.login=%SONAR_TOKEN%
                            '''
                        }
                    }
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
        stage("Tag Images"){
            steps {
                script {
                    bat "docker image tag ${FRONTEND_IMAGE}:latest ${REGISTRY}/${FRONTEND_IMAGE}:latest"
                }
                script {
                    bat "docker image tag ${BACKEND_IMAGE}:latest ${REGISTRY}/${BACKEND_IMAGE}:latest"
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
        stage("Push to Dockerhub"){
            steps{
               script{
                   bat "docker push ${REGISTRY}/${BACKEND_IMAGE}:latest"
               }
               script{
                   bat "docker push ${REGISTRY}/${FRONTEND_IMAGE}:latest"
               }
            }
        }
    }
    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
        always {
            echo "Pipeline execution finished."
        }
    }
}