import { Moss, Rectangle } from "./moss";

Moss.createWindow("Moss", 1280, 720);

while (!Moss.shouldClose()) {
    Moss.clear();
    Moss.render();
}