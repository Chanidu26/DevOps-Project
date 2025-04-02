#!/bin/bash
set -e

echo "Delete all the resources"

kubectl delete -f mongo-secret.yaml
kubectl delete -f mongodb-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f frontend-config.yaml
kubectl delete -f frontend-deployment.yml