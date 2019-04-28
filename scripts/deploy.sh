# set -e
# HELM_DEPLOY_NAME=${APP_NAME}

# helm upgrade --kube-context ${KUBE_CONTEXT} --wait --install \
#   --set ORG_COMPONENT_IMAGE_FULL=${ORG_COMPONENT_IMAGE_SHA} \ # echo ${ORG_DOCKER_REGISTRY}/${ORG_IMAGE_NAME
#   --set GIT_COMMIT=${GIT_COMMIT} \ #manual
#   --set APP_VERSION=${APP_VERSION} \ #manual
#   --set ENVIRONMENT=${ENVIRONMENT} \ #dev
#   --values ./k8s/charts/values.yaml \
#   --values ./k8s/charts/values-${ENVIRONMENT}.yaml \ # dev / prod
#   \$HELM_DEPLOY_NAME ./k8s/charts/ \
#   --namespace=kube-ts-${ENVIRONMENT} # dev / prod
