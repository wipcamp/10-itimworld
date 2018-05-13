pipeline {
  agent any
  environment {
    GIT_BRANCH = "${BRANCH_NAME}"
  }
  stages {
    stage('install-dependencies') {
      steps {
        sh 'sudo docker container run --rm -v $(pwd):/app node:8 sh -c "cd /app && yarn install"'
      }
    }
    stage('build-application') {
      steps {
        sh 'sudo rm -rf .next'
        sh 'sudo docker container run --rm -v $(pwd):/app node:8 sh -c "cd /app && yarn build"'
      }
    }
    stage('build-image') {
      steps {
        sh 'sudo docker build . -t wip-itim'
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim'
      }
    }
    stage('push-image') {
      steps {
        sh 'sudo docker push registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker push registry.wip.camp/wip-itim'
      }
    }
    stage('versioning') {
      when {
        expression {
          return GIT_BRANCH == 'master'
        }
      }
      steps {
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker push registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'        
        sh 'sudo docker image rm registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'        
      }
    }
    stage('clean') {
      steps {
        sh 'sudo docker image rm registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker image rm registry.wip.camp/wip-itim'
        sh 'sudo docker image rm wip-itim'
      }
    }
    stage('deploy-development') {
      when {
        expression {
          return GIT_BRANCH == 'develop'
        }
      }
      steps {
        sh 'sudo kubectl rolling-update wip-itim -n development --image registry.wip.camp/wip-itim:$GIT_BRANCH --image-pull-policy Always'
      }
    }
  }
  post {
    success {
      sh 'echo success'
    }
    failure {
      sh 'echo failure'
    }
  }
}