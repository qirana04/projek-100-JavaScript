 // Music data
        const songs = [
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                cover: "https://i.imgur.com/9O1WqlW.jpg",
                source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            },
            {
                title: "Save Your Tears",
                artist: "The Weeknd",
                cover: "https://i.imgur.com/9O1WqlW.jpg",
                source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
            },
            {
                title: "Starboy",
                artist: "The Weeknd ft. Daft Punk",
                cover: "https://i.imgur.com/9O1WqlW.jpg",
                source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
            }
        ];
        
        // Player elements
        const audio = new Audio();
        const songTitle = document.getElementById('song-title');
        const artist = document.getElementById('artist');
        const cover = document.querySelector('.cover');
        const progressContainer = document.getElementById('progress-container');
        const progress = document.getElementById('progress');
        const currentTimeEl = document.getElementById('current-time');
        const durationEl = document.getElementById('duration');
        const playBtn = document.querySelector('.play-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const volumeSlider = document.getElementById('volume');
        const playlist = document.getElementById('playlist');
        
        // Current song index
        let songIndex = 0;
        let isPlaying = false;
        
        // Initialize player
        function loadSong(song) {
            songTitle.textContent = song.title;
            artist.textContent = song.artist;
            cover.querySelector('img').src = song.cover;
            audio.src = song.source;
            
            // Update playlist active item
            updatePlaylistActive();
        }
        
        // Play song
        function playSong() {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            cover.classList.add('playing');
            audio.play();
        }
        
        // Pause song
        function pauseSong() {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            cover.classList.remove('playing');
            audio.pause();
        }
        
        // Previous song
        function prevSong() {
            songIndex--;
            if (songIndex < 0) {
                songIndex = songs.length - 1;
            }
            loadSong(songs[songIndex]);
            if (isPlaying) {
                playSong();
            }
        }
        
        // Next song
        function nextSong() {
            songIndex++;
            if (songIndex > songs.length - 1) {
                songIndex = 0;
            }
            loadSong(songs[songIndex]);
            if (isPlaying) {
                playSong();
            }
        }
        
        // Update progress bar
        function updateProgress(e) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Update time display
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }
            
            if (durationSeconds) {
                durationEl.textContent = ` ${durationMinutes}:${durationSeconds}`;
            }
            
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
        
        // Set progress when clicked on progress bar
        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        }
        
        // Update playlist active item
        function updatePlaylistActive() {
            const playlistItems = document.querySelectorAll('.playlist-item');
            playlistItems.forEach(item => item.classList.remove('active'));
            playlistItems[songIndex].classList.add('active');
        }
        
        // Initialize playlist
        function initPlaylist() {
            songs.forEach((song, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.classList.add('playlist-item');
                if (index === songIndex) {
                    playlistItem.classList.add('active');
                }
                playlistItem.innerHTML = `
                    <strong>${song.title}</strong> - ${song.artist}
                `;
                playlistItem.addEventListener('click', () => {
                    songIndex = index;
                    loadSong(songs[songIndex]);
                    playSong();
                });
                playlist.appendChild(playlistItem);
            });
        }
        
        // Event listeners
        playBtn.addEventListener('click', () => {
            isPlaying ? pauseSong() : playSong();
        });
        
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        
        progressContainer.addEventListener('click', setProgress);
        
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });
        
        // Initialize
        loadSong(songs[songIndex]);
        initPlaylist();