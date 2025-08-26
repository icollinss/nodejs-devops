pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins credentials ID
        DOCKER_IMAGE = "icollinss/nodejs-devops"
        DOCKER_TAG = "alpine"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/icollinss/nodejs-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:$DOCKER_TAG ."
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE:$DOCKER_TAG"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Replace with your EC2's public IP
                    sh "ssh -o StrictHostKeyChecking=no ec2-user@<EC2_PUBLIC_IP> 'docker pull $DOCKER_IMAGE:$DOCKER_TAG && docker stop nodejs || true && docker rm nodejs || true && docker run -d --name nodejs -p 3000:3000 $DOCKER_IMAGE:$DOCKER_TAG'"
                }
            }
        }
    }
}

