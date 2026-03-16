# Azaad - The Clarity You Deserve

Azaad is a modern, web-based music player that delivers a clean and immersive listening experience. It features multiple playlist categories, a powerful audio controller, an AI assistant for natural language commands, and a responsive design that works seamlessly across devices.

![Azaad Music Player](Img/New%20Logo.png)

---

## ✨ Features

- **Multiple Playlist Sections** – Trending, New Releases, English, Hindi, Bangla, and Nasheed.
- **Sidebar Navigation** – Quickly jump to Home, Albums, Artists, Favorites, Recently Played, and Your Playlists.
- **Audio Controller** – Play, pause, skip, shuffle, repeat, and adjust volume. Displays current song progress and time.
- **Queue Panel** – View and manage the upcoming songs.
- **AI Assistant** – Ask the AI to play songs (e.g., “Play Espresso”) directly from the chat interface.
- **Theme Toggle** – Switch between light and dark modes.
- **Live Clock Widget** – Displays current time and date (also a mobile‑optimized version).
- **Loading Animation** – Engaging loading screen with progress bar.
- **Responsive Design** – Optimized for desktops, tablets, and mobile phones.
- **Search Bar** – Search for songs, artists, or albums.

---

## 🛠️ Technologies Used

- **HTML5** – Structure of the application.
- **CSS3** – Custom styles, animations, and responsive layout.
- **JavaScript (ES6)** – Dynamic content loading, audio controls, theme switching, AI integration, and interactivity.
- **Font Awesome 6** – Icons for controls and navigation.
- **Google Fonts (Inter)** – Clean and modern typography.

---

## 📁 File Structure

```
azaad-music-player/
├── index.html               # Main HTML file
├── styles.css               # All styling (assumed)
├── script.js                # JavaScript functionality (assumed)
├── Img/                      # Image assets
│   ├── Icon.png
│   ├── New Logo.png
│   ├── Audio-controller.png
│   └── ... (other images)
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).
- No server required – the app runs entirely in the browser.

### Installation

1. **Clone the repository** (or download the ZIP):
   ```bash
   git clone https://github.com/yourusername/azaad-music-player.git
   ```
2. **Navigate to the project folder**:
   ```bash
   cd azaad-music-player
   ```
3. **Open `index.html`** in your browser:
   - Double‑click the file, or
   - Serve it with a local development server (e.g., Live Server in VS Code) for the best experience.

That’s it! The app will load with sample data (you can replace the song lists in `script.js` with your own music).

---

## 🎮 How to Use

### Navigation
- Click the **menu icon** (☰) to open the sidebar and switch between pages.
- Use the **playlist tabs** (Trending, New Songs, etc.) to browse different categories.
- Click **View All** to see the full playlist (currently links to the same section – extend as needed).

### Audio Player
- Click on any song card to start playback.
- Use the bottom controller to **play/pause**, skip, shuffle, repeat, or adjust volume.
- The **progress bar** shows the current playback position – click or drag to seek.
- Click the **queue button** (list icon) to see the upcoming songs.

### AI Assistant
- Click the **chat icon** (💬) in the bottom‑right corner to open the AI assistant.
- Type commands like **“Play Espresso”** – the AI will attempt to find and play that song (requires integration with your song library).
- Close the chat with the **×** button.

### Theme
- Click the **Theme** button in the header to toggle between light and dark modes.

### Clock
- The header displays the current time and date. On mobile, it moves below the header for better readability.

---

## 🧩 Customization

- **Adding Your Own Songs** – Edit the song objects in `script.js` (in the `window.songsData` array or wherever you store them). Follow the existing structure: `{ title, artist, cover, src, category }`.
- **Changing Playlist Categories** – Modify the playlist tabs in the HTML and update the corresponding containers and JavaScript logic.
- **AI Commands** – Enhance the AI logic in `script.js` to handle more natural language queries or integrate with a real backend.

---

## 📱 Responsive Design

- **Desktop** – Full sidebar, horizontal scrollable containers, and expanded audio controller.
- **Tablet & Mobile** – Sidebar becomes a slide‑out overlay, clock widget is repositioned, and containers stack vertically with touch‑friendly scrolling.

---

## 🤝 Contributing

Contributions are welcome! If you’d like to improve the app, please fork the repository and submit a pull request. You can also open issues for bugs or feature requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Inspired by modern music streaming interfaces and the desire for a clean, distraction‑free player.

---

Enjoy your music with **Azaad** – the clarity you deserve.
