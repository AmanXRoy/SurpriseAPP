# Surprise Game

A simple, interactive web-based game designed to surprise and engage the user.

## How to Run

1. Open a terminal in this folder.
2. Run `npm install` (if you haven't already).
3. Run `npm run dev` to start the local server.
4. Open the link provided (usually `http://localhost:5173`).

## Customization

### Changing Messages
Open `src/config.js`. You can modify the `steps` array to change the flow, messages, and interaction types.

Available Interaction Types:
- `click`: Simple button.
- `slider`: Drag a slider to the right.
- `hover`: Hover over (or tap) an element for a few seconds.
- `choice`: Pick from options.
- `timer`: Wait for a countdown.
- `reveal`: Final step style.

### Changing Theme
Open `src/style.css` to adjust colors, fonts, and animations.
- `var(--color-bg-1)` and `var(--color-bg-2)` control the background gradient.
- `var(--color-accent)` controls the primary button/highlight color.
