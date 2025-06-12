# ♟️ Play KingCrab Frontend

This is the React-based frontend for **KingCrab**, a Rust-powered chess engine featuring two AI opponents: a CNN-based engine and a HalfKA neural network-based one. The app allows you to play directly in your browser with a responsive UI built using React, Chakra UI, and `react-chessboard`.

---

## Features

-  Choose between two engine types:
   1) **CNN Bot** – a general-purpose convolutional engine
   2) **HalfKA Bot** – a fast, chess-specialized model
-  Automatically assigns you the **white side**, so you can experiment openings with your opponents
-  Legal move recommendations with distinct styling for:
  - Normal moves (including castling and en-passant)
  - Captures
-  Responsive and minimal UI with dark theme
-  Game-over detection (checkmate, stalemate, draw)
-  API-driven backend communication with persistent engine state

<img src="https://github.com/AlexandruCostea/play_kingcrab_frontend/blob/main/assets/MainPage.png" alt="Main Menu" width="600" height="300"/>
<img src="https://github.com/AlexandruCostea/play_kingcrab_frontend/blob/main/assets/GamePlay.png" alt="Play the Game" width="600" height="300"/>
<img src="https://github.com/AlexandruCostea/play_kingcrab_frontend/blob/main/assets/EndGame.png" alt="End the Game" width="600" height="300"/>


## Tech Stack

- **Frontend:** React + Chakra UI + React Router
- **Board UI:** [`react-chessboard`](https://github.com/Clariity/react-chessboard)
- **Chess Logic:** [`chess.js`](https://github.com/jhlywa/chess.js)

---

## 📦 Setup

### 🔧 Prerequisites

- Node.js (v22 or higher)
- npm
- A running backend: [play_kingcrab_backend](https://github.com/AlexandruCostea/play_kingcrab_backend)


### Install Dependencies

```bash
npm install
```

### Setting up the environment
 - Create a .env file at project root level
 - Fill in the following entry:

```bash
VITE_API_URL=<backend url>
```

### Running the application
```bash
npm run dev
```
