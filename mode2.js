   const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Cek preferensi theme dari local storage atau preferensi sistem
        const currentTheme = localStorage.getItem('theme') || 
                            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        // Terapkan theme saat pertama kali load
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Switch to Light Mode';
        }

        // Toggle theme saat tombol diklik
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            const isDarkMode = body.classList.contains('dark-mode');
            themeToggle.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            
            // Simpan preferensi ke local storage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Update jika preferensi sistem berubah
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const newColorScheme = e.matches ? 'dark' : 'light';
            if (newColorScheme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.textContent = 'Switch to Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                themeToggle.textContent = 'Switch to Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });