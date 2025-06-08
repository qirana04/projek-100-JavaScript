const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        
        // Paddle
        const paddle = {
            width: 100,
            height: 15,
            x: canvas.width / 2 - 50,
            y: canvas.height - 30,
            speed: 8,
            dx: 0
        };
        
        // Bola
        const ball = {
            radius: 10,
            x: canvas.width / 2,
            y: canvas.height - 50,
            speed: 4,
            dx: 4,
            dy: -4
        };
        
        // Bata
        const brick = {
            row: 5,
            col: 9,
            width: 75,
            height: 20,
            padding: 15,
            offsetTop: 60,
            offsetLeft: 60,
            visible: true
        };
        
        // Buat bata
        const bricks = [];
        for (let r = 0; r < brick.row; r++) {
            bricks[r] = [];
            for (let c = 0; c < brick.col; c++) {
                bricks[r][c] = { 
                    x: c * (brick.width + brick.padding) + brick.offsetLeft, 
                    y: r * (brick.height + brick.padding) + brick.offsetTop, 
                    visible: true 
                };
            }
        }
        
        let score = 0;
        let gameOver = false;
        
        // Gambar paddle
        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
            ctx.fillStyle = '#333';
            ctx.fill();
            ctx.closePath();
        }
        
        // Gambar bola
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#f00';
            ctx.fill();
            ctx.closePath();
        }
        
        // Gambar bata
        function drawBricks() {
            bricks.forEach(row => {
                row.forEach(brick => {
                    if (brick.visible) {
                        ctx.beginPath();
                        ctx.rect(brick.x, brick.y, brick.width, brick.height);
                        ctx.fillStyle = '#0095DD';
                        ctx.fill();
                        ctx.closePath();
                    }
                });
            });
        }
        
        // Gambar skor
        function drawScore() {
            ctx.font = '20px Arial';
            ctx.fillText`(Skor: ${score}, 10, 30)`;
        }
        
        // Gerakan paddle
        function movePaddle() {
            paddle.x += paddle.dx;
            
            // Batas dinding
            if (paddle.x < 0) paddle.x = 0;
            if (paddle.x + paddle.width > canvas.width) {
                paddle.x = canvas.width - paddle.width;
            }
        }
        
        // Gerakan bola
        function moveBall() {
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            // Deteksi tabrakan dinding
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx *= -1;
            }
            
            // Deteksi tabrakan langit-langit
            if (ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }
            
            // Deteksi tabrakan paddle
            if (
                ball.y + ball.radius > paddle.y &&
                ball.y + ball.radius < paddle.y + paddle.height &&
                ball.x > paddle.x &&
                ball.x < paddle.x + paddle.width
            ) {
                ball.dy = -ball.speed;
            }
            
            // Deteksi bola jatuh
            if (ball.y + ball.radius > canvas.height) {
                gameOver = true;
            }
            
            // Deteksi tabrakan bata
            bricks.forEach(row => {
                row.forEach(brick => {
                    if (brick.visible) {
                        if (
                            ball.x + ball.radius > brick.x &&
                            ball.x - ball.radius < brick.x + brick.width &&
                            ball.y + ball.radius > brick.y &&
                            ball.y - ball.radius < brick.y + brick.height
                        ) {
                            ball.dy *= -1;
                            brick.visible = false;
                            score++;
                            
                            // Cek jika semua bata hancur
                            if (score === brick.row * brick.col) {
                                gameOver = true;
                            }
                        }
                    }
                });
            });
        }
        
        // Update game
        function update() {
            if (gameOver) {
                `alert(Game Over! Skor: ${score})`;
                document.location.reload();
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawBricks();
            drawPaddle();
            drawBall();
            drawScore();
            
            movePaddle();
            moveBall();
            
            requestAnimationFrame(update);
        }
        
        // Event listeners
        document.addEventListener('keydown', e => {
            if (e.key === 'Right' || e.key === 'ArrowRight') {
                paddle.dx = paddle.speed;
            } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
                paddle.dx = -paddle.speed;
            }
        });
        
        document.addEventListener('keyup', () => {
            paddle.dx = 0;
        });
        
        update();