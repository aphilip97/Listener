#!/usr/bin/env bash

clear

nodemon --exec "npm run dev" --watch src -e ts,tsx,json,png
