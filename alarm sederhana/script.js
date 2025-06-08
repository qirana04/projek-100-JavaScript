 // Elemen DOM
        const alarmTimeInput = document.getElementById("alarmTime");
        const setAlarmBtn = document.getElementById("setAlarm");
        const stopAlarmBtn = document.getElementById("stopAlarm");
        const statusDiv = document.getElementById("status");
        const alarmSound = document.getElementById("alarmSound");
        
        let alarmInterval;
        let alarmActive = false;

        // Fungsi untuk mengecek alarm
        function checkAlarm() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const currentTime = ` ${hours}:${minutes}`;
            
            if (currentTime === alarmTimeInput.value && !alarmActive) {
                triggerAlarm();
            }
        }

        // Fungsi untuk memicu alarm
        function triggerAlarm() {
            alarmActive = true;
            statusDiv.innerHTML = "ALARM BERBUNYI!";
            statusDiv.className = "alarm-active";
            
            // Mainkan suara alarm
            alarmSound.loop = true;
            alarmSound.play();
            
            // Aktifkan tombol stop
            stopAlarmBtn.disabled = false;
            setAlarmBtn.disabled = true;
        }

        // Fungsi untuk menghentikan alarm
        function stopAlarm() {
            alarmActive = false;
            statusDiv.innerHTML = "Alarm dihentikan";
            statusDiv.className = "";
            
            // Hentikan suara alarm
            alarmSound.pause();
            alarmSound.currentTime = 0;
            
            // Nonaktifkan tombol stop
            stopAlarmBtn.disabled = true;
            setAlarmBtn.disabled = false;
        }

        // Event listeners
        setAlarmBtn.addEventListener("click", function() {
            if (!alarmTimeInput.value) {
                statusDiv.innerHTML = "Silakan set waktu alarm terlebih dahulu";
                return;
            }
            
            clearInterval(alarmInterval);
            alarmInterval = setInterval(checkAlarm, 1000);
            
            const [hours, minutes] = alarmTimeInput.value.split(":");
            statusDiv.innerHTML = ` Alarm disetel untuk ${hours}:${minutes}`;
            statusDiv.className = "";
        });

        stopAlarmBtn.addEventListener("click", stopAlarm);

        // Set waktu default ke menit berikutnya
        window.onload = function() {
            const now = new Date();
            const nextMinute = new Date(now.getTime() + 60000);
            const hours = nextMinute.getHours().toString().padStart(2, '0');
            const minutes = nextMinute.getMinutes().toString().padStart(2, '0');
            alarmTimeInput.value = `${hours}:${minutes}`;
        };