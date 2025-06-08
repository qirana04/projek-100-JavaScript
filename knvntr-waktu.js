 // DOM Elements
        const inputDate = document.getElementById('inputDate');
        const inputTimezone = document.getElementById('inputTimezone');
        const inputFormat = document.getElementById('inputFormat');
        const outputTimezone = document.getElementById('outputTimezone');
        const outputFormat = document.getElementById('outputFormat');
        const convertedResult = document.getElementById('convertedResult');
        const convertBtn = document.getElementById('convertBtn');
        const resetBtn = document.getElementById('resetBtn');
        const currentTimeBtn = document.getElementById('currentTimeBtn');
        
        // Additional time info elements
        const utcTimeElement = document.getElementById('utcTime');
        const unixTimeElement = document.getElementById('unixTime');
        const yearElement = document.getElementById('year');
        const dayOfWeekElement = document.getElementById('dayOfWeek');
        
        // Initialize with current time
        function setCurrentTime() {
            const now = new Date();
            const localDateTime = formatDateToLocalInput(now);
            inputDate.value = localDateTime;
            convertTime();
        }
        
        // Format date for datetime-local input
        function formatDateToLocalInput(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return ${year}-${month}-${day}T${hours}:${minutes};
        }
        
        // Convert timezone names to display names
        function getTimezoneDisplayName(timezone) {
            const timezoneNames = {
                'local': 'Waktu Lokal',
                'UTC': 'UTC',
                'America/New_York': 'New York',
                'America/Los_Angeles': 'Los Angeles',
                'Europe/London': 'London',
                'Europe/Paris': 'Paris',
                'Asia/Tokyo': 'Tokyo',
                'Asia/Shanghai': 'Shanghai',
                'Australia/Sydney': 'Sydney'
            };
            
            return timezoneNames[timezone] || timezone;
        }
        
        // Format date according to selected format
        function formatDate(date, format) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            
            const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const dayName = daysOfWeek[date.getDay()];
            
            switch(format) {
                case 'full':
                    return ${day}/${month}/${year} ${hours}:${minutes}:${seconds};
                case 'dateOnly':
                    return ${day}/${month}/${year};
                case 'timeOnly':
                    return ${hours}:${minutes}:${seconds};
                case 'iso':
                    return date.toISOString();
                case 'unix':
                    return Math.floor(date.getTime() / 1000);
                default:
                    return date.toString();
            }
        }
        
        // Convert time between timezones
        function convertTime() {
            if (!inputDate.value) {
                convertedResult.textContent = 'Masukkan waktu terlebih dahulu';
                return;
            }
            
            try {
                // Create date object from input
                const inputDateTime = new Date(inputDate.value);
                
                if (isNaN(inputDateTime.getTime())) {
                    throw new Error('Format waktu tidak valid');
                }
                
                // Get input and output timezones
                const inputTz = inputTimezone.value;
                const outputTz = outputTimezone.value;
                
                // For simplicity, we'll use the local timezone and UTC
                // In a real app, you would use a library like moment-timezone for proper timezone conversion
                let outputDate;
                
                if (inputTz === 'UTC' && outputTz !== 'UTC') {
                    // Convert from UTC to local
                    outputDate = new Date(inputDateTime.toISOString());
                } else if (inputTz !== 'UTC' && outputTz === 'UTC') {
                    // Convert from local to UTC
                    outputDate = new Date(inputDateTime.getTime() - (inputDateTime.getTimezoneOffset() * 60000));
                } else {
                    // Same timezone or both UTC/local (no conversion needed)
                    outputDate = new Date(inputDateTime);
                }
                
                // Format the result
                const formattedResult = formatDate(outputDate, outputFormat.value);
                convertedResult.textContent = formattedResult;
                
                // Update additional time info
                updateAdditionalTimeInfo(inputDateTime);
                
            } catch (error) {
                convertedResult.textContent = Error: ${error.message};
            }
        }
        
        // Update additional time information
        function updateAdditionalTimeInfo(date) {
            // UTC Time
            const utcString = date.toUTCString();
            utcTimeElement.textContent = utcString.split(' ')[4];
            
            // UNIX Timestamp
            const unixTimestamp = Math.floor(date.getTime() / 1000);
            unixTimeElement.textContent = unixTimestamp;
            
            // Year
            yearElement.textContent = date.getFullYear();
            
            // Day of week
            const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            dayOfWeekElement.textContent = days[date.getDay()];
        }
        
        // Reset form
        function resetForm() {
            inputDate.value = '';
            inputTimezone.value = 'local';
            inputFormat.value = 'full';
            outputTimezone.value = 'UTC';
            outputFormat.value = 'full';
            convertedResult.textContent = 'Pilih waktu untuk melihat hasil konversi';
            
            // Clear additional info
            utcTimeElement.textContent = '-';
            unixTimeElement.textContent = '-';
            yearElement.textContent = '-';
            dayOfWeekElement.textContent = '-';
        }
        
        // Event Listeners
        convertBtn.addEventListener('click', convertTime);
        resetBtn.addEventListener('click', resetForm);
        currentTimeBtn.addEventListener('click', setCurrentTime);
        
        // Initialize
        setCurrentTime();