 // Inisialisasi canvas
        const canvas = document.getElementById('game-board');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');
        
        // Ukuran grid dan ukuran setiap sel
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        // Variabel game
        let snake = [];
        let food = {};
        let score = 0;
        let velocityX = 0;
        let velocityY = 0;
        let gameSpeed = 100; // ms
        let gameLoop;
        let isGameRunning = false;
        
        // Inisialisasi game
        function initGame() {
            // Reset ular (3 bagian di tengah)
            snake = [
                {x: 10, y: 10},
                {x: 9, y: 10},
                {x: 8, y: 10}
            ];
            
            // Reset skor
            score = 0;
            scoreElement.textContent = `Skor: ${score}`;
            
            // Reset kecepatan
            velocityX = 1;
            velocityY = 0;
            
            // Tempatkan makanan secara acak
            placeFood();
        }
        
        // Tempatkan makanan di posisi acak
        function placeFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            
            // Pastikan makanan tidak muncul di atas ular
            for (let segment of snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    return placeFood();
                }
            }
        }
        
        // Fungsi untuk menggambar game
        function drawGame() {
            // Bersihkan canvas
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Gambar ular
            ctx.fillStyle = 'green';
            for (let segment of snake) {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 1, gridSize - 1);
            }
            
            // Gambar kepala ular (warna berbeda)
            if (snake.length > 0) {
                ctx.fillStyle = 'darkgreen';
                ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 1, gridSize - 1);
            }
            
            // Gambar makanan
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
            
            // Gambar grid
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < tileCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }
        }
        
        // Fungsi untuk update game state
        function updateGame() {
            // Gerakkan ular
            const head = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};
            
            // Cek tabrakan dengan dinding
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                gameOver();
                return;
            }
            
            // Cek tabrakan dengan tubuh sendiri
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameOver();
                    return;
                }
            }
            
            // Tambahkan kepala baru
            snake.unshift(head);
            
            // Cek apakah ular makan makanan
            if (head.x === food.x && head.y === food.y) {
                // Tambah skor
                score++;
                scoreElement.textContent = `Skor: ${score}`;
                
                // Tempatkan makanan baru
                placeFood();
                
                // Tingkatkan kecepatan game setiap 5 poin
                if (score % 5 === 0 && gameSpeed > 50) {
                    gameSpeed -= 5;
                    clearInterval(gameLoop);
                    gameLoop = setInterval(gameStep, gameSpeed);
                }
            } else {
                // Hapus ekor jika tidak makan
                snake.pop();
            }
        }
        
        // Fungsi untuk satu langkah game
        function gameStep() {
            updateGame();
            drawGame();
        }
        
        // Fungsi saat game over
        function gameOver() {
            clearInterval(gameLoop);
            isGameRunning = false;
            `alert(Game Over! Skor Anda: ${score})`;
        }
        
        // Mulai game
        function startGame() {
            if (isGameRunning) return;
            
            initGame();
            isGameRunning = true;
            gameLoop = setInterval(gameStep, gameSpeed);
        }
        
        // Event listener untuk tombol
        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', function() {
            clearInterval(gameLoop);
            startGame();
        });
        
        // Kontrol keyboard
        document.addEventListener('keydown', function(e) {
            if (!isGameRunning) return;
            
            // Cegah gerakan berlawanan
            switch(e.key) {
                case 'ArrowUp':
                    if (velocityY !== 1) {
                        velocityX = 0;
                        velocityY = -1;
                    }
                    break;
                case 'ArrowDown':
                    if (velocityY !== -1) {
                        velocityX = 0;
                        velocityY = 1;
                    }
                    break;
                case 'ArrowLeft':
                    if (velocityX !== 1) {
                        velocityX = -1;
                        velocityY = 0;
                    }
                    break;
                case 'ArrowRight':
                    if (velocityX !== -1) {
                        velocityX = 1;
                        velocityY = 0;
                    }
                    break;
            }
        });
        
        // Gambar layar awal
        initGame();
        drawGame();