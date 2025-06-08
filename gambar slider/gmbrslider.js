        let currentIndex = 0;
        const images = document.querySelectorAll('#slider img');
        
        function showImage(index) {
            images.forEach((img, i) => {
                img.style.opacity = i === index ? '1' : '0';
            });
        }
        
        function next() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        
        function prev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
        
        // Auto slide setiap 3 detik
        setInterval(next, 3000);