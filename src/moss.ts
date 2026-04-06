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
        (elements[0] as any ).draw()
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

type Vector2 = {
    x: number
    y: number
}

class Element {
    
    private id: number;
    private _size: Size;
    private _color: Color;
    private _padding: Vector2;
    private _gap: number;
    private children: Element[] = [];

    constructor(id: number) {
        this.id = id;
        this._size = {x: 0, y: 0, width: 0, height: 0};
        this._color = {red: 0, green: 0, blue: 0, alpha: 0};
        this._padding = {x: 0, y: 0};
        this._gap = 0;
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
        this._color = {red, green, blue, alpha};
        return this;
    }

    public padding(x: number, y: number) {
        this._padding = {x, y};
        return this;
    }

    public gap(size: number) {
        this._gap = size;
        return this;
    }

    public contain(...elements: Element[]) {
        this.children = elements;
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

        let leftOffset = this._padding.x;

        this.children.forEach((child) => {
            const position: Vector2 = {x: child._size.x + this._size.x, y: child._size.y + this._size.y};
            position.x += leftOffset;
            position.y += this._padding.y;

            child._size.x = position.x;
            child._size.y = position.y; 
            child.draw()

            leftOffset += child._size.width + this._gap;
        })
    }
}

export function Rectangle() {
    elements[index] = new Element(index);
    index += 1;
    return elements[index-1];
}

const m = new Moss();
export { m as Moss }