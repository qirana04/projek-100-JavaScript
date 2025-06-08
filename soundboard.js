 // Sound library
        const soundLibrary = [
            {
                name: "Hujan",
                desc: "Suara hujan deras",
                category: "nature",
                icon: "fas fa-cloud-rain",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-rain-01-124.mp3"
            },
            {
                name: "Guntur",
                desc: "Suara petir menggelegar",
                category: "nature",
                icon: "fas fa-bolt",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-thunder-storm-1490.mp3"
            },
            {
                name: "Ombak",
                desc: "Suara ombak di pantai",
                category: "nature",
                icon: "fas fa-water",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-waves-coming-to-shore-1864.mp3"
            },
            {
                name: "Angin",
                desc: "Suara angin berhembus",
                category: "nature",
                icon: "fas fa-wind",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-1779.mp3"
            },
            {
                name: "Burung",
                desc: "Kicauan burung",
                category: "animals",
                icon: "fas fa-dove",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-birds-chirping-near-the-river-2469.mp3"
            },
            {
                name: "Anjing",
                desc: "Gonggongan anjing",
                category: "animals",
                icon: "fas fa-dog",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-dog-barking-twice-1.mp3"
            },
            {
                name: "Kucing",
                desc: "Suara kucing",
                category: "animals",
                icon: "fas fa-cat",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-cat-meowing-117.mp3"
            },
            {
                name: "Ayam",
                desc: "Kokok ayam jantan",
                category: "animals",
                icon: "fas fa-crow",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-rooster-crowing-1213.mp3"
            },
            {
                name: "Tawa",
                desc: "Suara tawa lepas",
                category: "human",
                icon: "fas fa-laugh",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-funny-laugh-2880.mp3"
            },
            {
                name: "Batuk",
                desc: "Suara batuk",
                category: "human",
                icon: "fas fa-head-side-cough",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-senior-man-coughing-2222.mp3"
            },
            {
                name: "Tepuk Tangan",
                desc: "Suara tepuk tangan",
                category: "human",
                icon: "fas fa-hands-clapping",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-audience-clapping-1480.mp3"
            },
            {
                name: "Bersin",
                desc: "Suara bersin",
                category: "human",
                icon: "fas fa-head-side-cough",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-sneezing-2940.mp3"
            },
            {
                name: "Notifikasi",
                desc: "Suara notifikasi",
                category: "tech",
                icon: "fas fa-bell",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3"
            },
            {
                name: "Kamera",
                desc: "Suara jepretan kamera",
                category: "tech",
                icon: "fas fa-camera",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-camera-shutter-click-1131.mp3"
            },
            {
                name: "Ketik",
                desc: "Suara mengetik keyboard",
                category: "tech",
                icon: "fas fa-keyboard",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-keyboard-typing-1386.mp3"
            },
            {
                name: "Alarm",
                desc: "Suara alarm",
                category: "tech",
                icon: "fas fa-clock",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
            },
            {
                name: "Koin",
                desc: "Suara koin jatuh",
                category: "fun",
                icon: "fas fa-coins",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-coins-handling-1939.mp3"
            },
            {
                name: "Balon",
                desc: "Suara balon meletus",
                category: "fun",
                icon: "fas fa-birthday-cake",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-balloon-pop-2358.mp3"
            },
            {
                name: "Sirene",
                desc: "Suara sirene polisi",
                category: "fun",
                icon: "fas fa-police-car",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-police-siren-1657.mp3"
            },
            {
                name: "Laser",
                desc: "Suara tembakan laser",
                category: "fun",
                icon: "fas fa-bolt",
                url: "https://assets.mixkit.co/sfx/preview/mixkit-laser-gun-shot-1670.mp3"
            }
        ];

        // DOM elements
        const soundGrid = document.getElementById('soundGrid');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const searchBox = document.querySelector('.search-box');
        const volumeSlider = document.getElementById('volumeSlider');
        
        // Global audio context
        let audioContext;
        let globalVolume = 0.5;
        
        // Initialize audio context on first interaction
        function initAudioContext() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }
        
        // Play sound function
        function playSound(url) {
            initAudioContext();
            
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    
                    const gainNode = audioContext.createGain();
                    gainNode.gain.value = globalVolume;
                    
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    source.start(0);
                })
                .catch(error => {
                    console.error('Error playing sound:', error);
                });
        }
        
        // Create sound buttons
        function createSoundButtons(sounds) {
            soundGrid.innerHTML = '';
            
            sounds.forEach(sound => {
                const soundBtn = document.createElement('button');
                soundBtn.className = 'sound-btn';
                soundBtn.setAttribute('data-category', sound.category);
                
                soundBtn.innerHTML = `
                    <div class="sound-icon"><i class="${sound.icon}"></i></div>
                    <div class="sound-name">${sound.name}</div>
                    <div class="sound-desc">${sound.desc}</div>
                `;
                
                soundBtn.addEventListener('click', () => {
                    playSound(sound.url);
                });
                
                soundGrid.appendChild(soundBtn);
            });
        }
        
        // Filter by category
        function filterByCategory(category) {
            if (category === 'all') {
                createSoundButtons(soundLibrary);
            } else {
                const filteredSounds = soundLibrary.filter(sound => sound.category === category);
                createSoundButtons(filteredSounds);
            }
        }
        
        // Search function
        function searchSounds(query) {
            const filteredSounds = soundLibrary.filter(sound => 
                sound.name.toLowerCase().includes(query.toLowerCase()) || 
                sound.desc.toLowerCase().includes(query.toLowerCase())
            );
            createSoundButtons(filteredSounds);
        }
        
        // Event listeners
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterByCategory(btn.dataset.category);
            });
        });
        
        searchBox.addEventListener('input', (e) => {
            searchSounds(e.target.value);
        });
        
        volumeSlider.addEventListener('input', (e) => {
            globalVolume = parseFloat(e.target.value);
        });
        
        // Initialize
        createSoundButtons(soundLibrary);
        
        // Enable audio context on first interaction
        document.body.addEventListener('click', initAudioContext, { once: true });