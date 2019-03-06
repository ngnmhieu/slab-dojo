#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

read_var() {
    test -z "${!1}" && read -p "${2}" ${3:+-s} "${1}" || true
    test -n "${3}" && echo || true
}

read_var OC_NAMESPACE "OpenShift namespace: "
read_var OC_PROJECT_NAME "OpenShift project name: "
read_var OC_PROJECT_DESC "OpenShift project description: "
read_var DB_USER "Database user: "
read_var DB_PASSWORD "Database password: " silent
read_var DOCKER_CFG_REGISTRY "Docker registry name: "
read_var DOCKER_CFG_USERNAME "Docker registry username: "
read_var DOCKER_CFG_EMAIL "Docker registry mail address: "
read_var DOCKER_CFG_TOKEN "Docker registry token: " silent

set -x
oc new-project "${OC_NAMESPACE}" --display-name="${OC_PROJECT_NAME}" --description="${OC_PROJECT_DESC}"
oc project "${OC_NAMESPACE}"

create() {
    oc create -f "${SCRIPT_DIR}/${1}"
}

create_instance() {
    local instancesuffix="${1}"
    echo "Creating instance with suffix '${instancesuffix}'"
    create "persistentVolumeClaims/pg-data${instancesuffix}.yml"
    create "deployments/postgres${instancesuffix}.yml"
    create "deployments/teamdojo${instancesuffix}.yml"
    create "services/postgres${instancesuffix}.yml"
    create "services/teamdojo${instancesuffix}.yml"
    create "routes/teamdojo${instancesuffix}.yml"
}

oc secrets new-dockercfg "registry-dockercfg" --docker-server="${DOCKER_CFG_REGISTRY}" --docker-username="${DOCKER_CFG_USERNAME}" --docker-email="${DOCKER_CFG_EMAIL}" --docker-password="${DOCKER_CFG_TOKEN}"
oc secrets new-basicauth "database-creds" --username="${DB_USER}" --password="${DB_PASSWORD}"
create "serviceaccounts/bamboodeployer.yml"
create "rolebindings/edit.yml"

create_instance ""
create_instance "-int"

set +x
OC_BAMBOO_TOKEN="$(oc get serviceaccounts/bamboodeployer --output jsonpath='{.secrets[0].name}')"
echo
echo "Use this as your deployer token in Bamboo: "
oc describe "secret/${OC_BAMBOO_TOKEN}"

