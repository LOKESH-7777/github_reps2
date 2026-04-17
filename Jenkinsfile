pipeline {
  agent any

  environment {
    IMAGE_NAME = 'github_reps2'
    IMAGE_TAG = 'latest'
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
        script {
          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-cred',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
          )]) {
            bat "docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG% ."
          }
        }
      }
    }

    stage('Login to DockerHub') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-cred',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
          )]) {
            bat '''
            docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
            '''
          }
        }
      }
    }

    stage('Push Image to DockerHub') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-cred',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
          )]) {
            bat 'docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
          }
        }
      }
    }
  }
}
