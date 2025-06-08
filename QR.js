 // Elemen DOM
        const qrInput = document.getElementById('qr-input');
        const qrCodeDiv = document.getElementById('qr-code');
        const generateBtn = document.getElementById('generate-btn');
        const downloadBtn = document.getElementById('download-btn');
        const clearBtn = document.getElementById('clear-btn');
        const qrSize = document.getElementById('qr-size');
        const qrColor = document.getElementById('qr-color');
        const qrBgColor = document.getElementById('qr-bgcolor');
        
        // Generate QR Code
        function generateQRCode() {
            const text = qrInput.value.trim();
            
            if (!text) {
                alert('Masukkan teks atau URL terlebih dahulu!');
                return;
            }
            
            // Hapus QR code sebelumnya jika ada
            qrCodeDiv.innerHTML = '';
            
            const options = {
                width: parseInt(qrSize.value),
                height: parseInt(qrSize.value),
                colorDark: qrColor.value,
                colorLight: qrBgColor.value,
                correctLevel: QRCode.CorrectLevel.H
            };
            
            // Buat QR code baru
            new QRCode(qrCodeDiv, {
                text: text,
                width: options.width,
                height: options.height,
                colorDark: options.colorDark,
                colorLight: options.colorLight,
                correctLevel: options.correctLevel
            });
            
            // Aktifkan tombol download
            downloadBtn.disabled = false;
        }
        
        // Download QR Code
        function downloadQRCode() {
            const canvas = qrCodeDiv.querySelector('canvas');
            if (!canvas) {
                alert('Generate QR code terlebih dahulu!');
                return;
            }
            
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
        
        // Clear semua input dan QR code
        function clearAll() {
            qrInput.value = '';
            qrCodeDiv.innerHTML = '';
            downloadBtn.disabled = true;
            qrInput.focus();
        }
        
        // Event listeners
        generateBtn.addEventListener('click', generateQRCode);
        downloadBtn.addEventListener('click', downloadQRCode);
        clearBtn.addEventListener('click', clearAll);
        
        // Generate QR code saat menekan Enter di input
        qrInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateQRCode();
            }
        });