import { Moss, Rectangle } from "./moss";

Moss.createWindow("Moss", 1280, 720);

while (!Moss.shouldClose()) {
    Moss.clear();

    Rectangle()
        .position(200, 100)
        .size(200, 200)
        .color(255, 0, 0, 255)
        .contain(
            Rectangle()
                .position(50, 50)
                .size(50, 50)
                .color(0, 0, 255, 255)
        )

    Moss.render();
}