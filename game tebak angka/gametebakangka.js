  const guessInput = document.getElementById('guessInput');
        const guessBtn = document.getElementById('guessBtn');
        const message = document.getElementById('message');
        const attemptsDisplay = document.getElementById('attempts');
        const restartBtn = document.getElementById('restartBtn');
        
        let targetNumber;
        let attempts;
        let gameOver;
        
        function initGame() {
            targetNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            gameOver = false;
            
            message.textContent = '';
            message.className = 'message';
            attemptsDisplay.textContent = 'Jumlah tebakan: 0';
            guessInput.value = '';
            guessInput.disabled = false;
            guessBtn.disabled = false;
            restartBtn.style.display = 'none';
            
            console.log('Angka yang harus ditebak:', targetNumber); // Untuk debugging
        }
        
        function checkGuess() {
            if (gameOver) return;
            
            const guess = parseInt(guessInput.value);
         
            if (isNaN(guess) || guess < 1 || guess > 100) {
                message.textContent = 'Masukkan angka antara 1 sampai 100!';
                message.className = 'message error';
                return;
            }
            
            attempts++;
            attemptsDisplay.textContent = `Jumlah tebakan: ${attempts}`;
            
            if (guess === targetNumber) {
                message.textContent = `Selamat! Anda menebak angka ${targetNumber} dengan ${attempts} percobaan.`;
                message.className = 'message success';
                gameOver = true;
                guessInput.disabled = true;
                guessBtn.disabled = true;
                restartBtn.style.display = 'inline-block';
            } else if (guess < targetNumber) {
                message.textContent = 'Terlalu rendah! Coba angka yang lebih tinggi.';
                message.className = 'message info';
            } else {
                message.textContent = 'Terlalu tinggi! Coba angka yang lebih rendah.';
                message.className = 'message info';
            }
            
            guessInput.value = '';
            guessInput.focus();
        }
        
        guessBtn.addEventListener('click', checkGuess);
        restartBtn.addEventListener('click', initGame);
        
        guessInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });
        
        initGame();
