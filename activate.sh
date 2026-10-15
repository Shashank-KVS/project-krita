#!/bin/zsh

export PATH="$(cd "$(dirname "${(%):-%x}")" && pwd)/.node-env/bin:$PATH"

echo "Project Krita Node environment activated"
node -v
npm -v
