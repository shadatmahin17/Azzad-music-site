class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentIndex = 0;
        this.repeat = false;
        this.shuffle = false;
        this.volume = 0.7;
        this.isPlaying = false;
        this.songs = [];
        this.filteredSongs = [];
        this.sidebarOpen = false;
        this.queueOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.currentPlaylist = 'trending';
        this.favorites = JSON.parse(localStorage.getItem('azzad-favorites') || '[]');
        this.recentlyPlayed = JSON.parse(localStorage.getItem('azzad-recently-played') || '[]');
        this.playlists = JSON.parse(localStorage.getItem('azzad-playlists') || '[]');
        this.albums = [];
        this.artists = [];
        this.queue = [];
        this.currentQueueIndex = 0;
        
        this.initElements();
        this.bindEvents();
        this.loadSongs();
        this.initTheme();
        this.initVolume();
        this.initClock();
        this.simulateLoading();
        this.initKeyboardShortcuts();
        this.initAIAssistant();
    }
    
    simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            this.elements.loadingProgress.style.width = `${progress}%`;
            
            if (progress === 100) {
                setTimeout(() => {
                    this.elements.loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        this.elements.loadingScreen.style.display = 'none';
                    }, 500);
                }, 500);
            }
        }, 100);
    }
    
    initElements() {
        this.elements = {
            container: document.getElementById('songsContainer'),
            homePage: document.getElementById('homePage'),
            albumsPage: document.getElementById('albumsPage'),
            favoritesPage: document.getElementById('favoritesPage'),
            historyPage: document.getElementById('historyPage'),
            artistsPage: document.getElementById('artistsPage'),
            playlistsPage: document.getElementById('playlistsPage'),
            aboutPage: document.getElementById('aboutPage'),
            contactPage: document.getElementById('contactPage'),
            searchBar: document.getElementById('searchBar'),
            searchContainer: document.getElementById('searchContainer'),
            startListeningBtn: document.getElementById('startListeningBtn'),
            exploreTrendingBtn: document.getElementById('exploreTrendingBtn'),
            heroFeaturedPlay: document.getElementById('heroFeaturedPlay'),
            generatePlaylistBtn: document.getElementById('generatePlaylistBtn'),
            heroFeaturedTitle: document.getElementById('heroFeaturedTitle'),
            heroFeaturedArtist: document.getElementById('heroFeaturedArtist'),
            heroFeaturedImage: document.getElementById('heroFeaturedImage'),
            searchFilters: document.getElementById('searchFilters'),
            audioController: document.getElementById('audioController'),
            currentTime: document.getElementById('currentTime'),
            totalTime: document.getElementById('totalTime'),
            progressBar: document.getElementById('progressBar'),
            progressFilled: document.getElementById('progressFilled'),
            currentSong: document.getElementById('currentSong'),
            currentArtist: document.getElementById('currentArtist'),
            songCover: document.getElementById('songCover'),
            playBtn: document.getElementById('playBtn'),
            playIcon: document.getElementById('playIcon'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            repeatBtn: document.getElementById('repeatBtn'),
            shuffleBtn: document.getElementById('shuffleBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            queueBtn: document.getElementById('queueBtn'),
            volumeBar: document.getElementById('volumeBar'),
            volumeFilled: document.getElementById('volumeFilled'),
            volumeIcon: document.getElementById('volumeIcon'),
            equalizer: document.getElementById('equalizer'),
            themeToggle: document.getElementById('toggleThemeBtn'),
            themeIcon: document.getElementById('themeIcon'),
            themeText: document.querySelector('.theme-text'),
            menuToggle: document.getElementById('menuToggle'),
            closeSidebar: document.getElementById('closeSidebar'),
            sidebar: document.getElementById('sidebar'),
            sidebarLinks: document.querySelectorAll('.sidebar-link'),
            loadingScreen: document.getElementById('loadingScreen'),
            loadingProgress: document.getElementById('loadingProgress'),
            mobileOverlay: document.getElementById('mobileOverlay'),
            queuePanel: document.getElementById('queuePanel'),
            queueList: document.getElementById('queueList'),
            closeQueue: document.getElementById('closeQueue'),
            createPlaylistBtn: document.getElementById('createPlaylistBtn'),
            
            playlistNav: document.getElementById('playlistNav'),
            playlistTabs: document.querySelectorAll('.playlist-tab'),
            trendingPlaylist: document.getElementById('trendingPlaylist'),
            newPlaylist: document.getElementById('newPlaylist'),
            englishPlaylist: document.getElementById('englishPlaylist'),
            hindiPlaylist: document.getElementById('hindiPlaylist'),
            banglaPlaylist: document.getElementById('banglaPlaylist'),
            nasheedPlaylist: document.getElementById('nasheedPlaylist'),
            
            trendingContainer: document.getElementById('trendingContainer'),
            newContainer: document.getElementById('newContainer'),
            englishContainer: document.getElementById('englishContainer'),
            hindiContainer: document.getElementById('hindiContainer'),
            banglaContainer: document.getElementById('banglaContainer'),
            nasheedContainer: document.getElementById('nasheedContainer'),
            
            clockWidget: document.getElementById('clockWidget'),
            clockTime: document.getElementById('clockTime'),
            clockDate: document.getElementById('clockDate'),
            mobileClock: document.getElementById('mobileClock'),
            mobileClockTime: document.getElementById('mobileClockTime'),
            mobileClockDate: document.getElementById('mobileClockDate'),
            
            albumsContainer: document.getElementById('albumsContainer'),
            favoritesContainer: document.getElementById('favoritesContainer'),
            historyContainer: document.getElementById('historyContainer'),
            artistsContainer: document.getElementById('artistsContainer'),
            playlistsContainer: document.getElementById('playlistsContainer'),
            
            viewAllButtons: document.querySelectorAll('.view-all'),
            filterButtons: document.querySelectorAll('.filter-btn')
        };
    }
    
// Add to the initAIAssistant() method:
initAIAssistant() {
    // Check if AI elements exist in DOM
    if (!document.getElementById('aiChatWrapper')) {
        console.log("AI chat elements not found in DOM");
        return;
    }
    
    this.aiElements = {
        wrapper: document.getElementById('aiChatWrapper'),
        messages: document.getElementById('aiMessages'),
        input: document.getElementById('aiUserInput'),
        send: document.getElementById('sendAiBtn'),
        open: document.getElementById('openAiChat'),
        close: document.getElementById('closeChat')
    };

    // Check if all elements exist
    if (!this.aiElements.wrapper || !this.aiElements.open) {
        console.log("Some AI elements not found");
        return;
    }

    // Bind events safely
    if (this.aiElements.open) {
        this.aiElements.open.onclick = () => this.toggleAIChat(true);
    }
    
    if (this.aiElements.close) {
        this.aiElements.close.onclick = () => this.toggleAIChat(false);
    }
    
    if (this.aiElements.send) {
        this.aiElements.send.onclick = () => this.handleAiSubmit();
    }
    
    if (this.aiElements.input) {
        this.aiElements.input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.handleAiSubmit();
            }
        };
    }

    // Add initial welcome message
    setTimeout(() => {
        this.showAIWelcome();
    }, 1000);
}

showAIWelcome() {
    if (!this.aiElements || !this.aiElements.messages) return;
    
    const welcomeHTML = `
        <div class="ai-welcome">
            <div class="ai-welcome-icon">
                <i class="fas fa-robot"></i>
            </div>
            <div class="ai-welcome-title">Hello! I'm Azaad AI Assistant</div>
            <div class="ai-welcome-text">I can help you control music, change themes, and more. Try these commands:</div>
            <div class="command-examples">
                <div class="command-example" data-cmd="play chaleya">
                    <i class="fas fa-play"></i> "Play Chaleya"
                </div>
                <div class="command-example" data-cmd="switch to dark mode">
                    <i class="fas fa-moon"></i> "Switch to dark mode"
                </div>
                <div class="command-example" data-cmd="volume up">
                    <i class="fas fa-volume-up"></i> "Volume up"
                </div>
                <div class="command-example" data-cmd="next song">
                    <i class="fas fa-forward"></i> "Next song"
                </div>
            </div>
        </div>
    `;
    
    this.aiElements.messages.innerHTML = welcomeHTML;
    
    // Bind quick command clicks
    const examples = this.aiElements.messages.querySelectorAll('.command-example');
    examples.forEach(example => {
        example.onclick = () => {
            this.handleQuickCommand(example.dataset.cmd || example.textContent.trim());
        };
    });
}

toggleAIChat(show) {
    if (!this.aiElements || !this.aiElements.wrapper) return;
    
    if (show) {
        this.aiElements.wrapper.classList.add('active');
        if (this.aiElements.input) {
            this.aiElements.input.focus();
        }
    } else {
        this.aiElements.wrapper.classList.remove('active');
    }
}

handleAiSubmit() {
    if (!this.aiElements || !this.aiElements.input) return;
    
    const text = this.aiElements.input.value.trim();
    if (!text) return;

    this.addChatMessage('user', text);
    this.aiElements.input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    setTimeout(() => {
        this.removeTypingIndicator();
        const response = this.processAICommand(text);
        this.addChatMessage('ai', response);
    }, 600);
}

