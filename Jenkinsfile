pipeline {
  agent any

  environment {
    DOCKER_USERNAME = "lokeshdockers"
    IMAGE_NAME = "online-book-store"
    IMAGE_TAG = "latest"
  }

  stages {

    stage('Clone Repository') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        bat 'docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG% .'
      }
    }

    stage('Login to DockerHub') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-cred',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            bat """
            echo|set /p=%DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            """
          }
        }
      }
    }

    stage('Push Image to DockerHub') {
      steps {
        bat 'docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
      }
    }

    stage('Build Successful') {
      steps {
        echo 'Application built and pushed to DockerHub successfully!'
      }
    }

  }
}