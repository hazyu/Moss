//@ts-ignore
import { stringToBuffer } from "tjs:ffi";
import { moss_clear, moss_draw_rect, moss_init, moss_render, moss_should_close } from "./ffi";

const elements = new Array<Element>(100);
let index = 0;

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
        index = 0;
    }
    
    public render() {
        elements.forEach((element) => {
            (element as any).draw() 
        })

        moss_render.call();
    }
}

type Color =  {
    red: number,
    blue: number,
    green: number,
    alpha: number
}

type Size = {
    x: number,
    y: number,
    width: number,
    height: number
}

class Element {
    
    private id: number;
    private _size: Size;
    private _color: Color;

    constructor(id: number) {
        this.id = id;
        this._size = {x: 0, y: 0, width: 0, height: 0};
        this._color = {red: 0, green: 0, blue: 0, alpha: 0};
    }

    public position(x: number, y: number) {
        this._size.x = x;
        this._size.y = y;
        return this;
    }

    public size(width: number, height: number) {
        this._size.width = width;
        this._size.height = height;
        return this;
    }

    public color(red: number, green: number, blue: number, alpha: number) {
        this._color.red = red;
        this._color.green = green;
        this._color.blue = blue;
        this._color.alpha = alpha;
        return this;
    }

    public contain(...elements: Element[]) {
        elements.forEach((element) => {
            element._size.x += this._size.x;
            element._size.y += this._size.y;
        })
    }

    private draw() {
        moss_draw_rect.call(
            this._size.x,
            this._size.y,
            this._size.width,
            this._size.height,
            this._color.red,
            this._color.green,
            this._color.blue,
            this._color.alpha
        )
    }
}

export function Rectangle() {
    elements[index] = new Element(index);
    index += 1;
    return elements[index-1];
}

const m = new Moss();
export { m as Moss }