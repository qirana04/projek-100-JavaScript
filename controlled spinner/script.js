const spinner = document.getElementById('spinner');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const reverseBtn = document.getElementById('reverseBtn');
        const speedControl = document.getElementById('speedControl');
        const speedValue = document.getElementById('speedValue');
        
        let animationId;
        let rotation = 0;
        let isSpinning = false;
        let direction = 1; // 1 for clockwise, -1 for counter-clockwise
        let speed = 10;
        
        // Update speed display
        speedControl.addEventListener('input', function() {
            speed = parseInt(this.value);
            speedValue.textContent = speed;
            
            if (isSpinning) {
                stopSpinner();
                startSpinner();
            }
        });
        
        // Start spinner
        startBtn.addEventListener('click', startSpinner);
        
        // Stop spinner
        stopBtn.addEventListener('click', stopSpinner);
        
        // Reverse direction
        reverseBtn.addEventListener('click', function() {
            direction *= -1;
            this.textContent = direction === 1 ? 'Reverse Direction' : 'Normal Direction';
        });
        
        function startSpinner() {
            if (!isSpinning) {
                isSpinning = true;
                startBtn.disabled = true;
                stopBtn.disabled = false;
                animate();
            }
        }
        
        function stopSpinner() {
            if (isSpinning) {
                cancelAnimationFrame(animationId);
                isSpinning = false;
                startBtn.disabled = false;
                stopBtn.disabled = true;
            }
        }
        
        function animate() {
            rotation += direction * (speed / 2);
            spinner.style.transform = rotate`(${rotation}deg)`;
            animationId = requestAnimationFrame(animate);
        }