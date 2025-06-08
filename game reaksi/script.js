const target = document.getElementById('target');
        const reactionTimeDisplay = document.getElementById('reaction-time');
        const averageTimeDisplay = document.getElementById('average-time');
        const attemptsDisplay = document.getElementById('attempts');
        
        const gameArea = document.getElementById('game-area');
        const gameAreaWidth = gameArea.offsetWidth;
        const gameAreaHeight = gameArea.offsetHeight;
        
        let startTime;
        let reactionTimes = [];
        let waitingForClick = false;
        
        function getRandomPosition() {
            const maxX = gameAreaWidth - target.offsetWidth;
            const maxY = gameAreaHeight - target.offsetHeight;
            
            return {
                x: Math.floor(Math.random() * maxX),
                y: Math.floor(Math.random() * maxY)
            };
        }
        
        function showTarget() {
            if (waitingForClick) return;
            
            // Tunggu waktu acak antara 1-3 detik
            const delay = 1000 + Math.random() * 2000;
            
            setTimeout(() => {
                const pos = getRandomPosition();
                target.style.left = `${pos.x}px`;
                target.style.top = `${pos.y}px`;
                target.style.display = 'block';
                
                startTime = Date.now();
                waitingForClick = true;
            }, delay);
        }
        
        target.addEventListener('click', () => {
            if (!waitingForClick) return;
            
            const reactionTime = Date.now() - startTime;
            reactionTimes.push(reactionTime);
            
            reactionTimeDisplay.textContent = reactionTime;
            attemptsDisplay.textContent = reactionTimes.length;
            
            const average = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
            averageTimeDisplay.textContent = Math.round(average);
            
            target.style.display = 'none';
            waitingForClick = false;
            
            showTarget();
        });
        
        showTarget();