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
    stage('deploy') {
      steps {
        script {
          if (GIT_BRANCH == 'master') {
            sh 'sudo kubectl rolling-update wip-itim -n production --image registry.wip.camp/wip-itim:master-$BUILD_NUMBER --image-pull-policy Always'
          } else {
            sh 'sudo kubectl rolling-update wip-itim -n development --image rregistry.wip.camp/wip-itim:develop --image-pull-policy Always'
          }
        }
      }
    }
  }
  post {
    success {
      slackSend(color: good, message: "$JOB_NAME on $GIT_BRANCH at build number $BUILD_NUMBER was built successfully & deploy. More infomation ${env.BUILD_URL}")
    }
    failure {
      slackSend(color: danger, message: "$env.JOB_NAME on $GIT_BRANCH was fail $BUILD_URL")
    }
  }
}