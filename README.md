# Pixel Zoo

A retro pixel-art zoo tycoon game, inspired by Kairosoft's *Zoo Park Story*. Build a zoo, place animals, hire staff, research new attractions, and grow your rating — all in the browser.

## Gameplay

- **Build:** Place animal enclosures and decorations on a grid to attract visitors.
- **Economy:** Each in-game day, visitors arrive based on your zoo's appeal and pay admission; vendors boost income, keepers and upkeep cost coins.
- **Staff:** Hire Keepers (reduce animal happiness decay), Vendors (boost visitor revenue), and Scientists (generate Research Points).
- **Research:** Spend Research Points to unlock new species and decorations.
- **Rating:** Your zoo's star rating is driven by average animal happiness and species variety.
- **Random events:** Periodic events (sick animals, donors, viral videos, storms...) pause the game and let you choose how to respond.
- **Save:** Progress autosaves to `localStorage`.

## Tech stack

- React + TypeScript, built with Vite
- [Zustand](https://github.com/pmndrs/zustand) for game state, with the `persist` middleware for save/load
- Pixel-art rendering: emoji are rasterized onto a small low-resolution `<canvas>` and scaled up with `image-rendering: pixelated`, giving a chunky retro sprite look without hand-drawn art assets

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # eslint
```
