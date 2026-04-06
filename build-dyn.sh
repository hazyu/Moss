#!/bin/bash

# Check if the OS is Darwin (macOS)
if [[ "$(uname -s)" == "Darwin" ]]; then
    g++ -shared -fPIC -I /opt/homebrew/Cellar/sdl2/2.32.10/include src-cpp/main.cpp -L /opt/homebrew/Cellar/sdl2/2.32.10/lib -lSDL2 -o main.so
else
    g++ -shared -fPIC src-cpp/main.cpp -lSDL2 -o main.so
fi

