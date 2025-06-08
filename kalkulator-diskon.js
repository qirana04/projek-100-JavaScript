 function hitungDiskon() {
            // Reset error messages
            document.getElementById('error-harga').textContent = '';
            document.getElementById('error-diskon').textContent = '';
            
            // Get input values
            const hargaInput = document.getElementById('harga').value;
            const diskonInput = document.getElementById('diskon').value;
            
            // Validate inputs
            let valid = true;
            
            if (!hargaInput) {
                document.getElementById('error-harga').textContent = 'Harap masukkan harga asli';
                valid = false;
            } else if (parseFloat(hargaInput) <= 0) {
                document.getElementById('error-harga').textContent = 'Harga harus lebih dari 0';
                valid = false;
            }
            
            if (!diskonInput) {
                document.getElementById('error-diskon').textContent = 'Harap masukkan persentase diskon';
                valid = false;
            } else if (parseFloat(diskonInput) < 0 || parseFloat(diskonInput) > 100) {
                document.getElementById('error-diskon').textContent = 'Diskon harus antara 0-100%';
                valid = false;
            }
            
            if (!valid) return;
            
            // Calculate discount
            const harga = parseFloat(hargaInput);
            const diskon = parseFloat(diskonInput);
            const hargaDiskon = harga - (harga * diskon / 100);
            const jumlahDiskon = harga * diskon / 100;
            
            // Format to Indonesian Rupiah
            const formatter = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            });
            
            // Display result
            document.getElementById('hasil').innerHTML = `
                <p>Harga Asli: ${formatter.format(harga)}</p>
                <p>Diskon: ${diskon}% (${formatter.format(jumlahDiskon)})</p>
                <p style="color: #27ae60; font-size: 1.2em;">Harga Setelah Diskon: ${formatter.format(hargaDiskon)}</p>
            `;
        }