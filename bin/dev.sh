#!/usr/bin/env bash

rm -rf ./output

rollup -c --environment DEV

cp ./src/manifest.json ./output/

cp -r ./src/icons ./output/

source .env

if
    [[ -z "${OUTDIR}" ]]
then
    echo "build:log -> $OUTDIR env var not specified.";
    echo "build:log -> Defaulting to ./output/"
else
    rm -rf "$OUTDIR"
    mv ./output "$OUTDIR"
fi
