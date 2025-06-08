 // Daftar kota dan zona waktu
        const cities = [
            { name: "Jakarta", timezone: "Asia/Jakarta", flag: "🇮🇩" },
            { name: "Tokyo", timezone: "Asia/Tokyo", flag: "🇯🇵" },
            { name: "London", timezone: "Europe/London", flag: "🇬🇧" },
            { name: "New York", timezone: "America/New_York", flag: "🇺🇸" },
            { name: "Sydney", timezone: "Australia/Sydney", flag: "🇦🇺" },
            { name: "Dubai", timezone: "Asia/Dubai", flag: "🇦🇪" },
            { name: "Paris", timezone: "Europe/Paris", flag: "🇫🇷" },
            { name: "Beijing", timezone: "Asia/Shanghai", flag: "🇨🇳" }
        ];

        // Format waktu
        function formatTime(date) {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            
            // Tambahkan leading zero
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            
            return `${hours}:${minutes}:${seconds}`;
        }

        // Format tanggal
        function formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        }

        // Buat elemen jam untuk setiap kota
        function createClocks() {
            const container = document.getElementById('clocksContainer');
            
            cities.forEach(city => {
                const clockDiv = document.createElement('div');
                clockDiv.className = 'clock';
                clockDiv.innerHTML = `
                    <div class="city">${city.flag} ${city.name}</div>
                    <div class="time" id="time-${city.timezone}">00:00:00</div>
                    <div class="date" id="date-${city.timezone}">Hari, 1 Januari 2023</div>
                    <div class="timezone">${city.timezone}</div>
                `;
                container.appendChild(clockDiv);
            });
        }

        // Update semua jam
        function updateClocks() {
            cities.forEach(city => {
                const options = {
                    timeZone: city.timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };
                
                const dateOptions = {
                    timeZone: city.timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                
                const now = new Date();
                
                // Format waktu sesuai zona waktu
                const timeStr = now.toLocaleTimeString('id-ID', options);
                const dateStr = now.toLocaleDateString('id-ID', dateOptions);
                
                document.getElementById(time-`${city.timezone}`).textContent = timeStr;
                document.getElementById(date-`${city.timezone})`).textContent = dateStr;
            });
        }

        // Inisialisasi
        createClocks();
        updateClocks();
        
        // Update jam setiap detik
        setInterval(updateClocks, 1000);