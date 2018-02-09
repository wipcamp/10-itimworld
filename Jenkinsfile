pipeline {
  agent any
  environment {
    GIT_BRANCH = "${BRANCH_NAME}"
  }
  stages {
    stage('initial') {
      steps {
        sh 'yarn install'
      }
    }
    stage('test') {
      steps {
        sh 'echo no test now test trigger'
      }
    }
    stage('build') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH').trim()
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker build . -t wip-itim'
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker tag wip-itim registry.wip.camp/wip-itim'
      }
    }
    stage('push') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH').trim()
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker push registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker push registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker push registry.wip.camp/wip-itim'
      }
    }
    stage('clean') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH').trim()
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo docker image rm registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'
        sh 'sudo docker image rm registry.wip.camp/wip-itim:$GIT_BRANCH'
        sh 'sudo docker image rm registry.wip.camp/wip-itim'
      }
    }
    stage('deploy-development') {
      when {
        expression {
          branch = sh(returnStdout: true, script: 'echo $GIT_BRANCH').trim()
          return branch == 'develop' || branch == 'master'
        }
      }
      steps {
        sh 'sudo kubectl rolling-update wip-itim -n development --image registry.wip.camp/wip-itim:$GIT_BRANCH-$BUILD_NUMBER'
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