properties(
    [
        [$class: 'BuildDiscarderProperty', strategy:
          [$class: 'LogRotator', artifactDaysToKeepStr: '14', artifactNumToKeepStr: '5', daysToKeepStr: '30', numToKeepStr: '60']],
        pipelineTriggers(
          [
              pollSCM('H/23 * * * *'),
              cron('@daily'),
          ]
        )
    ]
)
node {
    stage('Declarative Checkout SCM') {
        deleteDir()
        checkout scm
    }

    stage('NPM Install') {
       echo 'Install NPM in Server'
    }

    stage('Test') {
        echo "Test..."
    }

    stage('Lint') {
        echo "Lint..."
    }

    stage('Build') {
        echo "Build..."
    }

    stage('Deploy') {
        echo "Deploy..."
    }
}
