import { Moss, Rectangle } from "./moss";

Moss.createWindow("Moss", 1280, 720);


while (!Moss.shouldClose()) {

    Moss.clear();

    Rectangle()
        .position(0, 0)
        .size(960, 540)
        .color(75, 128, 202, 255)
        .padding(32, 32)
        .gap(32)
        .contain(
            Rectangle()
                .size(300, 300)
                .color(207, 138, 203, 255)
            
            ,
            
            Rectangle()
                .size(350, 200)
                .color(237, 225, 158, 255)
        )

    

    Moss.render();
}