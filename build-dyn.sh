#!/bin/bash

g++ -shared -fPIC src-cpp/main.cpp -lSDL2 -o main.so
