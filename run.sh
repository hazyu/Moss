#!/bin/bash

./build-dyn.sh;
./tjs-linux bundle src/main.ts;
./tjs-linux compile src/main.bundle.js main;
./main;
rm main;
rm main.so
rm src/main.bundle.js

