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
    booleanParam(name: 'DEPLOY_K8S', defaultValue: true, description: 'Auto-rollout deployment di Kubernetes')
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
            npm run build
          '
        '''
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

    stage('Deploy to Kubernetes') {
      when {
        expression { return params.DEPLOY_K8S }
      }
      steps {
        sh """
          kubectl rollout restart deployment ${DEPLOYMENT_NAME} -n ${NAMESPACE}
          kubectl rollout status deployment ${DEPLOYMENT_NAME} -n ${NAMESPACE} --timeout=120s
        """
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