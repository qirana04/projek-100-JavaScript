  // Format mata uang
        const formatterIDR = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        
        const formatterUSD = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        
        // Set waktu update
        document.getElementById('update-time').textContent = new Date().toLocaleString();
        
        function convert() {
            // Reset error messages
            document.getElementById('error-usd').textContent = '';
            document.getElementById('error-kurs').textContent = '';
            
            // Get input values
            const usdInput = document.getElementById('usd').value;
            const kursInput = document.getElementById('kurs').value;
            
            // Validate inputs
            let valid = true;
            
            if (!usdInput) {
                document.getElementById('error-usd').textContent = 'Masukkan jumlah USD';
                valid = false;
            } else if (parseFloat(usdInput) < 0) {
                document.getElementById('error-usd').textContent = 'Jumlah tidak boleh negatif';
                valid = false;
            }
            
            if (!kursInput) {
                document.getElementById('error-kurs').textContent = 'Masukkan nilai kurs';
                valid = false;
            } else if (parseFloat(kursInput) <= 0) {
                document.getElementById('error-kurs').textContent = 'Kurs harus lebih dari 0';
                valid = false;
            }
            
            if (!valid) return;
            
            // Calculate conversion
            const usd = parseFloat(usdInput);
            const kurs = parseFloat(kursInput);
            const idr = usd * kurs;
            
            // Display result
            document.getElementById('result').innerHTML = `
                <p>${formatterUSD.format(usd)} = ${formatterIDR.format(idr)}</p>
                <p style="font-size: 14px; color: #7f8c8d;">Kurs: 1 USD = ${formatterIDR.format(kurs)}</p>
            `;
            
            // Update time
            document.getElementById('update-time').textContent = new Date().toLocaleString();
        }
        
        // Add Enter key support
        document.getElementById('usd').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') convert();
        });
        
        document.getElementById('kurs').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') convert();
        });