 // Daftar teks untuk diketik
        const texts = [
            "Mengetik dengan cepat dan akurat adalah keterampilan penting di era digital saat ini. Dengan berlatih secara teratur, Anda dapat meningkatkan kecepatan dan ketepatan mengetik Anda.",
            "JavaScript adalah bahasa pemrograman yang sangat populer untuk pengembangan web. Bahasa ini memungkinkan pembuatan halaman web yang interaktif dan dinamis.",
            "Untuk menjadi programmer yang baik, Anda perlu menguasai dasar-dasar algoritma dan struktur data. Latihan yang konsisten adalah kunci untuk meningkatkan keterampilan pemrograman.",
            "HTML dan CSS adalah fondasi dari pengembangan web. HTML digunakan untuk struktur konten, sedangkan CSS digunakan untuk tata letak dan desain visual.",
            "React adalah library JavaScript untuk membangun antarmuka pengguna. React memungkinkan pengembang untuk membuat komponen UI yang dapat digunakan kembali."
        ];

        // Variabel game
        let timer;
        let timeLeft = 60;
        let isTyping = false;
        let startTime;
        let originalText = "";
        let currentText = "";
        let errors = 0;

        // Elemen DOM
        const textDisplayElement = document.getElementById("textDisplay");
        const textInputElement = document.getElementById("textInput");
        const timerElement = document.getElementById("timer");
        const wpmElement = document.getElementById("wpm");
        const cpmElement = document.getElementById("cpm");
        const accuracyElement = document.getElementById("accuracy");
        const startButton = document.getElementById("startBtn");
        const resetButton = document.getElementById("resetBtn");

        // Pilih teks acak
        function getRandomText() {
            return texts[Math.floor(Math.random() * texts.length)];
        }

        // Format waktu
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            return `${mins}:${secs}`;
        }

        // Update timer
        function updateTimer() {
            timeLeft--;
            timerElement.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                finishGame();
            }
        }

        // Mulai game
        function startGame() {
            originalText = getRandomText();
            currentText = "";
            errors = 0;
            timeLeft = 60;
            isTyping = true;
            
            // Reset tampilan
            renderText();
            textInputElement.value = "";
            textInputElement.disabled = false;
            textInputElement.focus();
            
            // Update tombol
            startButton.disabled = true;
            resetButton.disabled = true;
            
            // Mulai timer
            startTime = new Date().getTime();
            timer = setInterval(updateTimer, 1000);
        }

        // Selesai game
        function finishGame() {
            clearInterval(timer);
            isTyping = false;
            textInputElement.disabled = true;
            resetButton.disabled = false;
            
            // Hitung statistik
            calculateStats();
        }

        // Reset game
        function resetGame() {
            clearInterval(timer);
            isTyping = false;
            timeLeft = 60;
            timerElement.textContent = formatTime(timeLeft);
            textInputElement.value = "";
            textInputElement.disabled = true;
            startButton.disabled = false;
            resetButton.disabled = true;
            
            // Reset statistik
            wpmElement.textContent = "0";
            cpmElement.textContent = "0";
            accuracyElement.textContent = "0%";
        }

        // Hitung statistik
        function calculateStats() {
            const endTime = new Date().getTime();
            const totalTimeInMinutes = (60 - timeLeft) / 60;
            
            // Hitung jumlah kata dan karakter
            const words = currentText.trim() === "" ? 0 : currentText.trim().split(/\s+/).length;
            const characters = currentText.length;
            
            // Hitung WPM (kata per menit) dan CPM (karakter per menit)
            const wpm = Math.round(words / totalTimeInMinutes);
            const cpm = Math.round(characters / totalTimeInMinutes);
            
            // Hitung akurasi
            const totalTyped = characters + errors;
            const accuracy = totalTyped > 0 ? Math.round(((characters - errors) / totalTyped) * 100) : 0;
            
            // Update tampilan
            wpmElement.textContent = wpm;
            cpmElement.textContent = cpm;
            accuracyElement.textContent = `${accuracy}%`;
        }

        // Render teks dengan highlight
        function renderText() {
            textDisplayElement.innerHTML = "";
            
            originalText.split("").forEach((char, index) => {
                const span = document.createElement("span");
                
                if (index < currentText.length) {
                    span.className = currentText[index] === char ? "correct" : "incorrect";
                } else if (index === currentText.length) {
                    span.className = "current";
                }
                
                span.textContent = char;
                textDisplayElement.appendChild(span);
            });
        }

        // Event listeners
        startButton.addEventListener("click", startGame);
        resetButton.addEventListener("click", resetGame);

        textInputElement.addEventListener("input", (e) => {
            if (!isTyping) return;
            
            currentText = e.target.value;
            renderText();
            
            // Hitung kesalahan
            errors = 0;
            for (let i = 0; i < currentText.length; i++) {
                if (currentText[i] !== originalText[i]) {
                    errors++;
                }
            }
            
            // Hitung statistik real-time
            const timeElapsedInMinutes = (60 - timeLeft) / 60;
            if (timeElapsedInMinutes > 0) {
                const words = currentText.trim() === "" ? 0 : currentText.trim().split(/\s+/).length;
                const characters = currentText.length;
                
                const wpm = Math.round(words / timeElapsedInMinutes);
                const cpm = Math.round(characters / timeElapsedInMinutes);
                
                const totalTyped = characters + errors;
                const accuracy = totalTyped > 0 ? Math.round(((characters - errors) / totalTyped) * 100) : 0;
                
                wpmElement.textContent = wpm;
                cpmElement.textContent = cpm;
                accuracyElement.textContent = `${accuracy}%`;
            }
            
            // Cek jika teks sudah selesai diketik
            if (currentText.length === originalText.length) {
                finishGame();
            }
        });

        // Inisialisasi
        resetGame();