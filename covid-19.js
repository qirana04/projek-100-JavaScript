 document.addEventListener('DOMContentLoaded', function() {
            const countryInput = document.getElementById('country-input');
            const searchBtn = document.getElementById('search-btn');
            const loadingElement = document.getElementById('loading');
            const errorElement = document.getElementById('error');
            const dataDisplay = document.getElementById('data-display');
            
            // Chart variable
            let covidChart = null;
            
            // Fungsi untuk memformat angka
            function formatNumber(num) {
                return new Intl.NumberFormat().format(num);
            }
            
            // Fungsi untuk memformat tanggal
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                return new Date(dateString).toLocaleDateString('id-ID', options);
            }
            
            // Fungsi untuk mengambil data COVID-19
            async function fetchCovidData(country) {
                try {
                    // Tampilkan loading, sembunyikan error dan data sebelumnya
                    loadingElement.style.display = 'block';
                    errorElement.style.display = 'none';
                    dataDisplay.style.display = 'none';
                    
                    // Fetch data dari API
                    const response = await `fetch(https://disease.sh/v3/covid-19/countries/${country}?strict=true)`;
                    
                    if (!response.ok) {
                        throw new Error('Negara tidak ditemukan atau terjadi kesalahan server');
                    }
                    
                    const data = await response.json();
                    
                    // Tampilkan data
                    displayCovidData(data);
                    
                    // Ambil data historis untuk chart
                    fetchHistoricalData(country);
                    
                } catch (error) {
                    loadingElement.style.display = 'none';
                    errorElement.textContent = error.message;
                    errorElement.style.display = 'block';
                    console.error('Error fetching COVID data:', error);
                }
            }
            
            // Fungsi untuk mengambil data historis
            async function fetchHistoricalData(country) {
                try {
                    const response = await `fetch(https://disease.sh/v3/covid-19/historical/${country}?lastdays=30)`;
                    const data = await response.json();
                    
                    // Siapkan data untuk chart
                    prepareChartData(data.timeline);
                    
                } catch (error) {
                    console.error('Error fetching historical data:', error);
                    // Tetap tampilkan data utama meskipun chart gagal
                    loadingElement.style.display = 'none';
                    dataDisplay.style.display = 'block';
                }
            }
            
            // Fungsi untuk menampilkan data COVID-19
            function displayCovidData(data) {
                document.getElementById('country-name').textContent = data.country;
                document.getElementById('last-updated').textContent = formatDate(data.updated);
                document.getElementById('confirmed').textContent = formatNumber(data.cases);
                document.getElementById('active').textContent = formatNumber(data.active);
                document.getElementById('recovered').textContent = formatNumber(data.recovered);
                document.getElementById('deaths').textContent = formatNumber(data.deaths);
                
                // Sembunyikan loading dan tampilkan data
                loadingElement.style.display = 'none';
                dataDisplay.style.display = 'block';
            }
            
            // Fungsi untuk menyiapkan data chart
            function prepareChartData(timeline) {
                const dates = Object.keys(timeline.cases);
                const cases = Object.values(timeline.cases);
                const deaths = Object.values(timeline.deaths);
                const recovered = Object.values(timeline.recovered);
                
                // Format tanggal untuk label
                const formattedDates = dates.map(date => {
                    const [month, day, year] = date.split('/');
                    `return ${day}/${month}`;
                });
                
                // Buat atau update chart
                createChart(formattedDates, cases, deaths, recovered);
                
                // Sembunyikan loading setelah chart selesai
                loadingElement.style.display = 'none';
            }
            
            // Fungsi untuk membuat chart
            function createChart(labels, casesData, deathsData, recoveredData) {
                const ctx = document.getElementById('covid-chart').getContext('2d');
                
                // Hancurkan chart sebelumnya jika ada
                if (covidChart) {
                    covidChart.destroy();
                }
                
                covidChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Kasus Terkonfirmasi',
                                data: casesData,
                                borderColor: '#3498db',
                                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                                borderWidth: 2,
                                fill: true
                            },
                            {
                                label: 'Meninggal',
                                data: deathsData,
                                borderColor: '#e74c3c',
                                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                                borderWidth: 2,
                                fill: true
                            },
                            {
                                label: 'Sembuh',
                                data: recoveredData,
                                borderColor: '#2ecc71',
                                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                                borderWidth: 2,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Perkembangan Kasus COVID-19 (30 Hari Terakhir)',
                                font: {
                                    size: 16
                                }
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function(context) {
                                        `return ${context.dataset.label}: ${formatNumber(context.raw)}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return formatNumber(value);
                                    }
                                }
                            }
                        },
                        interaction: {
                            mode: 'nearest',
                            axis: 'x',
                            intersect: false
                        }
                    }
                });
            }
            
            // Event listener untuk tombol search
            searchBtn.addEventListener('click', function() {
                const country = countryInput.value.trim();
                if (country) {
                    fetchCovidData(country);
                }
            });
            
            // Event listener untuk enter key
            countryInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const country = countryInput.value.trim();
                    if (country) {
                        fetchCovidData(country);
                    }
                }
            });
            
            // Load data Indonesia secara default saat pertama kali dibuka
            fetchCovidData('indonesia');
            countryInput.value = 'indonesia';
        });