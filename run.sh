#!/bin/bash

./build-dyn.sh;

if [[ "$(uname -s)" == "Darwin" ]]; then
    ./tjs-darwin bundle src/main.ts;
    ./tjs-darwin compile src/main.bundle.js main;
else
    ./tjs-linux bundle src/main.ts;
    ./tjs-linux compile src/main.bundle.js main;
fi

./main;
rm main;
rm main.so
rm src/main.bundle.js

