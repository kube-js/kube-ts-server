#! /bin/bash
# exit script when any command ran here returns with non-zero exit code
set -e

cd ~/repo/k8s

export API_VERSION="$(grep "appVersion" Chart.yaml | cut -d" " -f2)"
export RELEASE_NAME="kube-ts-server-v${API_VERSION/./-}"
export DEPLOYS=$(helm ls | grep $RELEASE_NAME | wc -l)

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

pwd
ls 

envsubst <~/repo/k8s/values-circleci.yaml >~/repo/k8s/values-circleci.yaml.out
mv ~/repo/k8s/values-circleci.yaml.out ~/repo/k8s/values-circleci.yaml

which kubectl

kubectl config get-contexts

kubectl config set-credentials cicd \
--kubeconfig=/dev/null \
--server=$KUBERNETES_SERVER \
--certificate-authority=cert.crt \
--token=$KUBERNETES_TOKEN \
--embed-certs=true \

echo "initialising helm..."
helm init --service-account tiller

echo "installing/upgrading new release..."

if [ ${DEPLOYS}  -eq 0 ];
then helm install --name=${RELEASE_NAME} . -f values-circleci.yaml ; 
else helm upgrade ${RELEASE_NAME} . -f values-circleci.yaml ; fi

echo "deployment completed..."
