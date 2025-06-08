 const dino = document.getElementById('dino');
        const cactus = document.getElementById('cactus');
        const scoreDisplay = document.getElementById('score');
        const gameOverDisplay = document.getElementById('game-over');
        const startScreen = document.getElementById('start-screen');
        const startButton = document.getElementById('start-button');
        
        let isJumping = false;
        let isGameOver = false;
        let score = 0;
        let gameSpeed = 5;
        let cactusPosition = 800;
        let gameInterval;
        
        function startGame() {
            startScreen.style.display = 'none';
            isGameOver = false;
            score = 0;
            gameSpeed = 5;
            cactusPosition = 800;
            scoreDisplay.textContent = 'Score: 0';
            gameOverDisplay.style.display = 'none';
            dino.style.bottom = '0px';
            
            gameInterval = setInterval(updateGame, 20);
        }
        
        function updateGame() {
            if (isGameOver) return;
            
            // Update cactus position
            cactusPosition -= gameSpeed;
            cactus.style.left = cactusPosition + 'px';
            
            // Reset cactus when it goes off screen
            if (cactusPosition < -20) {
                cactusPosition = 800;
                score++;
                scoreDisplay.textContent = 'Score: ' + score;
                
                // Increase speed every 10 points
                if (score % 10 === 0) {
                    gameSpeed += 0.5;
                }
            }
            
            // Check for collision
            const dinoRect = dino.getBoundingClientRect();
            const cactusRect = cactus.getBoundingClientRect();
            
            if (
                dinoRect.right > cactusRect.left &&
                dinoRect.left < cactusRect.right &&
                dinoRect.bottom > cactusRect.top
            ) {
                gameOver();
            }
        }
        
        function jump() {
            if (isJumping || isGameOver) return;
            
            isJumping = true;
            let jumpHeight = 0;
            let jumpUp = true;
            const jumpInterval = setInterval(() => {
                if (jumpUp) {
                    jumpHeight += 5;
                    if (jumpHeight >= 100) {
                        jumpUp = false;
                    }
                } else {
                    jumpHeight -= 5;
                    if (jumpHeight <= 0) {
                        jumpHeight = 0;
                        clearInterval(jumpInterval);
                        isJumping = false;
                    }
                }
                dino.style.bottom = jumpHeight + 'px';
            }, 20);
        }
        
        function gameOver() {
            isGameOver = true;
            clearInterval(gameInterval);
            gameOverDisplay.style.display = 'block';
        }
        
        function handleKeyDown(event) {
            if (event.code === 'Space') {
                if (isGameOver) {
                    startGame();
                } else if (startScreen.style.display !== 'none') {
                    startGame();
                } else {
                    jump();
                }
                event.preventDefault();
            }
        }
        
        startButton.addEventListener('click', startGame);
        document.addEventListener('keydown', handleKeyDown);