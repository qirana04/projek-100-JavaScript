// Daftar kata dan petunjuk
        const words = [
            { word: "JAVASCRIPT", hint: "Bahasa pemrograman untuk web" },
            { word: "HTML", hint: "Bahasa markup untuk membuat halaman web" },
            { word: "CSS", hint: "Bahasa untuk styling halaman web" },
            { word: "PYTHON", hint: "Bahasa pemrograman populer untuk AI" },
            { word: "KOMPUTER", hint: "Alat elektronik untuk memproses data" },
            { word: "INTERNET", hint: "Jaringan global yang menghubungkan komputer" },
            { word: "GITHUB", hint: "Platform untuk menyimpan kode program" },
            { word: "ALGORITMA", hint: "Langkah-langkah logis untuk menyelesaikan masalah" }
        ];

        // Variabel game
        let selectedWord = "";
        let guessedLetters = [];
        let wrongGuesses = 0;
        const maxWrongGuesses = 6;
        let gameOver = false;

        // Elemen DOM
        const wordDisplayElement = document.getElementById("wordDisplay");
        const hangmanDrawingElement = document.getElementById("hangmanDrawing");
        const messageElement = document.getElementById("message");
        const keyboardElement = document.getElementById("keyboard");
        const resetButton = document.getElementById("resetBtn");
        const hintElement = document.getElementById("hint");

        // Gambar hangman
        const hangmanDrawings = [
            `
               +---+
               |   |
                   |
                   |
                   |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
                   |
                   |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
               |   |
                   |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
              /|   |
                   |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
              /|\\  |
                   |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
              /|\\  |
              /    |
                   |
            =========`,
            `
               +---+
               |   |
               O   |
              /|\\  |
              / \\  |
                   |
            =========`
        ];

        // Inisialisasi game
        function initGame() {
            // Pilih kata acak
            const randomIndex = Math.floor(Math.random() * words.length);
            selectedWord = words[randomIndex].word;
            hintElement.textContent = `Petunjuk: ${words[randomIndex].hint}`;
            
            // Reset variabel game
            guessedLetters = [];
            wrongGuesses = 0;
            gameOver = false;
            
            // Update tampilan
            updateWordDisplay();
            updateHangmanDrawing();
            messageElement.textContent = "";
            messageElement.className = "message";
            
            // Buat keyboard
            createKeyboard();
        }

        // Update tampilan kata yang ditebak
        function updateWordDisplay() {
            const display = selectedWord
                .split("")
                .map(letter => guessedLetters.includes(letter) ? letter : "_")
                .join(" ");
            
            wordDisplayElement.textContent = display;
            
            // Cek apakah pemain menang
            if (!display.includes("_")) {
                gameOver = true;
                messageElement.textContent = "Selamat! Anda menang!";
                messageElement.className = "message win";
            }
        }

        // Update gambar hangman
        function updateHangmanDrawing() {
            hangmanDrawingElement.textContent = hangmanDrawings[wrongGuesses];
            
            // Cek apakah pemain kalah
            if (wrongGuesses === maxWrongGuesses) {
                gameOver = true;
                messageElement.textContent = `Game over! Kata yang benar: ${selectedWord}`;
                messageElement.className = "message lose";
            }
        }

        // Buat keyboard
        function createKeyboard() {
            keyboardElement.innerHTML = "";
            
            for (let i = 65; i <= 90; i++) {
                const letter = String.fromCharCode(i);
                const button = document.createElement("button");
                button.className = "key";
                button.textContent = letter;
                button.id = key-`${letter}`;
                
                button.addEventListener("click", () => handleGuess(letter));
                
                keyboardElement.appendChild(button);
            }
        }

        // Handle tebakan pemain
        function handleGuess(letter) {
            if (gameOver) return;
            
            const button = document.getElementById(key-`${letter}`);
            button.disabled = true;
            
            if (guessedLetters.includes(letter)) return;
            
            guessedLetters.push(letter);
            
            if (selectedWord.includes(letter)) {
                button.className = "key correct";
                updateWordDisplay();
            } else {
                button.className = "key wrong";
                wrongGuesses++;
                updateHangmanDrawing();
            }
        }

        // Event listener untuk tombol reset
        resetButton.addEventListener("click", initGame);

        // Event listener untuk keyboard fisik
        document.addEventListener("keydown", (e) => {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                const letter = e.key.toUpperCase();
                const button = document.getElementById(key-`${letter}`);
                if (button && !button.disabled) {
                    button.click();
                }
            }
        });

        // Mulai game
        initGame();