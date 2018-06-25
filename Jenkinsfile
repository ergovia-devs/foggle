#!/usr/bin/env groovy

// Global Shared Libraries; weitere Infos im Repo 'JenkinsSharedLibrary' oder auch unter https://jenkins.io/doc/book/pipeline/shared-libraries/
@Library('JenkinsSharedLibrary@master') _

node('docker && python && nodejs') {
    def notify = new de.ergovia.Notifier()

    try {
        lock(resource: "lock_${env.JOB_NAME}_${env.BRANCH_NAME}", inversePrecedence: true) {
            echo "\u2600 BUILD_URL=${env.BUILD_URL}"
            echo "\u2600 BRANCH_NAME=${env.BRANCH_NAME}"
            echo "\u2600 BUILD_NUMBER=${env.BUILD_NUMBER}"
            echo "${env.PATH}"

            stage('Checkout') {
                checkout scm
            }


            def dockerImageName = "hub.evsrv.de/stepnova/foggle"
            def dockerBuildTagname = env.BRANCH_NAME + "_b" + env.BUILD_NUMBER

            PACKAGE_VERSION = sh (
                             script: 'cat ./package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\'',
                             returnStdout: true
                             ).trim()

            stage('Checkout') {
                checkout scm
            }

            println "Applikationsversion ist ${PACKAGE_VERSION}"

            stage('Install') {
                dir('./') {
                    if (!fileExists('./node_modules/.bin/detect')) {
                        sh 'npm install'
                    } else {
                        sh 'git diff-tree -r --name-only --no-commit-id HEAD^ HEAD | grep --quiet package.json && rm -r ./node_modules && npm install || exit 0'
                    }
                }
            }

            stage('Test') {
                dir('./') {
                    sh 'npm test'
                }
            }

            stage('Quality Gate') {
                dir('./') {
                    sh 'npm run sonar'
                    def scannerHome = tool 'sonarqube-scanner';
                    withSonarQubeEnv('sonarqube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch=${env.BRANCH_NAME}"
                    }
                }
            }

            stage('Build, Test & Dockerize') {

                if (env.BRANCH_NAME == 'test') {
                    dockerBuildTagname = "v${PACKAGE_VERSION}_b${env.BUILD_NUMBER}"
                }

                def dockerCompleteImageReference = dockerImageName + ":" + dockerBuildTagname
                def dockerLatestTagReference = dockerImageName + ":latest"

                println "----------------" + "\n" +
                "Applikationsversion ist ${PACKAGE_VERSION}" + "\n" +
                "Docker Tags:" + "\n" +
                " dockerBuildTagname: " + dockerBuildTagname + "\n" +
                " dockerImageName: " + dockerImageName + "\n" +
                " dockerCompleteImageReference: " + dockerCompleteImageReference + "\n" +
                " dockerLatestTagReference: " + dockerLatestTagReference + "\n"
                "----------------"
                if (env.BRANCH_NAME == 'test') {
                    println "Latest-Tag will be updated"
                }


                dir('./') {
                    sh "./node_modules/grunt/bin/grunt build"
                    sh "docker build --pull -t ${dockerCompleteImageReference} ."
                }

                ansiColor('xterm') {
                    executeTestinfra()
                }

                docker.withRegistry('https://hub.evsrv.de', 'ergovia-docker-registry') {
                   sh "docker push ${dockerCompleteImageReference}"

                   if (env.BRANCH_NAME == 'test') {
                       sh "docker tag ${dockerCompleteImageReference} ${dockerLatestTagReference}"
                       sh "docker push ${dockerLatestTagReference}"
                   }
                }
            }

            if (env.BRANCH_NAME == 'test') {

                def deployment_containername = "foggle"

                stage('Aktualisiere Deployment im Testsystem') {
                    step(
                            [$class                 : "RundeckNotifier",
                             includeRundeckLogs     : true,
                             jobId                  : "5b9dd99c-6c46-47e9-8071-611e99105beb",
                             nodeFilters            : "",
                             options                : """
                               deployment=${deployment_containername}
                               container=${deployment_containername}
                               image=${dockerImageName}
                               tagname=${dockerBuildTagname}
                          """,
                             rundeckInstance        : "ansible-Rundeck Server",
                             shouldFailTheBuild     : true,
                             shouldWaitForRundeckJob: true,
                             tags                   : "",
                             tailLog                : true]
                    )
                }
            }

            notify.publishBuildState(currentBuild)
        }
    } catch (Exception e) {
        notify.notifyFailed()
        throw e
    }
}

def executeTestinfra() {
    def create_venv = 'virtualenv -p python3 .venv'
    def switch_env = 'source .venv/bin/activate'
    def install_packages = 'pip install -r test/docker/requirements.txt'
    def run_tests = 'py.test -v test/docker/test_image.py'

    sh "bash -c '$create_venv && $switch_env && $install_packages && $run_tests'"
}
