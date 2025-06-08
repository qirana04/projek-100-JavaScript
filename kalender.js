 // Variabel global
        let currentDate = new Date();
        let selectedDate = new Date();

        // Elemen DOM
        const monthYearElement = document.getElementById('monthYear');
        const calendarDaysElement = document.getElementById('calendarDays');
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');

        // Inisialisasi kalender
        function initCalendar() {
            updateCalendar();
            
            // Event listeners
            prevMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });
            
            nextMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });
        }

        // Update tampilan kalender
        function updateCalendar() {
            // Update judul bulan dan tahun
            const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                               "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
            
            // Kosongkan hari kalender
            calendarDaysElement.innerHTML = '';
            
            // Dapatkan hari pertama bulan ini dan hari terakhir bulan ini
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            
            // Dapatkan hari dalam minggu untuk hari pertama (0 = Minggu, 1 = Senin, dst)
            const firstDayOfWeek = firstDay.getDay();
            // Sesuaikan agar minggu dimulai Senin (1)
            const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
            
            // Tambahkan hari dari bulan sebelumnya (jika diperlukan)
            const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            for (let i = adjustedFirstDayOfWeek; i > 0; i--) {
                const dayElement = createDayElement(prevMonthLastDay - i + 1, true);
                calendarDaysElement.appendChild(dayElement);
            }
            
            // Tambahkan hari bulan ini
            const today = new Date();
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const isToday = i === today.getDate() && 
                                currentDate.getMonth() === today.getMonth() && 
                                currentDate.getFullYear() === today.getFullYear();
                const isSelected = i === selectedDate.getDate() && 
                                  currentDate.getMonth() === selectedDate.getMonth() && 
                                  currentDate.getFullYear() === selectedDate.getFullYear();
                
                const dayElement = createDayElement(i, false, isToday, isSelected);
                calendarDaysElement.appendChild(dayElement);
            }
            
            // Tambahkan hari dari bulan berikutnya (jika diperlukan)
            const daysFromNextMonth = 42 - (adjustedFirstDayOfWeek + lastDay.getDate()); // 6 minggu x 7 hari
            for (let i = 1; i <= daysFromNextMonth; i++) {
                const dayElement = createDayElement(i, true);
                calendarDaysElement.appendChild(dayElement);
            }
        }

        // Buat elemen hari
        function createDayElement(day, isOtherMonth, isToday = false, isSelected = false) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            if (isOtherMonth) {
                dayElement.classList.add('other-month');
            }
            
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            if (isSelected) {
                dayElement.classList.add('selected');
            }
            
            // Tambahkan event listener untuk memilih tanggal
            if (!isOtherMonth) {
                dayElement.addEventListener('click', () => {
                    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    updateCalendar();
                });
            }
            
            return dayElement;
        }

        // Jalankan kalender saat halaman dimuat
        document.addEventListener('DOMContentLoaded', initCalendar);