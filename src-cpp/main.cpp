#include <SDL2/SDL.h>
#include <SDL2/SDL_events.h>
#include <SDL2/SDL_render.h>
#include <SDL2/SDL_video.h>

SDL_Window * window;
SDL_Renderer * renderer;
SDL_Event event;
bool is_running = true;

extern "C" bool moss_init(const char * title, int width, int height) {
  if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
    return false;
  }

  window = SDL_CreateWindow(
    title,
    SDL_WINDOWPOS_CENTERED,
    SDL_WINDOWPOS_CENTERED,
    width, height,
    SDL_WINDOW_RESIZABLE | SDL_WINDOW_ALLOW_HIGHDPI
  );
  if (window == nullptr) {
    return false;
  }
  
  renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
  if (renderer == nullptr) {
    return false;
  }

  return true;
} 

extern "C" bool moss_should_close() {
  
  if (SDL_PollEvent(&event)) {
    if (event.type == SDL_QUIT) {
      is_running = false;
    }
  }
  return !is_running;
}

extern "C" void moss_clear() {
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL_RenderClear(renderer);
}

extern "C" void moss_render() {
  SDL_RenderPresent(renderer);
}

extern "C" void moss_draw_rect(int x, int y, int width, int height, Uint8 r, Uint8 g, Uint8 b, Uint8 a) {
  SDL_SetRenderDrawColor(renderer, r,g,b,a);
  SDL_Rect rect = {x,y,width,height};
  SDL_RenderFillRect(renderer, &rect);
}


int main() {
  return 0;
}
