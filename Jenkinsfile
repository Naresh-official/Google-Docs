pipeline {
    agent any

    environment {
        // Map necessary credentials from Jenkins here if needed during build time
        // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = credentials('clerk-publishable-key')
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
                // Using docker agent with Node.js could also be an option
                // but this assumes Node/Yarn is installed on the agent
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }

        stage('Build Application') {
            steps {
                // Warning: Next.js may require actual or mock environment variables to build successfully
                sh 'yarn build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        /* Optional Stage
        stage('Docker Push') {
            steps {
                script {
                    // Requires dockerhub-credentials in Jenkins
                    // docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                    //     sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    //     sh "docker push ${DOCKER_IMAGE}:latest"
                    // }
                    echo "Docker Push skipped."
                }
            }
        }
        */
    }

    post {
        always {
            // Clean up workspace after build
            deleteDir()
        }
        success {
            echo "CI pipeline completed successfully!"
        }
        failure {
            echo "CI pipeline failed. Please check the logs."
        }
    }
}