handleQuickCommand(command) {
    if (!this.aiElements || !this.aiElements.input) return;
    
    this.aiElements.input.value = command;
    this.handleAiSubmit();
}

showTypingIndicator() {
    if (!this.aiElements || !this.aiElements.messages) return;
    
    const typingHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    const typingDiv = document.createElement('div');
    typingDiv.innerHTML = typingHTML;
    this.aiElements.messages.appendChild(typingDiv);
    this.aiElements.messages.scrollTop = this.aiElements.messages.scrollHeight;
}

removeTypingIndicator() {
    if (!this.aiElements || !this.aiElements.messages) return;
    
    const typingIndicator = this.aiElements.messages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

addChatMessage(sender, text) {
    if (!this.aiElements || !this.aiElements.messages) return;
    
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;

    // Render plain text for safer output
    bubble.textContent = text;
    bubble.style.whiteSpace = 'pre-line';
    this.aiElements.messages.appendChild(bubble);
    this.aiElements.messages.scrollTop = this.aiElements.messages.scrollHeight;
}

normalizeCommand(input) {
    return input
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

findPlaylistFromCommand(cmd) {
    const aliases = {
        trending: ['trending', 'trend'],
        new: ['new', 'new songs', 'new releases'],
        english: ['english'],
        hindi: ['hindi'],
        bangla: ['bangla', 'bengali'],
        nasheed: ['nasheed']
    };

    for (const [playlist, words] of Object.entries(aliases)) {
        if (words.some(word => cmd.includes(word))) {
            return playlist;
        }
    }
    return null;
}

findBestSongMatch(term) {
    const q = this.normalizeCommand(term);
    if (!q) return null;

    // Exact/substring match first
    let best = this.songs.find(song => {
        const title = this.normalizeCommand(song.title);
        const artist = this.normalizeCommand(song.artist);
        return title.includes(q) || artist.includes(q) || `${title} ${artist}`.includes(q);
    });
    if (best) return best;

    // Token overlap fallback
    const qTokens = new Set(q.split(' '));
    let bestScore = 0;
    this.songs.forEach(song => {
        const hay = `${this.normalizeCommand(song.title)} ${this.normalizeCommand(song.artist)}`;
        const tokens = new Set(hay.split(' '));
        let overlap = 0;
        qTokens.forEach(t => {
            if (tokens.has(t)) overlap++;
        });
        const score = overlap / Math.max(1, qTokens.size);
        if (score > bestScore) {
            bestScore = score;
            best = song;
        }
    });

    return bestScore >= 0.5 ? best : null;
}

playMatchedSong(song) {
    const inCurrentPlaylist = this.filteredSongs.findIndex(s => s.id === song.id);
    if (inCurrentPlaylist !== -1) {
        this.playSong(inCurrentPlaylist);
        return true;
    }

    const playlist = song.playlist && song.playlist.length > 0 ? song.playlist[0] : this.currentPlaylist;
    this.switchPlaylist(playlist);
    const newIndex = this.filteredSongs.findIndex(s => s.id === song.id);
    if (newIndex !== -1) {
        this.playSong(newIndex);
        return true;
    }
    return false;
}

processAICommand(input) {
    const cmd = this.normalizeCommand(input);

    // Help command
    if (cmd.includes('help') || cmd.includes('what can you do')) {
        return `🎯 I can help you with:
• Playing songs: "Play [song name]"
• Artist play: "Play songs by [artist]"
• Queue: "Add [song] to queue"
• Favorites: "Favorite this song"
• Navigation: "Next song", "Previous song"
• Volume: "Volume up/down", "Mute"
• Playlists: "Switch to [playlist]"
• Theme: "Switch to dark/light mode"
• Playback: "Pause", "Resume", "Stop"`;
    }

    // Greetings
    if (cmd.includes('hello') || cmd.includes('hi') || cmd.includes('hey')) {
        return "👋 Hello! How can I help you with your music today?";
    }

    // Theme toggle
    if (cmd.includes('dark mode') || cmd.includes('light mode') || cmd.includes('theme')) {
        this.toggleTheme();
        const isDark = document.body.classList.contains('dark');
        return `🎨 Switched to ${isDark ? 'dark' : 'light'} mode`;
    }

    // Playlist control
    if (cmd.includes('playlist') || cmd.includes('category') || cmd.includes('switch to')) {
        const playlist = this.findPlaylistFromCommand(cmd);
        if (playlist) {
            this.switchPlaylist(playlist);
            return `📁 Switched to ${this.getPlaylistDisplayName(playlist)} playlist`;
        }
    }

    // Add to favorites
    if (cmd.includes('favorite this') || cmd.includes('like this')) {
        const song = this.filteredSongs[this.currentIndex];
        if (!song) return "❌ No active song to favorite.";
        const isFavorite = this.favorites.some(fav => fav.id === song.id);
        if (isFavorite) {
            return `💖 ${song.title} is already in favorites.`;
        }
        this.toggleFavorite(song);
        return `💖 Added ${song.title} to favorites.`;
    }

    // Add to queue command
    if (cmd.includes('add') && cmd.includes('queue')) {
        const term = cmd.replace('add', '').replace('to queue', '').replace('queue', '').trim();
        const song = this.findBestSongMatch(term);
        if (!song) return `❌ I couldn't find "${term}" in your library.`;
        if (this.queue.some(s => s.id === song.id)) {
            return `📋 ${song.title} is already in queue.`;
        }
        this.queue.push(song);
        if (this.queueOpen) this.renderQueue();
        return `📋 Added ${song.title} to queue.`;
    }

    // Search & Play
    if (cmd.includes('play')) {
        if (cmd.includes('by ')) {
            const artistTerm = cmd.split('by ')[1]?.trim();
            if (!artistTerm) return "❌ Tell me the artist name, like: play songs by Arijit.";
            const artistSong = this.songs.find(song => this.normalizeCommand(song.artist).includes(artistTerm));
            if (!artistSong) return `❌ I couldn't find songs by "${artistTerm}".`;
            this.playMatchedSong(artistSong);
            return `🎵 Playing songs by ${artistSong.artist}. Starting with ${artistSong.title}.`;
        }

        const term = cmd.replace('play', '').trim();
        if (!term) {
            this.togglePlay();
            return "Toggling playback.";
        }
        const found = this.findBestSongMatch(term);

        if (found) {
            this.playMatchedSong(found);
            return `🎵 Now playing ${found.title} by ${found.artist}`;
        }
        return `❌ I couldn't find "${term}" in your library.`;
    }

    // Navigation
    if (cmd.includes('next') || cmd.includes('next song')) {
        this.nextSong();
        const currentSong = this.filteredSongs[this.currentIndex];
        return `⏭️ Playing next track: ${currentSong.title}`;
    }

    if (cmd.includes('previous') || cmd.includes('prev') || cmd.includes('back')) {
        this.prevSong();
        const currentSong = this.filteredSongs[this.currentIndex];
        return `⏮️ Playing previous track: ${currentSong.title}`;
    }

    if (cmd.includes('pause') || cmd.includes('stop')) {
        if (this.isPlaying) {
            this.togglePlay();
            return "⏸️ Playback paused";
        }
        return "⏸️ Music is already paused";
    }

    if (cmd.includes('resume') || cmd.includes('continue') || cmd.includes('play')) {
        if (!this.isPlaying) {
            this.togglePlay();
            return "▶️ Playback resumed";
        }
        return "▶️ Music is already playing";
    }

    // Volume control
    if (cmd.includes('volume')) {
        if (cmd.includes('up') || cmd.includes('increase')) {
            this.volume = Math.min(1, this.volume + 0.2);
            this.audio.volume = this.volume;
            this.updateVolumeUI();
            return `🔊 Volume increased to ${Math.round(this.volume * 100)}%`;
        }
        if (cmd.includes('down') || cmd.includes('decrease')) {
            this.volume = Math.max(0, this.volume - 0.2);
            this.audio.volume = this.volume;
            this.updateVolumeUI();
            return `🔉 Volume decreased to ${Math.round(this.volume * 100)}%`;
        }
        if (cmd.includes('mute')) {
            this.volume = 0;
            this.audio.volume = 0;
            this.updateVolumeUI();
            return "🔇 Volume muted";
        }
        if (cmd.includes('max') || cmd.includes('full')) {
            this.volume = 1;
            this.audio.volume = 1;
            this.updateVolumeUI();
            return "🔊 Volume set to maximum";
        }
    }

    return "🤔 I'm not sure how to do that. Try saying:\n• 'Play [Song Name]'\n• 'Switch to Dark Mode'\n• 'Volume up'\n• 'Next song'\n\nOr ask for 'help' to see all commands.";
}
    
    initClock() {
        // Update clock immediately
        this.updateClock();
        
        // Update clock every second
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
    
    updateClock() {
        const now = new Date();
        
        // Format time (HH:MM:SS)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Format date (Day, Month Date, Year)
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', options);
        
        // Update DOM
        this.elements.clockTime.textContent = timeString;
        this.elements.clockDate.textContent = dateString;
        this.elements.mobileClockTime.textContent = timeString;
        this.elements.mobileClockDate.textContent = dateString;
    }
    
    initVolume() {
        this.audio.volume = this.volume;
        this.updateVolumeUI();
    }
    
    bindEvents() {
        // Audio events
        this.bindAudioEvents();
        
        // UI events
        this.elements.playBtn.addEventListener('click', () => this.togglePlay());
        this.elements.prevBtn.addEventListener('click', () => this.prevSong());
        this.elements.nextBtn.addEventListener('click', () => this.nextSong());
        this.elements.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.elements.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.elements.downloadBtn.addEventListener('click', () => this.downloadSong());
        this.elements.queueBtn.addEventListener('click', () => this.toggleQueue());
        this.elements.closeQueue.addEventListener('click', () => this.toggleQueue(false));
        
        // Progress bar
        this.elements.progressBar.addEventListener('click', (e) => {
            const rect = this.elements.progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audio.currentTime = percent * this.audio.duration;
            this.updateProgress();
        });
        
        // Volume control
        this.elements.volumeBar.addEventListener('click', (e) => {
            const rect = this.elements.volumeBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.volume = Math.max(0, Math.min(1, percent));
            this.audio.volume = this.volume;
            this.updateVolumeUI();
        });
        
        // Search functionality
        this.elements.searchBar.addEventListener('input', () => {
            this.filterSongs(this.elements.searchBar.value.toLowerCase());
        });
        
        // Search filters
        this.elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.elements.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.filterSongs(this.elements.searchBar.value.toLowerCase(), filter);
            });
        });
        
        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());

        if (this.elements.startListeningBtn) {
            this.elements.startListeningBtn.addEventListener('click', () => this.playSong(0));
        }
        if (this.elements.exploreTrendingBtn) {
            this.elements.exploreTrendingBtn.addEventListener('click', () => this.switchPlaylist('trending'));
        }
        if (this.elements.heroFeaturedPlay) {
            this.elements.heroFeaturedPlay.addEventListener('click', () => this.playSong(0));
        }
        if (this.elements.generatePlaylistBtn) {
            this.elements.generatePlaylistBtn.addEventListener('click', () => {
                this.toggleAIChat(true);
                this.showToast('Azaad AI is ready. Try: "Play songs by Arijit"');
            });
        }
        
        // Sidebar toggle
        this.elements.menuToggle.addEventListener('click', () => {
            this.toggleSidebar(true);
        });
        
        this.elements.closeSidebar.addEventListener('click', () => {
            this.toggleSidebar(false);
        });
        
        // Mobile overlay click to close sidebar
        this.elements.mobileOverlay.addEventListener('click', () => {
            this.toggleSidebar(false);
        });
        
        // Sidebar links
        this.elements.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.showPage(page);
                this.elements.sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                this.toggleSidebar(false);
            });
        });

        // Footer navigation links
        document.querySelectorAll('.footer-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.showPage(page);
                this.elements.sidebarLinks.forEach(l => l.classList.remove('active'));
                const matchingSidebarLink = document.querySelector(`.sidebar-link[data-page="${page}"]`);
                if (matchingSidebarLink) matchingSidebarLink.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                }).then(() => {
                    this.showToast('Message sent successfully!');
                    contactForm.reset();
                }).catch(() => {
                    this.showToast('Failed to send message. Please try again.');
                });
            });
        }
        
        // Playlist tab events
        this.elements.playlistTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const playlist = tab.dataset.playlist;
                this.switchPlaylist(playlist);
            });
        });
        
        // View All buttons
        this.elements.viewAllButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const playlist = button.dataset.playlist;
                this.switchPlaylist(playlist);
                this.showPage('home');
            });
        });
        
        // Create playlist button
        this.elements.createPlaylistBtn.addEventListener('click', () => {
            this.createPlaylist();
        });
        
        // Touch events for mobile sidebar swipe
        this.elements.sidebar.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        this.elements.sidebar.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, {passive: true});
        
        // Prevent body scroll when sidebar is open
        this.elements.sidebar.addEventListener('touchmove', (e) => {
            if (this.sidebarOpen) {
                e.preventDefault();
            }
        }, {passive: false});
        
        // Improved scrolling for desktop
        this.initDesktopScrolling();
    }
    
    initDesktopScrolling() {
        // Add mouse wheel scrolling to all containers
        document.querySelectorAll('.container').forEach(container => {
            // Mouse wheel scrolling
            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            });
            
            // Drag scrolling
            let isDown = false;
            let startX;
            let scrollLeft;
            
            container.addEventListener('mousedown', (e) => {
                isDown = true;
                container.style.cursor = 'grabbing';
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });
            
            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.style.cursor = 'grab';
            });
            
            container.addEventListener('mouseup', () => {
                isDown = false;
                container.style.cursor = 'grab';
            });
            
            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                container.scrollLeft = scrollLeft - walk;
            });
            
            // Scroll button functionality
            const wrapper = container.closest('.container-wrapper');
            const leftBtn = wrapper.querySelector('.scroll-btn.left');
            const rightBtn = wrapper.querySelector('.scroll-btn.right');
            const dots = wrapper.querySelectorAll('.scroll-dot');
            
            if (leftBtn && rightBtn) {
                leftBtn.addEventListener('click', () => {
                    container.scrollBy({
                        left: -300,
                        behavior: 'smooth'
                    });
                });
                
                rightBtn.addEventListener('click', () => {
                    container.scrollBy({
                        left: 300,
                        behavior: 'smooth'
                    });
                });
            }
            
            // Update scroll indicators
            container.addEventListener('scroll', () => {
                this.updateScrollIndicators(container, dots);
            });
        });
    }
    
    updateScrollIndicators(container, dots) {
        if (!dots || dots.length === 0) return;
        
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        const activeIndex = Math.floor(scrollPercentage * (dots.length - 1));
        
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Spacebar for play/pause
            if (e.code === 'Space' && !this.isInputElement(e.target)) {
                e.preventDefault();
                this.togglePlay();
            }
            
            // Arrow keys for navigation
            if (e.code === 'ArrowRight' && !this.isInputElement(e.target)) {
                e.preventDefault();
                this.nextSong();
            }
            
            if (e.code === 'ArrowLeft' && !this.isInputElement(e.target)) {
                e.preventDefault();
                this.prevSong();
            }
            
            // Escape key to close sidebar
            if (e.code === 'Escape' && this.sidebarOpen) {
                this.toggleSidebar(false);
            }
            
            // Escape key to close queue
            if (e.code === 'Escape' && this.queueOpen) {
                this.toggleQueue(false);
            }
        });
    }
    
    isInputElement(element) {
        return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
    }
    
    handleSwipe() {
        const difference = this.touchStartX - this.touchEndX;
        if (difference > 50 && this.sidebarOpen) {
            this.toggleSidebar(false);
        }
    }
    
    toggleSidebar(open) {
        this.sidebarOpen = open;
        if (open) {
            this.elements.sidebar.classList.add('active');
            this.elements.mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.elements.sidebar.classList.remove('active');
            this.elements.mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    toggleQueue(open) {
        if (open === undefined) {
            this.queueOpen = !this.queueOpen;
        } else {
            this.queueOpen = open;
        }
        
        if (this.queueOpen) {
            this.elements.queuePanel.classList.add('active');
            this.renderQueue();
        } else {
            this.elements.queuePanel.classList.remove('active');
        }
        
        this.elements.queueBtn.classList.toggle('active', this.queueOpen);
    }
    
    showPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        this.elements.homePage.style.display = 'none';
        this.elements.searchContainer.style.display = 'none';
        
        // Show selected page
        switch(page) {
            case 'home':
            default:
                this.elements.homePage.style.display = 'block';
                this.elements.searchContainer.style.display = 'block';
                this.elements.audioController.classList.remove('hidden');
                break;
            case 'albums':
                this.elements.albumsPage.style.display = 'block';
                this.renderAlbums();
                break;
            case 'favorites':
                this.elements.favoritesPage.style.display = 'block';
                this.renderFavorites();
                break;
            case 'history':
                this.elements.historyPage.style.display = 'block';
                this.renderRecentlyPlayed();
                break;
            case 'artists':
                this.elements.artistsPage.style.display = 'block';
                this.renderArtists();
                break;
            case 'playlists':
                this.elements.playlistsPage.style.display = 'block';
                this.renderPlaylists();
                break;
            case 'about':
                this.elements.aboutPage.style.display = 'block';
                break;
            case 'contact':
                this.elements.contactPage.style.display = 'block';
                break;
        }
    }
    
    bindAudioEvents() {
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
        this.audio.addEventListener('ended', () => this.onSongEnd());
        this.audio.addEventListener('volumechange', () => this.updateVolumeUI());
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            this.showToast('Failed to load audio file');
            this.onPause();
            // Removed auto-next on error
        });
        this.audio.addEventListener('loadstart', () => {
            this.showToast('Loading audio...');
        });
    }
    
    initTheme() {
        const savedTheme = localStorage.getItem('azzad-theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            this.elements.themeIcon.classList.remove('fa-moon');
            this.elements.themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark');
            this.elements.themeIcon.classList.remove('fa-sun');
            this.elements.themeIcon.classList.add('fa-moon');
        }
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('azzad-theme', 'dark');
            this.elements.themeIcon.classList.remove('fa-moon');
            this.elements.themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('azzad-theme', 'light');
            this.elements.themeIcon.classList.remove('fa-sun');
            this.elements.themeIcon.classList.add('fa-moon');
        }
    }
    
    toggleShuffle() {
        this.shuffle = !this.shuffle;
        this.elements.shuffleBtn.classList.toggle('active', this.shuffle);
        this.showToast(this.shuffle ? 'Shuffle: On' : 'Shuffle: Off');
        
        if (this.shuffle) {
            this.shuffleQueue();
        }
    }
    
    shuffleQueue() {
        if (this.queue.length > 1) {
            // Fisher-Yates shuffle algorithm
            for (let i = this.queue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
            }
            this.currentQueueIndex = 0;
            this.renderQueue();
        }
    }
    
    downloadSong() {
        const currentSong = this.filteredSongs[this.currentIndex];
        if (currentSong) {
            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = currentSong.audio;
            link.download = `${currentSong.title} - ${currentSong.artist}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showToast('Download started');
        } else {
            this.showToast('No song to download');
        }
    }
    
    loadSongs() {
        this.songs = [
            {
                id: 1,
                title: "Espresso",
                artist: "Sabrina Carpenter",
                image: "Img/Espresso.jpeg",
                audio: "songs/english /Sabrina Carpenter - Espresso (Official Video).m4a",
                genre: "pop",
                duration: 203,
                trending: true,
                playlist: ["trending", "english"]
            },
            {
                id: 2,
                title: "Jawan-Chaleya",
                artist: "Shilpa Rao, Arijit Singh",
                image: "Img/Chaleya.jpeg",
                audio: "songs/hindi/JAWAN- Chaleya (Hindi) _ Shah Rukh Khan _ Nayanthara _ Atlee _ Anirudh _ Ari.m4a",
                genre: "pop",
                duration: 218,
                trending: true,
                playlist: ["trending"]
            },
            {
                id: 3,
                title: "Favorite",
                artist: "Isabel LaRosa",
                image: "Img/Favorite.png",
                audio: "songs/english /Isabel LaRosa - favorite (Lyrics).m4a",
                genre: "electronic",
                duration: 230,
                trending: true,
                playlist: ["trending", "english"]
            },
            {
                id: 4,
                title: "On My Way",
                artist: "Alan Walker, Sabrina Carpenter & Farruk",
                image: "Img/Alan Walker.jpeg",
                audio: "songs/english /Alan Walker, Sabrina Carpenter & Farruko  - On My Way.m4a",
                genre: "electronic",
                duration: 230,
                trending: true,
                playlist: ["trending", "english"]
            },
            {
                id: 5,
                title: "Alok & Alan Walker",
                artist: "Headlights",
                image: "Img/Alan Walker.jpeg",
                audio: "songs/english /Alok & Alan Walker - Headlights (Marcoz Lima Remix).m4a",
                genre: "electronic",
                duration: 230,
                trending: true,
                playlist: ["trending", "english"]
            },
            {
                id: 6,
                title: "Paththavaikkum",
                artist: "Deepthi Suresh",
                image: "Img/Paththavaikkum.jpeg",
                audio: "songs/Full Video- Paththavaikkum _ Devara _ NTR _ Janhvi Kapoor _ Anirudh _ Deepth.m4a",
                genre: "pop",
                duration: 183,
                trending: false,
                playlist: ["new", "hindi"]
            },
            {
                id: 7,
                title: "Pal Pal",
                artist: "Afusic",
                image: "Img/pal.jpeg",
                audio: "songs/hindi/Afusic - Pal Pal (Official Music Video) Prod. @AliSoomroMusic.m4a",
                genre: "pop",
                duration: 215,
                trending: true,
                playlist: ["trending", "hindi"]
            },
            {
                id: 8,
                title: "Ichchey Manush",
                artist: "Shawon Gaanwala",
                image: "Img/Ichehe manush.jpeg",
                audio: "songs/bangla /Ichchey Manush_256k.mp3",
                genre: "bangla",
                duration: 245,
                trending: false,
                playlist: ["bangla"]
            },
            {
                id: 9,
                title: "Bolona",
                artist: "Munna Islam and TMSakib ",
                image: "Img/bolona.jpeg",
                audio: "songs/bangla /Bolona-mc.mp3",
                genre: "bangla-rock",
                duration: 320,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 10,
                title: "Kodom",
                artist: "Blue Jeans",
                image: "Img/kodom.png",
                audio: "songs/bangla /Blue Jeans - Kodom _ Artwork Video _ Official Lyric Video _ @bbpvibe.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 11,
                title: "Mayabono Biharini",
                artist: "Somlata",
                image: "Img/Mayabono Biharini.jpeg",
                audio: "songs/bangla /Mayabono Biharini from BEDROOM by Somlata.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 12,
                title: "Purnota",
                artist: "Warfaze",
                image: "Img/Purnota.jpeg",
                audio: "songs/bangla /Purnota __ পূর্ণতা __ Warfaze __Album- Shotto.-mc.mp3",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 13,
                title: "Tomake Chai Title Track",
                artist: "Arijit Singh",
                image: "Img/Tomake Chai Title Track.jpeg",
                audio: "songs/bangla /Tomake Chai Title Track _ তোমাকে চাই _ Bonny _ Koushani _ Arijit Singh _ Ind.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 14,
                title: "যদি আবার",
                artist: "Angel Noor",
                image: "Img/Jodi Abar.jpeg",
                audio: "songs/bangla /Jodi Abar_ ( যদি আবার ) OFFICIAL MUSIC VIDEO _ Angel Noor _Bangla new song 2.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 15,
                title: "Shunno",
                artist: "Tanveer Evan",
                image: "Img/Shunno .jpeg",
                audio: "songs/bangla /Shunno (Lyrics) _ Tanveer Evan _ শূন্য _ @TanveerEvan _ Official Lyrics Vide.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 16,
                title: "Moho",
                artist: "Aftermath",
                image: "Img/মোহ-Moho.jpeg",
                audio: "songs/bangla /মোহ-Moho __ Aftermath __ Lyrical Video __ Lyrics Squad __ Trending Bangla Ba.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 17,
                title: "Shudhu Tomake",
                artist: "Aftermath",
                image: "Img/Shudhu Tomake.jpeg",
                audio: "songs/bangla /Shudhu Tomake.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 18,
                title: "পুনর্জন্ম",
                artist: "Aftermath",
                image: "Img/পুনর্জন্ম.jpeg",
                audio: "songs/bangla /পুনর্জন্ম _ PunorJonmo - Condropith(চন্দ্রপীঠ) _ Official music video..m4a",
                genre: "bangla",
                duration: 285,
                trending: true,
                playlist: ["bangla", "new"]
            },
            {
                id: 19,
                title: "Kichhu Manush More Jaay Pochishe",
                artist: "Saif Zohan",
                image: "Img/Kichhu Manush More Jaay Pochishe.jpeg",
                audio: "songs/bangla /কিছু মানুষ মরে যায় পঁচিশে _ Kichhu Manush More Jaay Pochishe _  Saif Zohan _.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 20,
                title: "Tumi",
                artist: "LEVEL FIVE",
                image: "Img/Tumi.jpeg",
                audio: "songs/bangla /LEVEL FIVE - TUMI (Official Lyric Video)-mc.mp3",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 21,
                title: "Baaji",
                artist: "Emon Chowdhury, Hashim Mahmud",
                image: "Img/Baaji .jpeg",
                audio: "songs/bangla /Baaji _ Coke Studio Bangla _ Season 3 _ Emon Chowdhury X Hashim Mahmud.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 22,
                title: "Baje Shobhab",
                artist: "Prithwi Raj",
                image: "Img/Baje Shobhab.jpeg",
                audio: "songs/bangla /Baje Shobhab I Prithwi Raj ft  Rehaan I Jilapi Originals I 2018.m4a",
                genre: "bangla",
                duration: 285,
                trending: false,
                playlist: ["bangla", "new"]
            },
            {
                id: 23,
                title: "Bad Boy",
                artist: "Marwa Loud",
                image: "Img/Bad Boy.jpeg",
                audio: "songs/english /Marwa Loud - Bad Boy (Lyrics)_256k.mp3",
                genre: "pop",
                duration: 200,
                trending: false,
                playlist: ["english"]
            },
            {
                id: 24,
                title: "Animals",
                artist: "Maroon 5",
                image: "Img/Animal.jpeg",
                audio: "songs/english /Maroon 5 - Animals (Lyrics)_256k.mp3",
                genre: "pop",
                duration: 203,
                trending: false,
                playlist: ["english"]
            },
            {
                id: 25,
                title: "PUSH 2 START",
                artist: "Tyla",
                image: "Img/Push 2 Start.jpeg",
                audio: "songs/english /Tyla - PUSH 2 START (Official Audio).m4a",
                genre: "pop",
                duration: 141,
                trending: false,
                playlist: ["english", "new"]
            },
            {
                id: 26,
                title: "Perfect",
                artist: "Ed Sheeran",
                image: "Img/perfect.jpeg",
                audio: "songs/english /Ed Sheeran - Perfect_256k.mp3",
                genre: "electronic",
                duration: 180,
                trending: false,
                playlist: ["new", "english"]
            },
            {
                id: 27,
                title: "Faded",
                artist: "Alan Walker",
                image: "Img/Alan Walker.jpeg",
                audio: "songs/english /Alan Walker - Faded.m4a",
                genre: "electronic",
                duration: 180,
                trending: false,
                playlist: ["new", "english"]
            },
            {
                id: 28,
                title: "Alone",
                artist: "Alan Walker",
                image: "Img/Alan Walker.jpeg",
                audio: "songs/english /Alan Walker - Alone.m4a",
                genre: "electronic",
                duration: 180,
                trending: false,
                playlist: ["new", "english"]
            },
            {
                id: 29,
                title: "Ignite",
                artist: "K-391 & Alan Walker",
                image: "Img/Alan Walker.jpeg",
                audio: "songs/english /K-391 & Alan Walker - Ignite (feat. Julie Bergan & Seungri).m4a",
                genre: "electronic",
                duration: 180,
                trending: false,
                playlist: ["new", "english"]
            },
            {
                id: 30,
                title: "Girls Like You",
                artist: "Maroon 5",
                image: "Img/Girls Like You.jpeg",
                audio: "songs/english /Maroon 5 - Girls Like You ft. Cardi B (Official Music Video).m4a",
                genre: "electronic",
                duration: 180,
                trending: false,
                playlist: ["new", "english"]
            },
            {
                id: 31,
                title: "Shaky",
                artist: "Sanju Rathod, Isha Malviya",
                image: "Img/Shaky.jpeg",
                audio: "songs/hindi/Shaky ( Official @Video ) Sanju Rathod Ft. Isha Malviya _ G-Spark _ New @Mar_256k.mp3",
                genre: "pop",
                duration: 210,
                trending: false,
                playlist: ["new", "hindi"]
            },
            {
                id: 32,
                title: "SADQAY",
                artist: "ASHIR WAJAHAT x NAYEL x NEHAAL NASEEM",
                image: "Img/SADQAY.jpeg",
                audio: "songs/hindi/SADQAY - AASHIR WAJAHAT x NAYEL x NEHAAL NASEEM (MUSIC VIDEO) - KE JANAM PYA.m4a",
                genre: "electronic",
                duration: 195,
                trending: false,
                playlist: ["new", "hindi"]
            },
            {
                id: 33,
                title: "Beqarar Yeh Dil",
                artist: "Asim Azhar & Qir",
                image: "Img/Beqarar Yeh Dil .jpeg",
                audio: "songs/hindi/Beqarar Yeh Dil - Meem Se Mohabbat [ Full OST ] 💞 Singers- Asim Azhar & Qir.m4a",
                genre: "electronic",
                duration: 195,
                trending: true,
                playlist: ["new", "hindi"]
            },
            {
                id: 34,
                title: "Tum Se",
                artist: "ubin Nautiyal",
                image: "Img/Tum Se.jpeg",
                audio: "songs/hindi/Tum Se Full Video - Jalebi _ Jubin Nautiyal _ Rhea & Varun _ Samuel & Akanks.m4a",
                genre: "electronic",
                duration: 195,
                trending: false,
                playlist: ["new", "hindi"]
            },
            {
                id: 35,
                title: "Mayi Ri",
                artist: "Asrar & Waqar Ali",
                image: "Img/Mayi Ri - OST.jpeg",
                audio: "songs/hindi/Mayi Ri - OST _ Audio 🎧 _ Asrar _ Waqar Ali _ ARY Digital.m4a",
                genre: "electronic",
                duration: 195,
                trending: true,
                playlist: ["new", "hindi"]
            },
            {
                id: 36,
                title: "Ehsaas",
                artist: "Duha Shah, Faheem Abdullah, Vaibhav Pani, Hyder Dar",
                image: "Img/Ehsaas.jpeg",
                audio: "songs/hindi/Ehsaas.m4a",
                genre: "electronic",
                duration: 195,
                trending: false,
                playlist: ["new", "hindi"]
            },
            {
                id: 37,
                title: "Sahiba",
                artist: "Aditya Rikhari",
                image: "Img/Sahiba.jpeg",
                audio: "songs/hindi/Sahiba- Aditya Rikhari, Ankita Chhetri .m4a",
                genre: "hindi",
                duration: 240,
                trending: true,
                playlist: ["hindi", "trending"]
            },
            {
                id: 38,
                title: "Apna Bana Le",
                artist: "Arijit Singh",
                image: "Img/Apna Bana Le.jpeg",
                audio: "songs/hindi/Apna Bana Le.m4a",
                genre: "hindi",
                duration: 280,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 39,
                title: "Janiye",
                artist: "Vishal Mishra, Rashmeet Kaur",
                image: "Img/janiye.jpeg",
                audio: "songs/hindi/Janiye _ Music Video _ Chor Nikal Ke Bhaga _ Vishal Mishra, Rashmeet Kaur_ N.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 40,
                title: "Ishq Hai",
                artist: "Mismatched",
                image: "Img/Ishq Hai.jpeg",
                audio: "songs/hindi/Ishq Hai (Official Music Video) _ Mismatched Season 3 _ A Netflix Series _ A_256k.mp3",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 41,
                title: "Ishq",
                artist: "Faheem Abdullah",
                image: "Img/Ishq.jpeg",
                audio: "songs/hindi/Ishq Official Lyrical Video I Amir Ameer _ Faheem Abdullah _ Rauhan Malik I _256k.mp3",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 42,
                title: "Tu Zaroori",
                artist: "Shaarib Sabri, Sunidhi Chauhan",
                image: "Img/Tu Zaroori.jpeg",
                audio: "songs/hindi/Tu Zaroori.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 43,
                title: "Sahiba",
                artist: "Jasleen Royal, Radhikka Madan",
                image: "Img/Sahiba2.jpeg",
                audio: "songs/hindi/Sahiba.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 44,
                title: "HUSN",
                artist: "HUSN",
                image: "Img/HUSN.jpeg",
                audio: "songs/hindi/HUSN- HUSN (Official Video).m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 45,
                title: "Jhol",
                artist: "Annural Khalid, Maanu",
                image: "Img/Jhol.jpeg",
                audio: "songs/hindi/Jhol.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 46,
                title: "Paro",
                artist: "Aditya Rikhari, UNPLG'd",
                image: "Img/paro.jpeg",
                audio: "songs/hindi/Paro.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 47,
                title: "Saiyaara Reprise",
                artist: "Irshad Kamil, Shreya Ghoshal",
                image: "Img/Saiyaara Reprise.jpeg",
                audio: "songs/hindi/Saiyaara Reprise.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 48,
                title: "Sajde",
                artist: "Faheem Abdullah, Huzaif Nazar",
                image: "Img/Sajde.jpeg",
                audio: "songs/hindi/Sajde.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 49,
                title: "Choo Lo",
                artist: "The Local Train",
                image: "Img/Choo loo.jpeg",
                audio: "songs/hindi/The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio).m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 50,
                title: "Tera Hone Laga Hoon",
                artist: "Alisha Chinai, Atif Aslam",
                image: "Img/Tera Hone Laga Hoon.jpeg",
                audio: "songs/hindi/Tera Hone Laga Hoon Lyrical - Ajab Prem Ki Ghazab Kahani _ Atif Aslam _ Ranb.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 51,
                title: "Tum Se",
                artist: "Sachin-Jigar",
                image: "Img/Tum Se (Full Video).jpeg",
                audio: "songs/hindi/Tum Se (Full Video)- Shahid Kapoor, Kriti _ Sachin-Jigar, Raghav Chaitanya, .m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 52,
                title: "Tujhe Sochta Hoon",
                artist: "KK, Pritam Chakraborty",
                image: "Img/Tujhe Sochta Hoon.jpeg",
                audio: "songs/hindi/Tujhe Sochta Hoon.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 53,
                title: "Tujhe Kitna Chahne Lage",
                artist: "Arijit Singh",
                image: "Img/kabir singh.jpeg",
                audio: "songs/hindi/Tujhe Kitna Chahne Lage.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 54,
                title: "Mere Sohneya",
                artist: "Sachet Tandon, Parampara Thakur",
                image: "Img/kabir singh.jpeg",
                audio: "songs/hindi/Mere Sohneya .m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 55,
                title: "Bekhayali",
                artist: "Sachet Tandon",
                image: "Img/kabir singh.jpeg",
                audio: "songs/hindi/Bekhayali.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 56,
                title: "Love is a Waste of Time",
                artist: "AMITABH VARMA, Shantanu Moitra, Shreya Ghoshal, Sonu Nigam",
                image: "Img/Love is a Waste of Time.jpeg",
                audio: "songs/hindi/_Love is a Waste of Time_ FULL VIDEO SONG _ PK _ Aamir Khan _ Anushka Sharma.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 57,
                title: "QATAL",
                artist: "Guru Randhawa",
                image: "Img/Qatal.jpeg",
                audio: "songs/hindi/Guru Randhawa - QATAL - (Official Video)_256k.mp3",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 58,
                title: "CHAL DIYE TUM KAHAN",
                artist: "AUR",
                image: "Img/CHAL DIYE TUM KAHAN.jpeg",
                audio: "songs/hindi/CHAL DIYE TUM KAHAN _ LYRICAL OST _ VIDEO SONG - 4K _ KABHI MAIN KABHI TUM _.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 59,
                title: "Dil Ka Jo Haal Hai",
                artist: "RAJEEV BARNWAL, Lalit Pandit, Abhijeet Bhattacharya, Shreya Ghoshal",
                image: "Img/Dil Ka Jo Haal Hai.jpeg",
                audio: "songs/hindi/Dil Ka Jo Haal Hai.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 60,
                title: "DILBAR",
                artist: "Dhvani Bhanushali, Neha Kakkar, Ikka Singh",
                image: "Img/DILBAR.jpeg",
                audio: "songs/hindi/DILBAR.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 61,
                title: "EK MULAQAT",
                artist: "Altamash Faridi",
                image: "Img/EK MULAQAT.jpeg",
                audio: "songs/hindi/EK MULAQAT Official Video _ Sonali Cable _ Ali Fazal & Rhea Chakraborty _ Ju.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 62,
                title: "Falak Tak Song",
                artist: "Mahalakshmi Iyer, Vishal–Shekhar, Udit Narayan",
                image: "Img/Falak Tak Song.jpeg",
                audio: "songs/hindi/Falak Tak Song.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 63,
                title: "KHAIRIYAT",
                artist: "Pritam",
                image: "Img/KHAIRIYAT.jpeg",
                audio: "songs/hindi/Full Song- KHAIRIYAT (BONUS TRACK) _ CHHICHHORE _ Sushant, Shraddha _ Pritam.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 64,
                title: "Hua Hain Aaj Pehli Baar",
                artist: "Amaal Mallik, Armaan Malik, Palak Muchhal",
                image: "Img/Hua Hain Aaj Pehli Baar.jpeg",
                audio: "songs/hindi/Hua Hain Aaj Pehli Baar FULL VIDEO _ SANAM RE _ Pulkit Samrat, Urvashi Raute.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 65,
                title: "Hum Jee Lenge",
                artist: "Mustafa Zahid",
                image: "Img/Hum Jee Lenge (Rock) - Murder 3.jpeg",
                audio: "songs/hindi/Hum Jee Lenge (Rock) - Murder 3 Official New Song Video feat. Mustafa Zahid.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 66,
                title: "Ishq Sufiyana",
                artist: "Kamal Khan",
                image: "Img/Ishq Sufiyana.jpeg",
                audio: "songs/hindi/Ishq Sufiyana Lyrical _ The Dirty Picture _ Emraan Hashmi,Vidya Balan _ Vish.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 67,
                title: "Jeene Laga Hoon",
                artist: "Atif Aslam, Shreya Ghoshal",
                image: "Img/Jeene Laga Hoon.jpeg",
                audio: "songs/hindi/Jeene Laga Hoon.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 68,
                title: "Kahani Suno 2.0",
                artist: "Kaifi Khalil",
                image: "Img/Kahani Suno 2.0.jpeg",
                audio: "songs/hindi/Kaifi Khalil - Kahani Suno 2.0 [Official Music Video].m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 69,
                title: "Tujh Mein Rab Dikhta Hai",
                artist: "Roopkumar Rathod",
                image: "Img/Tujh Mein Rab Dikhta Hai.jpeg",
                audio: "songs/hindi/Tujh Mein Rab Dikhta Hai Song _ Rab Ne Bana Di Jodi _ Shah Rukh Khan, Anushk.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 70,
                title: "Khuda Jaane",
                artist: "Shilpa Rao, KK, Vishal–Shekhar",
                image: "Img/Khuda Jaane.jpeg",
                audio: "songs/hindi/Khuda Jaane.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 71,
                title: "Khud Ko Tere Paas",
                artist: "Aftab Shivdasani, Tia Bajpa",
                image: "Img/Khud Ko Tere Paas.jpeg",
                audio: "songs/hindi/Lyrical- Khud Ko Tere Paas _ 1920 Evil Returns _ Aftab Shivdasani, Tia Bajpa.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 72,
                title: "Main Agar Kahoon",
                artist: "Sonu Nigam, Shreya Ghoshal",
                image: "Img/Main Agar Kahoon.jpeg",
                audio: "songs/hindi/Main Agar Kahoon.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 73,
                title: "Mareez - E - Ishq",
                artist: "Arijit Singh",
                image: "Img/Mareez - E - Ishq.jpeg",
                audio: "songs/hindi/Mareez - E - Ishq.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 74,
                title: "Pehle Bhi Main",
                artist: "Vishal Mishra, Raj Shekharl",
                image: "Img/Pehle Bhi Main.jpeg",
                audio: "songs/hindi/Pehle Bhi Main.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 75,
                title: "Prem Ki Naiyya",
                artist: "Suzanne D'Mello, Neeraj Shridhar, Pritam Chakraborty",
                image: "Img/Prem Ki Naiyya.jpeg",
                audio: "songs/hindi/Prem Ki Naiyya - Ajab Prem Ki Ghazab Kahani _ Ranbir Kapoor, Katrina _ Neera.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 76,
                title: "Mat Aazma Re",
                artist: "KK, Pritam Chakraborty",
                image: "Img/Mat Aazma Re.jpeg",
                audio: "songs/hindi/Pritam - Mat Aazma Re Full Video_Murder 3_Randeep Hooda_Aditi Rao_KK_Sayeed .m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 77,
                title: "Soni Soni",
                artist: "Darshan Raval, Jonita Gandhi, Rochak Kohli",
                image: "Img/Soni Soni.jpeg",
                audio: "songs/hindi/Soni Soni.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 78,
                title: "Tu Hi Haqeeqat",
                artist: "Irshan Ashraf, Pritam Chakraborty, Javed Ali, Shadab Faridi",
                image: "Img/Tu Hi Haqeeqat.jpeg",
                audio: "songs/hindi/Tu Hi Haqeeqat.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 79,
                title: "Tu Hi Mera",
                artist: "Pritam Chakraborty, Shafqat Amanat Ali",
                image: "Img/Tu Hi Mera.jpeg",
                audio: "songs/hindi/Tu Hi Mera.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 80,
                title: "Tere Sang Yaara",
                artist: "Arko Pravo Mukherjee",
                image: "Img/Tere Sang Yaara.jpeg",
                audio: "songs/hindi/Tere Sang Yaara - Full Video _ Rustom _ Akshay Kumar & Ileana D_cruz _ Arko .m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 81,
                title: "Tu Jaane Na",
                artist: "Atif Aslam, Pritam Chakraborty",
                image: "Img/Tu Jaane Na.jpeg",
                audio: "songs/hindi/Tu Jaane Na.m4a",
                genre: "hindi",
                duration: 290,
                trending: false,
                playlist: ["hindi"]
            },
            {
                id: 82,
                title: "Nahin Milta",
                artist: "Bayaan",
                image: "Img/Nahin Milta.jpeg",
                audio: "songs/nasheed/Bayaan - Nahin Milta (Official Video).m4a",
                genre: "nasheed",
                duration: 320,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 83,
                title: "Hayati (My Life)",
                artist: "Harris J",
                image: "Img/Hayati (My Life).jpeg",
                audio: "songs/nasheed/Harris J - Hayati (My Life) _ Official Music Video.m4a",
                genre: "nasheed",
                duration: 210,
                trending: false,
                playlist: ["nasheed"]
            },
            {
                id: 84,
                title: "The Way of the Tears",
                artist: "Muhammad al Muqit",
                image: "Img/The Way of The Tears .jpeg",
                audio: "songs/nasheed/The Way of The Tears - Exclusive Nasheed - Muhammad al Muqit.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 85,
                title: "Forgive Me Allah - Astagfirullah",
                artist: "Astagfirullah",
                image: "Img/Forgive Me Allah - Astagfirullah.jpeg",
                audio: "songs/nasheed/Forgive Me Allah - Astagfirullah - Heart Touching Nasheed.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 86,
                title: "Antassalam",
                artist: "Maher Zain",
                image: "Img/Antassalam.jpeg",
                audio: "songs/nasheed/Maher Zain - Antassalam - Official Music Video _ ماهر زين - أنت السلام.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 87,
                title: "Rahmatun Lil'Alameen",
                artist: "Maher Zain",
                image: "Img/Rahmatun Lil'Alameen.jpeg",
                audio: "songs/nasheed/Maher Zain - Rahmatun Lil'Alameen (Official Music Video) ماهر زين - رحمةٌ لل.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 88,
                title: "Ya Nabi Salam Alayka",
                artist: "Maher Zain",
                image: "Img/ Ya Nabi Salam Alayka.png",
                audio: "songs/nasheed/Maher Zain - Ya Nabi Salam Alayka (Arabic) _ ماهر زين - يا نبي سلام عليك _ O.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 89,
                title: "Burdah Maula ya Salli",
                artist: "Mesut Kurtis",
                image: "Img/ Burdah Maula ya Salli.jpeg",
                audio: "songs/nasheed/Mesut Kurtis - Burdah Maula ya Salli Official video  مسعود كُرتِس البردة مول.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 90,
                title: "Ya Ilahi",
                artist: "Muad",
                image: "Img/Ya Ilahi.jpeg",
                audio: "songs/nasheed/Muad - Ya Ilahi (Vocals Only).m4a",
                genre: "nasheed",
                duration: 450,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 91,
                title: "Allah Humma",
                artist: "Siedd",
                image: "Img/Allah Humma.jpeg",
                audio: "songs/nasheed/Siedd - Allah Humma _ Vocals Only Nasheed.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 92,
                title: "Siedd - My Beloved",
                artist: "Siedd",
                image: "Img/My Beloved.jpeg",
                audio: "songs/nasheed/Siedd - My Beloved _ Vocals Only Nasheed (Lyric Video).m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            },
            {
                id: 93,
                title: "Tasbih (Vocal Only)",
                artist: " Ayisha Abdul Basith",
                image: "Img/Tasbih (Vocal Only).jpeg",
                audio: "songs/nasheed/Tasbih (Vocal Only) _ Ayisha Abdul Basith.m4a",
                genre: "nasheed",
                duration: 350,
                trending: true,
                playlist: ["nasheed"]
            }
        ];
        
        // Extract albums and artists
        this.extractAlbumsAndArtists();
        
        this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist);
        this.renderSongs();
        this.initFeaturedSong();
        
        // Initialize queue with current playlist
        this.queue = [...this.filteredSongs];
    }

    initFeaturedSong() {
        const featured = this.filteredSongs[0];
        if (!featured) return;

        this.currentIndex = 0;
        this.audio = new Audio(featured.audio);
        this.audio.volume = this.volume;
        this.bindAudioEvents();

        this.elements.audioController.classList.remove('hidden');
        this.elements.currentSong.textContent = featured.title;
        this.elements.currentArtist.textContent = featured.artist;
        this.elements.songCover.src = featured.image;
        this.elements.songCover.alt = `${featured.title} cover`;
        this.elements.totalTime.textContent = this.formatTime(featured.duration);
        this.elements.currentTime.textContent = '0:00';

        if (this.elements.heroFeaturedTitle) this.elements.heroFeaturedTitle.textContent = featured.title;
        if (this.elements.heroFeaturedArtist) this.elements.heroFeaturedArtist.textContent = featured.artist;
        if (this.elements.heroFeaturedImage) this.elements.heroFeaturedImage.src = featured.image;
    }
    
    extractAlbumsAndArtists() {
        // Extract unique albums
        const albumMap = new Map();
        this.songs.forEach(song => {
            // For demo purposes, we'll create albums based on genre
            const albumName = `${song.genre} Hits`;
            if (!albumMap.has(albumName)) {
                albumMap.set(albumName, {
                    id: albumName.toLowerCase().replace(/\s+/g, '-'),
                    name: albumName,
                    artist: "Various Artists",
                    image: song.image,
                    songs: [song]
                });
            } else {
                albumMap.get(albumName).songs.push(song);
            }
        });
        this.albums = Array.from(albumMap.values());
        
        // Extract unique artists
        const artistMap = new Map();
        this.songs.forEach(song => {
            if (!artistMap.has(song.artist)) {
                artistMap.set(song.artist, {
                    name: song.artist,
                    image: song.image,
                    songs: [song]
                });
            } else {
                artistMap.get(song.artist).songs.push(song);
            }
        });
        this.artists = Array.from(artistMap.values());
    }
    
    getSongsByPlaylist(playlistName) {
        return this.songs.filter(song => 
            song.playlist && song.playlist.includes(playlistName)
        );
    }
    
    switchPlaylist(playlistName) {
        // Update active tab
        this.elements.playlistTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.playlist === playlistName);
        });
        
        // Update active playlist section
        document.querySelectorAll('.playlist-section').forEach(section => {
            section.classList.toggle('active', section.id === `${playlistName}Playlist`);
        });
        
        // Update current playlist and filtered songs
        this.currentPlaylist = playlistName;
        this.filteredSongs = this.getSongsByPlaylist(playlistName);
        
        // Update queue with new playlist
        this.queue = [...this.filteredSongs];
        this.currentQueueIndex = 0;
        
        // Render songs for the selected playlist
        this.renderSongs();
        
        // Show toast notification
        this.showToast(`Switched to ${this.getPlaylistDisplayName(playlistName)}`);
    }
    
    getPlaylistDisplayName(playlistName) {
        const displayNames = {
            trending: 'Trending',
            bangla: 'Bangla Songs',
            english: 'English Songs',
            hindi: 'Hindi Songs',
            nasheed: 'Nasheed',
            new: 'New Songs'
        };
        return displayNames[playlistName] || playlistName;
    }
    
    filterSongs(query, filter = 'all') {
        if (!query) {
            this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist);
        } else {
            if (filter === 'songs') {
                this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist).filter(song => 
                    song.title.toLowerCase().includes(query) || 
                    song.artist.toLowerCase().includes(query)
                );
            } else if (filter === 'artists') {
                this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist).filter(song => 
                    song.artist.toLowerCase().includes(query)
                );
            } else if (filter === 'albums') {
                this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist).filter(song => 
                    song.title.toLowerCase().includes(query)
                );
            } else {
                this.filteredSongs = this.getSongsByPlaylist(this.currentPlaylist).filter(song => 
                    song.title.toLowerCase().includes(query) || 
                    song.artist.toLowerCase().includes(query)
                );
            }
        }
        this.renderSongs();
    }
    
    renderSongs() {
        const activePlaylistSection = document.getElementById(`${this.currentPlaylist}Playlist`);
        const container = activePlaylistSection.querySelector('.container');
        
        // Clear existing songs in the active playlist
        const existingCards = container.querySelectorAll('.card');
        existingCards.forEach(card => card.remove());
        
        if (this.filteredSongs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="empty-title">No songs found</h3>
                    <p class="empty-text">Try a different search term</p>
                </div>
            `;
            return;
        }
        
        // Add songs to the active playlist
        this.filteredSongs.forEach((song, index) => {
            const card = this.createSongCard(song, index);
            container.appendChild(card);
        });
    }
    
    createSongCard(song, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = song.id;
        
        let badge = '';
        if (song.trending) {
            badge = '<div class="card-badge">Trending</div>';
        } else if (song.playlist.includes('new')) {
            badge = '<div class="card-badge">New</div>';
        }
        
        const isFavorite = this.favorites.some(fav => fav.id === song.id);
        const favoriteIcon = isFavorite ? 'fas' : 'far';
        
        card.innerHTML = `
            ${badge}
            <div class="card-image-container">
                <img src="${song.image}" alt="${song.title}" class="card-image">
                <div class="card-overlay">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <!-- Improved Favorites Button -->
                <div class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${song.id}">
                    <i class="${favoriteIcon} fa-heart"></i>
                </div>
            </div>
            <div class="card-info">
                <div class="card-content">
                    <h3 class="card-title">${song.title}</h3>
                    <p class="card-artist">${song.artist}</p>
                </div>
                <button class="card-button"><i class="fas fa-play"></i> Play</button>
                <div class="card-stats">
                    <span class="card-duration"><i class="far fa-clock"></i> ${this.formatTime(song.duration)}</span>
                    <span class="card-likes"><i class="${favoriteIcon} fa-heart" data-id="${song.id}"></i> ${Math.floor(Math.random() * 1000) + 100}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', (e) => {
            // Don't trigger play if clicking the favorite icon
            if (!e.target.closest('.favorite-btn')) {
                this.playSong(index);
            }
        });
        
        // Add favorite toggle functionality
        const favoriteBtn = card.querySelector('.favorite-btn');
        const favoriteIconEl = card.querySelector('.favorite-btn i');
        const likesIcon = card.querySelector('.card-likes i');
        
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(song);
            
            // Update the icons
            const isNowFavorite = this.favorites.some(fav => fav.id === song.id);
            favoriteBtn.classList.toggle('active', isNowFavorite);
            favoriteIconEl.classList.toggle('far', !isNowFavorite);
            favoriteIconEl.classList.toggle('fas', isNowFavorite);
            likesIcon.classList.toggle('far', !isNowFavorite);
            likesIcon.classList.toggle('fas', isNowFavorite);
            
            // Add animation effect
            favoriteBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                favoriteBtn.style.transform = 'scale(1)';
            }, 200);
        });
        
        return card;
    }
    
    toggleFavorite(song) {
        const index = this.favorites.findIndex(fav => fav.id === song.id);
        if (index === -1) {
            this.favorites.push(song);
            this.showToast('Added to favorites');
        } else {
            this.favorites.splice(index, 1);
            this.showToast('Removed from favorites');
        }
        localStorage.setItem('azzad-favorites', JSON.stringify(this.favorites));
        
        // Update favorites page if it's active
        if (this.elements.favoritesPage.style.display === 'block') {
            this.renderFavorites();
        }
    }
    
    renderAlbums() {
        const container = this.elements.albumsContainer;
        container.innerHTML = '';
        
        if (this.albums.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-compact-disc"></i>
                    </div>
                    <h3 class="empty-title">No albums found</h3>
                    <p class="empty-text">Albums will appear here</p>
                </div>
            `;
            return;
        }
        
        this.albums.forEach(album => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${album.image}" alt="${album.name}" class="card-image">
                    <div class="card-overlay">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-content">
                        <h3 class="card-title">${album.name}</h3>
                        <p class="card-artist">${album.artist}</p>
                    </div>
                    <button class="card-button"><i class="fas fa-play"></i> Play Album</button>
                    <div class="card-stats">
                        <span class="card-duration"><i class="fas fa-music"></i> ${album.songs.length} songs</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // Play the first song in the album
                const firstSongIndex = this.songs.findIndex(s => s.id === album.songs[0].id);
                if (firstSongIndex !== -1) {
                    this.playSong(firstSongIndex);
                }
            });
            
            container.appendChild(card);
        });
    }
    
    renderFavorites() {
        const container = this.elements.favoritesContainer;
        container.innerHTML = '';
        
        if (this.favorites.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h3 class="empty-title">No favorites yet</h3>
                    <p class="empty-text">Songs you like will appear here</p>
                </div>
            `;
            return;
        }
        
        this.favorites.forEach((song, index) => {
            const card = this.createSongCard(song, index);
            container.appendChild(card);
        });
    }
    
    renderRecentlyPlayed() {
        const container = this.elements.historyContainer;
        container.innerHTML = '';
        
        if (this.recentlyPlayed.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-history"></i>
                    </div>
                    <h3 class="empty-title">No recently played songs</h3>
                    <p class="empty-text">Songs you play will appear here</p>
                </div>
            `;
            return;
        }
        
        this.recentlyPlayed.forEach((song, index) => {
            const card = this.createSongCard(song, index);
            container.appendChild(card);
        });
    }
    
    renderArtists() {
        const container = this.elements.artistsContainer;
        container.innerHTML = '';
        
        if (this.artists.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <h3 class="empty-title">No artists found</h3>
                    <p class="empty-text">Artists will appear here</p>
                </div>
            `;
            return;
        }
        
        this.artists.forEach(artist => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${artist.image}" alt="${artist.name}" class="card-image">
                    <div class="card-overlay">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-content">
                        <h3 class="card-title">${artist.name}</h3>
                        <p class="card-artist">Artist</p>
                    </div>
                    <button class="card-button"><i class="fas fa-play"></i> Play</button>
                    <div class="card-stats">
                        <span class="card-duration"><i class="fas fa-music"></i> ${artist.songs.length} songs</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // Play the first song by the artist
                const firstSongIndex = this.songs.findIndex(s => s.id === artist.songs[0].id);
                if (firstSongIndex !== -1) {
                    this.playSong(firstSongIndex);
                }
            });
            
            container.appendChild(card);
        });
    }
    
    renderPlaylists() {
        const container = this.elements.playlistsContainer;
        container.innerHTML = '';
        
        if (this.playlists.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-list"></i>
                    </div>
                    <h3 class="empty-title">No playlists yet</h3>
                    <p class="empty-text">Create your first playlist to get started</p>
                </div>
            `;
            return;
        }
        
        this.playlists.forEach(playlist => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${playlist.image || 'songs/audio-controller.png'}" alt="${playlist.name}" class="card-image">
                    <div class="card-overlay">
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-content">
                        <h3 class="card-title">${playlist.name}</h3>
                        <p class="card-artist">${playlist.songs.length} songs</p>
                    </div>
                    <button class="card-button"><i class="fas fa-play"></i> Play</button>
                    <div class="card-stats">
                        <span class="card-duration"><i class="fas fa-music"></i> ${playlist.songs.length} songs</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // Set queue to playlist songs and play first song
                this.queue = [...playlist.songs];
                this.currentQueueIndex = 0;
                this.playSong(0);
            });
            
            container.appendChild(card);
        });
    }
    
    createPlaylist() {
        const name = prompt('Enter playlist name:');
        if (name) {
            const newPlaylist = {
                id: Date.now(),
                name: name,
                songs: [],
                image: null
            };
            this.playlists.push(newPlaylist);
            localStorage.setItem('azzad-playlists', JSON.stringify(this.playlists));
            this.renderPlaylists();
            this.showToast(`Playlist "${name}" created`);
        }
    }
    
    renderQueue() {
        const container = this.elements.queueList;
        container.innerHTML = '';
        
        if (this.queue.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-list"></i>
                    </div>
                    <h3 class="empty-title">Queue is empty</h3>
                    <p class="empty-text">Add songs to the queue to see them here</p>
                </div>
            `;
            return;
        }
        
        this.queue.forEach((song, index) => {
            const queueItem = document.createElement('div');
            queueItem.className = `queue-item ${index === this.currentQueueIndex ? 'active' : ''}`;
            queueItem.innerHTML = `
                <img src="${song.image}" alt="${song.title}" class="queue-item-image">
                <div class="queue-item-info">
                    <div class="queue-item-title">${song.title}</div>
                    <div class="queue-item-artist">${song.artist}</div>
                </div>
                <div class="queue-item-duration">${this.formatTime(song.duration)}</div>
            `;
            
            queueItem.addEventListener('click', () => {
                this.currentQueueIndex = index;
                this.playSong(index);
                this.renderQueue();
            });
            
            container.appendChild(queueItem);
        });
    }
    
    playSong(index) {
        try {
            if (index < 0 || index >= this.filteredSongs.length) return;
            
            this.currentIndex = index;
            const song = this.filteredSongs[this.currentIndex];
            
            // Pause current audio first
            this.audio.pause();
            
            // Reset audio element
            this.audio = new Audio(song.audio);
            this.audio.volume = this.volume;
            
            // Add event listeners to the new audio instance
            this.bindAudioEvents();
            
            // Show audio controller
            this.elements.audioController.classList.remove('hidden');
            
            // Update UI
            this.elements.currentSong.textContent = song.title;
            this.elements.currentArtist.textContent = song.artist;
            this.elements.songCover.src = song.image;
            this.elements.songCover.alt = `${song.title} cover`;
            
            // Play after user interaction
            const playPromise = this.audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.onPlay();
                }).catch(error => {
                    console.error("Playback failed:", error);
                    this.showToast('Playback failed. Please check audio file.');
                    this.onPause();
                });
            }
            
            this.updateActiveCard(index);
            
            // Save to recently played
            this.saveToRecentlyPlayed(song);
            
            // Update queue index
            this.currentQueueIndex = this.queue.findIndex(s => s.id === song.id);
            if (this.queueOpen) {
                this.renderQueue();
            }
        } catch (error) {
            console.error("Error playing song:", error);
            this.showToast('Error playing song');
        }
    }
    
    saveToRecentlyPlayed(song) {
        // Remove if already exists
        this.recentlyPlayed = this.recentlyPlayed.filter(item => item.id !== song.id);
        
        // Add to beginning
        this.recentlyPlayed.unshift(song);
        
        // Keep only last 10 songs
        this.recentlyPlayed = this.recentlyPlayed.slice(0, 10);
        
        localStorage.setItem('azzad-recently-played', JSON.stringify(this.recentlyPlayed));
    }
    
    updateActiveCard(index) {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('active');
        });
        
        const cards = document.querySelectorAll('.card');
        if (cards[index]) {
            cards[index].classList.add('active');
        }
    }
    
    togglePlay() {
        if (this.audio.paused) {
            // If song has ended, reset to beginning instead of playing next
            if (this.audio.currentTime >= this.audio.duration - 0.5) {
                this.audio.currentTime = 0;
            }
            
            if (!this.audio.src && this.filteredSongs.length > 0) {
                this.playSong(0);
            } else {
                this.audio.play().catch(error => {
                    console.error("Playback failed:", error);
                    this.showToast('Playback failed');
                });
            }
        } else {
            this.audio.pause();
        }
    }
    
    onPlay() {
        this.isPlaying = true;
        this.elements.playIcon.classList.remove('fa-play');
        this.elements.playIcon.classList.add('fa-pause');
        this.elements.equalizer.classList.add('playing');
        this.elements.playBtn.classList.add('playing');
        this.elements.songCover.classList.add('now-playing');
    }
    
    onPause() {
        this.isPlaying = false;
        this.elements.playIcon.classList.remove('fa-pause');
        this.elements.playIcon.classList.add('fa-play');
        this.elements.equalizer.classList.remove('playing');
        this.elements.playBtn.classList.remove('playing');
        this.elements.songCover.classList.remove('now-playing');
    }
    
    onSongEnd() {
        if (this.repeat) {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            // Song ended - do NOT automatically play next
            this.onPause();
            this.elements.progressFilled.style.width = '100%';
            this.showToast('Song ended');
        }
    }
    
    prevSong() {
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) newIndex = this.filteredSongs.length - 1;
        this.playSong(newIndex);
    }
    
    nextSong() {
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.filteredSongs.length) newIndex = 0;
        this.playSong(newIndex);
    }
    
    toggleRepeat() {
        this.repeat = !this.repeat;
        this.elements.repeatBtn.classList.toggle('active', this.repeat);
        this.showToast(this.repeat ? 'Repeat: On' : 'Repeat: Off');
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            this.elements.progressFilled.style.width = `${percent}%`;
            this.elements.currentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        this.elements.totalTime.textContent = this.formatTime(this.audio.duration);
    }
    
    updateVolumeUI() {
        const percent = this.audio.volume * 100;
        this.elements.volumeFilled.style.width = `${percent}%`;
        
        // Update volume icon based on volume level
        const volumeIcon = this.elements.volumeIcon.querySelector('i');
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-off', 'fa-volume-mute');
        
        if (this.audio.volume === 0) {
            volumeIcon.classList.add('fa-volume-mute');
        } else if (this.audio.volume < 0.5) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-up');
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
});
