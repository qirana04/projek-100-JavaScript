const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        
        const bird = {
            x: 50,
            y: canvas.height / 2,
            radius: 20,
            velocity: 0,
            gravity: 0.5,
            jump: -10
        };
        
        const pipes = [];
        let score = 0;
        let gameOver = false;
        let frameCount = 0;
        
        function drawBird() {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function updateBird() {
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            
            // Cek tabrakan dengan tanah atau langit-langit
            if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
                gameOver = true;
            }
        }
        
        function createPipe() {
            const gap = 150;
            const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
            pipes.push({
                x: canvas.width,
                topHeight: topHeight,
                gap: gap,
                width: 50,
                passed: false
            });
        }
        
        function drawPipes() {
            ctx.fillStyle = 'green';
            pipes.forEach(pipe => {
                // Pipe atas
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
                // Pipe bawah
                ctx.fillRect(pipe.x, pipe.topHeight + pipe.gap, pipe.width, canvas.height - pipe.topHeight - pipe.gap);
            });
        }
        
        function updatePipes() {
            if (frameCount % 100 === 0) {
                createPipe();
            }
            
            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].x -= 2;
                
                // Cek tabrakan dengan burung
                if (
                    bird.x + bird.radius > pipes[i].x && 
                    bird.x - bird.radius < pipes[i].x + pipes[i].width && 
                    (bird.y - bird.radius < pipes[i].topHeight || 
                     bird.y + bird.radius > pipes[i].topHeight + pipes[i].gap)
                ) {
                    gameOver = true;
                }
                
                // Cek jika burung melewati pipa
                if (!pipes[i].passed && bird.x > pipes[i].x + pipes[i].width) {
                    pipes[i].passed = true;
                    score++;
                }
                
                // Hapus pipa yang sudah lewat
                if (pipes[i].x + pipes[i].width < 0) {
                    pipes.splice(i, 1);
                }
            }
        }
        
        function drawScore() {
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText`(Skor: ${score}, 10, 40)`;
        }
        
        function gameLoop() {
            if (gameOver) {
                `alert(Game Over! Skor: ${score})`;
                document.location.reload();
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            updateBird();
            updatePipes();
            
            drawBird();
            drawPipes();
            drawScore();
            
            frameCount++;
            requestAnimationFrame(gameLoop);
        }
        
        document.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                bird.velocity = bird.jump;
            }
        });
        
        gameLoop();
