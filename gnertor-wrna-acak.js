       function ubahWarna() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const warna = `rgb(${r}, ${g}, ${b})`;
            
            document.body.style.backgroundColor = warna;
            document.getElementById('warna').textContent = ` Warna: ${warna}`;
        }