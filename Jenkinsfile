pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'google-docs-clone'
        DOCKER_TAG = "build-${env.BUILD_NUMBER}"

        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('CLERK_PUBLISHABLE_KEY')
        CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')
        LIVEBLOCKS_SECRET_KEY = credentials('LIVEBLOCKS_SECRET_KEY')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                    sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -t ${DOCKER_IMAGE}:latest ."
            }
        }
    }

    post {
        success {
            echo "CI pipeline completed successfully!"
        }

        failure {
            echo "CI pipeline failed. Please check the logs."
        }
    }
}