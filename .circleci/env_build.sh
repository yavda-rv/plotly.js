#!/bin/sh
sudo apt-add-repository universe
sudo apt update
sudo apt install python2-minimal

echo python2 version: `python2 -V`

export NODE_OPTIONS='--max-old-space-size=4096' && \
echo "node version: $(node --version)" && \
echo "npm version: $(npm --version)" && \
npm ci && \
npm ls --prod --all
