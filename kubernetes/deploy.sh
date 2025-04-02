#!/bin/bash
set -e

echo "Deploy all the resources"

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-config.yaml
kubectl apply -f frontend-deployment.yml
