 // Elemen DOM
        const timerDisplay = document.getElementById('timer');
        const phaseDisplay = document.getElementById('phase');
        const setsDisplay = document.getElementById('sets');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const workTimeInput = document.getElementById('workTime');
        const restTimeInput = document.getElementById('restTime');
        const totalSetsInput = document.getElementById('totalSets');
        
        // Variabel state
        let timer;
        let timeLeft;
        let isRunning = false;
        let isWorkPhase = true;
        let currentSet = 0;
        let totalSets = 3;
        let workTime = 30;
        let restTime = 15;
        
        // Update timer display
        function updateDisplay(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = ` ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Update settings from inputs
        function updateSettings() {
            workTime = parseInt(workTimeInput.value);
            restTime = parseInt(restTimeInput.value);
            totalSets = parseInt(totalSetsInput.value);
            
            // Reset state
            isWorkPhase = true;
            currentSet = 0;
            updatePhaseDisplay();
            updateSetsDisplay();
            
            // Set initial time
            timeLeft = workTime;
            updateDisplay(timeLeft);
        }
        
        // Update phase display
        function updatePhaseDisplay() {
            phaseDisplay.textContent = isWorkPhase ? 'WORK!' : 'REST';
            phaseDisplay.style.color = isWorkPhase ? '#e74c3c' : '#2ecc71';
        }
        
        // Update sets display
        function updateSetsDisplay() {
            setsDisplay.textContent = `Set: ${currentSet}/${totalSets}`;
        }
        
        // Start timer
        function startTimer() {
            if (!isRunning) {
                if (currentSet === 0 && timeLeft === workTime) {
                    currentSet = 1;
                    updateSetsDisplay();
                }
                
                isRunning = true;
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                
                timer = setInterval(() => {
                    timeLeft--;
                    updateDisplay(timeLeft);
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        
                        if (isWorkPhase) {
                            // Switch to rest phase
                            isWorkPhase = false;
                            timeLeft = restTime;
                        } else {
                            // Switch to work phase
                            isWorkPhase = true;
                            timeLeft = workTime;
                            currentSet++;
                            
                            // Check if all sets are done
                            if (currentSet > totalSets) {
                                resetTimer();
                                phaseDisplay.textContent = 'Workout Complete!';
                                phaseDisplay.style.color = '#2c3e50';
                                return;
                            }
                        }
                        
                        updatePhaseDisplay();
                        updateDisplay(timeLeft);
                        startTimer(); // Automatically start next phase
                    }
                }, 1000);
            }
        }
        
        // Pause timer
        function pauseTimer() {
            clearInterval(timer);
            isRunning = false;
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        
        // Reset timer
        function resetTimer() {
            clearInterval(timer);
            isRunning = false;
            isWorkPhase = true;
            currentSet = 0;
            timeLeft = workTime;
            
            updateDisplay(timeLeft);
            updatePhaseDisplay();
            updateSetsDisplay();
            
            startBtn.disabled = false;
            pauseBtn.disabled = true;
        }
        
        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        
        // Update settings when inputs change
        workTimeInput.addEventListener('change', updateSettings);
        restTimeInput.addEventListener('change', updateSettings);
        totalSetsInput.addEventListener('change', updateSettings);
        
        // Initialize
        updateSettings();