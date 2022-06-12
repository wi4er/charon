#!/bin/sh

version="0.0.5"

docker buildx create --name mbuilder
docker buildx build --push -t wi4er/charon:$version --platform linux/arm64,linux/amd64 .

