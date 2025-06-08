        document.getElementById('search-btn').addEventListener('click', async function() {
            const city = document.getElementById('city-input').value;
            if (!city) return;
            
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
                const data = await response.json();
                
                document.getElementById('location').textContent = data.name + ', ' + data.sys.country;
                document.getElementById('temp').textContent = Math.round(data.main.temp) + '°C';
                document.getElementById('desc').textContent = data.weather[0].description;
                document.getElementById('weather-result').style.display = 'block';
            } catch (error) {
                alert('Kota tidak ditemukan!');
            }
        });