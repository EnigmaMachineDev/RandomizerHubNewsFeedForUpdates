# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static news feed that aggregates curated links to official patch notes for 5 games: Grim Dawn, Path of Exile 2, Soulframe, Warframe, and Space Marine 2. No build step — open `index.html` directly in a browser or serve the directory statically.

No scraping is done due to CORS restrictions; all entries are manually maintained links to official sources.

## Adding or Updating Games

All data lives in the `patchNotesData` array at the top of `script.js`. Each entry follows this shape:

```js
{
    game: 'kebab-case-id',   // used for filter button's data-game attribute
    gameName: 'Display Name',
    updates: [
        {
            title: 'Card title',
            description: 'Short description shown on the card.',
            link: 'https://official-source.com/patch-notes',
            date: 'Visit for latest'  // or 'Archive', 'Steam Updates', etc.
        }
    ]
}
```

To add a new game:
1. Add an entry to `patchNotesData` in `script.js`
2. Add a filter button to `index.html` with `data-game="kebab-case-id"` matching the `game` field

## How Filtering Works

Filter buttons in `index.html` use `data-game` attributes. Clicking a button sets `currentFilter` and calls `filterNews()`, which toggles the `.hidden` class on `.news-card` elements whose `data-game` doesn't match. Cards are shuffled on each load via `shuffleArray()`.

## Styling

CSS variables are defined in `:root` in `style.css`. This site uses a brighter lime-green theme (`--primary-green: #00ff00`) rather than the darker forest-green of the main Randomizer Hub — keep new additions consistent with these variables rather than hardcoding color values.
