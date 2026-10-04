pipeline {
  agent any
  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
  }
  parameters {
    string(name: 'HARBOR_CREDENTIALS_ID', defaultValue: 'harbor-cred', description: 'Kredensial Jenkins untuk Harbor')
    booleanParam(name: 'BUILD_IMAGE', defaultValue: true, description: 'Build Docker Image')
    booleanParam(name: 'SCAN_IMAGE', defaultValue: true, description: 'Scan image dengan Trivy')
    booleanParam(name: 'PUSH_IMAGE', defaultValue: true, description: 'Push image ke Harbor')
    booleanParam(name: 'DEPLOY_K8S', defaultValue: false, description: 'Auto-rollout deployment di Kubernetes')
  }
  environment {
    HARBOR = 'harbor-dt.co.id'
    PROJECT = 'devops-apps/dita-devops-portfolio'
    NAMESPACE = 'test-app'
    DEPLOYMENT_NAME = 'dita-devops-portfolio'
    NODE_IMAGE = 'node:22-alpine'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.SHORT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          echo "Building commit: ${env.SHORT_SHA}"
        }
      }
    }

    stage('Node Quality Gate') {
      steps {
        sh '''docker run --rm \
          --user "$(id -u):$(id -g)" \
          --volumes-from "$HOSTNAME" \
          -w "$PWD" \
          -e HOME=/tmp \
          -e CI=true \
          -e NEXT_TELEMETRY_DISABLED=1 \
          $NODE_IMAGE sh -c '
            set -eu
            npm ci --no-audit --no-fund
            npm run typecheck
            mkdir -p coverage
            npm run test:coverage
            npm run build
          '
        '''
      }
    }

    stage('SonarQube SAST Analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh '''
            docker run --rm \
              --add-host sonar-dt:192.168.100.59 \
              --volumes-from "$HOSTNAME" \
              -w "$PWD" \
              -e SONAR_TOKEN="$SONAR_AUTH_TOKEN" \
              sonarsource/sonar-scanner-cli:latest \
              -Dsonar.host.url="$SONAR_HOST_URL" \
              -Dsonar.qualitygate.wait=true
          '''
        }
      }
    }

    stage('Build Container Image') {
      when {
        expression { return params.BUILD_IMAGE }
      }
      steps {
        sh """
          docker build \
            -t ${HARBOR}/${PROJECT}:${SHORT_SHA} \
            -t ${HARBOR}/${PROJECT}:latest .
        """
      }
    }

    stage('Security Vulnerability Scan (Trivy)') {
      when {
        expression { return params.SCAN_IMAGE }
      }
      steps {
        sh """
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy:latest image \
            --severity HIGH,CRITICAL \
            --exit-code 0 \
            ${HARBOR}/${PROJECT}:${SHORT_SHA}
        """
      }
    }

    stage('Push to Harbor Registry') {
      when {
        expression { return params.PUSH_IMAGE }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: params.HARBOR_CREDENTIALS_ID, usernameVariable: 'HARBOR_USER', passwordVariable: 'HARBOR_PASS')]) {
          sh """
            echo "\$HARBOR_PASS" | docker login ${HARBOR} -u "\$HARBOR_USER" --password-stdin
            docker push ${HARBOR}/${PROJECT}:${SHORT_SHA}
            docker push ${HARBOR}/${PROJECT}:latest
            docker logout ${HARBOR}
          """
        }
      }
    }

    stage('Update GitOps Repository') {
      when {
        expression { return params.PUSH_IMAGE }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'github-credentials-id', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
          sh """
            set -eu
            rm -rf gitops-repo
            git clone https://${GIT_USER}:${GIT_PASS}@github.com/ditasetyakurniawan-droid/dita-devops-portfolio-gitops.git gitops-repo
            cd gitops-repo
            
            # Update tag image di manifest GitOps ke commit hash saat ini
            sed -i "s|image: ${HARBOR}/${PROJECT}:.*|image: ${HARBOR}/${PROJECT}:${SHORT_SHA}|g" manifests/manifest.yaml
            
            if git diff --quiet manifests/manifest.yaml; then
              echo "No image change detected in GitOps."
            else
              git config user.name "Jenkins CI/CD"
              git config user.email "jenkins@zabisa.local"
              git add manifests/manifest.yaml
              git commit -m "chore(gitops): promote image ${SHORT_SHA} [skip ci]"
              git push origin main
              echo "GitOps repository successfully updated with image ${SHORT_SHA}!"
            fi
            
            cd ..
            rm -rf gitops-repo
          """
        }
      }
    }
  }

  post {
    always {
      sh """
        docker image prune -f --filter "label=stage=builder" || true
      """
      cleanWs()
    }
  }
}