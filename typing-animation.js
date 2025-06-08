// Teks yang akan dianimasikan (bisa diubah)
        const fullText = `Halo! Saya adalah animasi teks mengetik.
        
Fitur ini mensimulasikan proses pengetikan dengan berbagai efek.

Anda dapat:
- Mengontrol kecepatan mengetik
- Menjeda animasi
- Mengulang animasi dari awal

Animasi ini dibuat menggunakan JavaScript murni tanpa library tambahan.

Teknik ini sering digunakan untuk:
• Efek landing page
• Presentasi interaktif
• Tutorial pemrograman

Silakan coba kontrol di bawah untuk mengatur animasi!`;

        // Elemen DOM
        const typingText = document.getElementById('typing-text');
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        const speedControl = document.getElementById('speed');
        const speedValue = document.getElementById('speed-value');
        
        // Variabel kontrol animasi
        let currentText = '';
        let currentIndex = 0;
        let isTyping = false;
        let typingInterval;
        let typingSpeed = 100; // ms per karakter (akan diubah berdasarkan slider)
        
        // Update kecepatan dari slider
        speedControl.addEventListener('input', function() {
            // Konversi dari range 1-20 ke 200-30ms
            typingSpeed = 220 - (this.value * 10);
            speedValue.textContent = this.value;
        });
        
        // Fungsi untuk mengetik
        function type() {
            if (currentIndex < fullText.length) {
                // Tambahkan karakter berikutnya
                currentText += fullText.charAt(currentIndex);
                typingText.textContent = currentText;
                currentIndex++;
                
                // Scroll ke bawah jika perlu
                typingText.scrollTop = typingText.scrollHeight;
                
                // Jadwalkan karakter berikutnya
                typingInterval = setTimeout(type, typingSpeed);
            } else {
                // Animasi selesai
                isTyping = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                
                // Hapus cursor blinking ketika selesai
                typingText.style.borderRight = 'none';
            }
        }
        
        // Mulai animasi
        function startTyping() {
            if (!isTyping) {
                // Jika direset, mulai dari awal
                if (currentIndex >= fullText.length) {
                    currentText = '';
                    currentIndex = 0;
                }
                
                isTyping = true;
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                typingText.style.borderRight = '0.15em solid #0f0'; // Tampilkan cursor
                type();
            }
        }
        
        // Jeda animasi
        function pauseTyping() {
            if (isTyping) {
                clearTimeout(typingInterval);
                isTyping = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                typingText.style.borderRight = '0.15em solid transparent'; // Buat cursor berkedip
            }
        }
        
        // Reset animasi
        function resetTyping() {
            pauseTyping();
            currentText = '';
            currentIndex = 0;
            typingText.textContent = '';
            typingText.style.borderRight = '0.15em solid #0f0'; // Tampilkan cursor
        }
        
        // Event listeners
        startBtn.addEventListener('click', startTyping);
        pauseBtn.addEventListener('click', pauseTyping);
        resetBtn.addEventListener('click', resetTyping);
        
        // Inisialisasi kecepatan
        typingSpeed = 220 - (speedControl.value * 10);
        speedValue.textContent = speedControl.value;