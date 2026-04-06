//@ts-ignore
import { Lib, CFunction, types, stringToBuffer } from "tjs:ffi"
//@ts-ignore
import path from "tjs:path"

//@ts-ignore
const dir = path.dirname(tjs.exePath)
const lib =  new Lib(`${dir}/main.so`)
export const moss_init = new CFunction(lib.symbol("moss_init"), types.sint, [
  types.buffer,
  types.sint,
  types.sint
])
export const moss_should_close = new CFunction(lib.symbol("moss_should_close"), types.sint, [])
export const moss_clear = new CFunction(lib.symbol("moss_clear"), types.void, [])
export const moss_render = new CFunction(lib.symbol("moss_render"), types.void, [])
export const moss_draw_rect = new CFunction(lib.symbol("moss_draw_rect"), types.void, [
  types.sint,
  types.sint,
  types.sint,
  types.sint,
  types.sint,
  types.sint,
  types.sint,
  types.sint,
])

