pipeline {
    agent { label 'JDK-17-MVN-3.6' }
    stages {
        stage('vcs') {
            steps {
                git branch: 'https://github.com/satya36-cpu/saleor-dashboard.git',
                url: 'main'
            }
        }
        stage('image build') {
            steps {
                sh 'docker image build -t saleor:1.0 .'
            }
        }
    }
}