stages {

  stage('Clone Repository') {
    steps { checkout scm }
  }

  stage('Install Dependencies') {
    steps { bat 'npm install' }
  }

  stage('Build Docker Image') {
    steps {
      bat 'docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG% .'
    }
  }

  // 👇 PASTE DEBUG STAGE HERE
  stage('DEBUG CREDENTIAL') {
    steps {
      script {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-cred',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          bat 'echo USER=%DOCKER_USER%'
        }
      }
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
        bat '''
        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
        '''
      }
    }
  }
}
  stage('Push Image to DockerHub') {
    steps {
      bat 'docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
    }
  }
}