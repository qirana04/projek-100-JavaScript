 // Canvas setup
        const canvas = document.getElementById('rainCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Rain variables
        let rainDrops = [];
        let rainIntensity = 800;
        let rainSpeed = 10;
        let rainAngle = 15;
        let rainSize = 2;
        let isRaining = true;
        let lightningActive = false;
        let lightningAlpha = 0;
        
        // Control elements
        const intensitySlider = document.getElementById('rainIntensity');
        const speedSlider = document.getElementById('rainSpeed');
        const angleSlider = document.getElementById('rainAngle');
        const sizeSlider = document.getElementById('rainSize');
        const toggleRainBtn = document.getElementById('toggleRain');
        const lightningBtn = document.getElementById('lightningBtn');
        
        // Resize canvas when window is resized
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Raindrop class
        class RainDrop {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -100;
                this.z = Math.random() * 0.5 + 0.5;
                this.len = Math.random() * 10 + 10 * rainSize * this.z;
                this.speed = (Math.random() * 5 + 5) * rainSpeed * this.z;
            }
            
            update() {
                this.y += this.speed;
                this.x += rainAngle * 0.1 * this.z;
                
                if (this.y > canvas.height || this.x > canvas.width || this.x < 0) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + rainAngle * 0.3, this.y + this.len);
                ctx.strokeStyle = rgba(174, 194, 224, `${this.z * 0.6}`);
                ctx.lineWidth = this.z * rainSize;
                ctx.stroke();
            }
        }
        
        // Initialize rain drops
        function initRain() {
            rainDrops = [];
            for (let i = 0; i < rainIntensity; i++) {
                rainDrops.push(new RainDrop());
            }
        }
        
        // Lightning effect
        function createLightning() {
            lightningActive = true;
            lightningAlpha = 0.8;
            
            // Play thunder sound (optional)
            // const thunder = new Audio('thunder.mp3');
            // thunder.play();
        }
        
        // Animation loop
        function animate() {
            // Clear canvas with semi-transparent black for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw lightning if active
            if (lightningActive) {
                ctx.fillStyle = rgba(255, 255, 255, `${lightningAlpha}`);
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                lightningAlpha -= 0.05;
                
                if (lightningAlpha <= 0) {
                    lightningActive = false;
                }
            }
            
            // Update and draw rain drops
            if (isRaining) {
                for (let drop of rainDrops) {
                    drop.update();
                    drop.draw();
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // Control event listeners
        intensitySlider.addEventListener('input', function() {
            rainIntensity = parseInt(this.value);
            initRain();
        });
        
        speedSlider.addEventListener('input', function() {
            rainSpeed = parseInt(this.value);
        });
        
        angleSlider.addEventListener('input', function() {
            rainAngle = parseInt(this.value);
        });
        
        sizeSlider.addEventListener('input', function() {
            rainSize = parseInt(this.value);
        });
        
        toggleRainBtn.addEventListener('click', function() {
            isRaining = !isRaining;
            this.textContent = isRaining ? 'Pause Rain' : 'Start Rain';
        });
        
        lightningBtn.addEventListener('click', createLightning);
        
        // Random lightning (optional)
        setInterval(() => {
            if (Math.random() < 0.005 && isRaining) { // 0.5% chance every frame
                createLightning();
            }
        }, 1000);
        
        // Initialize and start animation
        initRain();
        animate();