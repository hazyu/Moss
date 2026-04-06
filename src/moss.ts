//@ts-ignore
import { stringToBuffer } from "tjs:ffi";
import { moss_clear, moss_init, moss_render, moss_should_close } from "./ffi";

const elements: Map<number, Element> = new Map();

class Moss {

    public createWindow(title: string, width: number, height: number) {
        const init = moss_init.call(stringToBuffer(title+"\x00"), width, height)
        if (!init) {
            throw new Error("Moss failed window creation");
        }
    }

    public shouldClose() {
        return moss_should_close.call();
    }

    public clear() {
        moss_clear.call();
    }
    
    public render() {
        moss_render.call();
    }
}

class Element {

}

class RectangleClass extends Element {
    public size(width: number, height: number) {
        return this;
    }
}

export function Rectangle() {

    const id = elements.values.length;
    const rect = new RectangleClass();
    elements.set(id, rect);

}

const m = new Moss();
export { m as Moss }