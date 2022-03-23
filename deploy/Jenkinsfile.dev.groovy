node {
    properties([
            parameters([
                    gitParameter(name: 'TAG', type: 'PT_BRANCH_TAG', defaultValue: 'master'),
                    string(name: 'PRODUCT_VERSION', defaultValue: 'dev', description: '产品版本'),
                    string(name: 'IMAGE_PREFIX', defaultValue: 'com.zrys.integrated', description: '镜像前缀'),
                    string(name: 'REGISTRY', defaultValue: '10.11.152.94:5000', description: '镜像仓库'),
                    string(name: 'SERVICE_NAME', defaultValue: 'front-end-management', description: '服务名称'),
                    string(name: 'APP_TITLE', defaultValue: '一体化研发环境', description: '平台名称'),
                    booleanParam(name: 'BUILD_TEST_BACK', defaultValue: false, description: '是否构建测试服务'),
                    booleanParam(name: 'UPLOAD_ENABLED', defaultValue: false, description: '是否上传到OSS'),
                    booleanParam(name: 'PUBLISH_ENABLED', defaultValue: true, description: '是否发布'),
                    booleanParam(name: 'SONAR_ENABLED', defaultValue: true, description: '是否进行代码扫描')
            ])
    ])
    try {
        stage('Checkout') {
            // Get some code from a GitHub repository
            checkout([$class: 'GitSCM',
                      branches: [[name: "${params.TAG}"]],
                      doGenerateSubmoduleConfigurations: false,
                      extensions: [],
                      gitTool: 'Default',
                      submoduleCfg: [],
                      userRemoteConfigs: [[url: 'http://117.187.141.34:8081/integrated-platform/front-end-management.git',credentialsId: 'gitlab-jenkins',]]
            ])
        }
        stage('SonarQube analysis') {
            def scannerHome = tool 'SonarQube';
            if (params.SONAR_ENABLED == true) {
                withSonarQubeEnv('SonarQube') { // If you have configured more than one global server connection, you can specify its name
                    nodejs(nodeJSInstallationName: 'NodeJSv14.15.3',configId: "b31d7914-410e-4749-aedc-aec799ed77d6"){
                        sh 'echo sonar.projectVersion=${PACKAGE_VERSION} >> sonar-project.properties'
                        sh 'npm config get registry'
                        sh 'npm install'
                        sh 'npm install --save sonar-scanner'
                        sh 'npm run sonar-scanner -- -Dsonar.qualitygate.wait=true  -Dsonar.projectKey=integrated-platform-front-end-management'
                    }
                }
            }
        }


        // 构建单个工程
        stage('Build') {
            sh "docker build --rm -t ${params.REGISTRY}/${params.IMAGE_PREFIX}/${params.SERVICE_NAME}:$PRODUCT_VERSION ."
            sh "docker push ${params.REGISTRY}/${params.IMAGE_PREFIX}/${params.SERVICE_NAME}:$PRODUCT_VERSION"
            sh "mkdir -p images"
            sh "docker save ${params.REGISTRY}/${params.IMAGE_PREFIX}/${params.SERVICE_NAME}:$PRODUCT_VERSION  > images/${params.SERVICE_NAME}.tar || exit"

        }

        // 构建测试工程
        stage('Build-test-back') {
            if (params.BUILD_TEST_BACK == true) {
                sh "cd test-back && docker build --rm -t ${params.REGISTRY}/${params.IMAGE_PREFIX}/front-test-back:$PRODUCT_VERSION ."
                sh "docker push ${params.REGISTRY}/${params.IMAGE_PREFIX}/front-test-back:$PRODUCT_VERSION"
                sh "mkdir -p images"
                sh "docker save ${params.REGISTRY}/${params.IMAGE_PREFIX}/front-test-back:$PRODUCT_VERSION  > images/front-test-back.tar || exit"
            }

        }
        stage('Upload') {
            if (params.UPLOAD_ENABLED == true) {
                echo "Upload!"
                aliyunOSSUpload accessKeyId: 'cRMkEl0MLhpV9l7g', accessKeySecret: 'CM2vsWqnZbB4gy7pqt1ZUZW1yReC6l', bucketName: 'gzopen-test', endpoint: '58.16.66.33', localPath: '/images', maxRetries: '3', remotePath: '/faas/${PRODUCT_VERSION}'
            }
        }

        def remote = [:]

        withCredentials([usernamePassword(credentialsId: 'jenkins-to-dev-manager-global', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            remote.name = 'Jenkins'
            remote.user = USERNAME
            remote.password = PASSWORD
            remote.host = 'manager'
            remote.allowAnyHosts = true

            stage('publish') {
                if (params.PUBLISH_ENABLED == true) {
                    echo "publish!"
                    sshCommand remote: remote, command: "cd /home/integrated-platform/front-end && ./start.sh"
                }
            }
        }
    } catch (e) {
        throw e
    } finally {
        deleteDir()
    }
}