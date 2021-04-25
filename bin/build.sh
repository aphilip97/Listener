#!/usr/bin/env bash

rm -rf ./dist

rollup -c

cp ./src/manifest.json ./dist/

cp -r ./src/icons ./dist/
