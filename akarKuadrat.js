function hitungAkarKuadrat() {
            // Ambil nilai dari input
            const input = document.getElementById("numberInput").value;
            const resultDiv = document.getElementById("result");
            
            // Validasi input
            if (input === "") {
                resultDiv.innerHTML = '<span class="error">Silakan masukkan angka!</span>';
                return;
            }
            
            const number = parseFloat(input);
            
            if (isNaN(number)) {
                resultDiv.innerHTML = '<span class="error">Input harus berupa angka!</span>';
                return;
            }
            
            if (number < 0) {
                resultDiv.innerHTML = '<span class="error">Tidak bisa menghitung akar kuadrat dari bilangan negatif!</span>';
                return;
            }
            
            // Hitung akar kuadrat
            const squareRoot = Math.sqrt(number);
            
            // Tampilkan hasil
            resultDiv.innerHTML = `Akar kuadrat dari ${number} adalah <span style="color: #27ae60;">${squareRoot}</span>`;
        }