const gameArea = document.getElementById('game-area');
        const originalImage = document.getElementById('original-image');
        const message = document.getElementById('message');
        const loadBtn = document.getElementById('load-btn');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const imageUrlInput = document.getElementById('image-url');
        
        const rows = 4;
        const cols = 4;
        let pieceWidth, pieceHeight;
        let pieces = [];
        let draggedPiece = null;
        
        // Inisialisasi game
        function initGame() {
            calculatePieceDimensions();
            createPuzzle();
            
            // Set event listeners untuk tombol
            loadBtn.addEventListener('click', loadNewImage);
            shuffleBtn.addEventListener('click', shufflePuzzle);
            
            // Load gambar saat URL berubah
            imageUrlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') loadNewImage();
            });
        }
        
        function calculatePieceDimensions() {
            pieceWidth = gameArea.offsetWidth / cols;
            pieceHeight = gameArea.offsetHeight / rows;
        }
        
        // Muat gambar baru
        function loadNewImage() {
            const newUrl = imageUrlInput.value.trim();
            if (!newUrl) return;
            
            originalImage.src = newUrl;
            originalImage.onload = function() {
                message.textContent = "Susun potongan gambar dengan drag and drop!";
                createPuzzle();
            };
            originalImage.onerror = function() {
                message.textContent = "Gagal memuat gambar. Pastikan URL valid!";
            };
        }
        
        // Buat potongan puzzle
        function createPuzzle() {
            gameArea.innerHTML = '';
            pieces = [];
            
            // Acak urutan potongan
            const order = Array.from({length: rows * cols}, (_, i) => i);
            shuffleArray(order);
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const index = i * cols + j;
                    const piece = document.createElement('div');
                    piece.className = 'puzzle-piece';
                    
                    // Atur posisi background untuk setiap potongan
                    const bgPosX = -j * pieceWidth;
                    const bgPosY = -i * pieceHeight;
                    piece.style.backgroundImage = url(`${originalImage.src}`);
                    piece.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
                    
                    // Atur posisi acak di game area
                    const randomPos = getRandomPosition();
                    piece.style.left = `${randomPos.x}px`;
                    piece.style.top = ` ${randomPos.y}px`;
                    
                    piece.dataset.originalRow = i;
                    piece.dataset.originalCol = j;
                    piece.dataset.currentX = randomPos.x;
                    piece.dataset.currentY = randomPos.y;
                    
                    piece.draggable = true;
                    
                    piece.addEventListener('dragstart', dragStart);
                    piece.addEventListener('dragover', dragOver);
                    piece.addEventListener('drop', drop);
                    piece.addEventListener('dragend', dragEnd);
                    
                    gameArea.appendChild(piece);
                    pieces.push(piece);
                }
            }
        }
        
        // Acak ulang posisi potongan
        function shufflePuzzle() {
            pieces.forEach(piece => {
                const randomPos = getRandomPosition();
                piece.style.left = `${randomPos.x}px`;
                piece.style.top = `${randomPos.y}px`;
                piece.dataset.currentX = randomPos.x;
                piece.dataset.currentY = randomPos.y;
            });
            message.textContent = "Susun potongan gambar dengan drag and drop!";
        }
        
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        function getRandomPosition() {
            const maxX = gameArea.offsetWidth - pieceWidth;
            const maxY = gameArea.offsetHeight - pieceHeight;
            
            return {
                x: Math.floor(Math.random() * maxX),
                y: Math.floor(Math.random() * maxY)
            };
        }
        
        function dragStart(e) {
            draggedPiece = this;
            e.dataTransfer.setData('text/plain', this.id);
            this.style.opacity = '0.5';
        }
        
        function dragOver(e) {
            e.preventDefault();
        }
        
        function drop(e) {
            e.preventDefault();
            if (draggedPiece !== this) {
                // Tukar posisi
                const thisX = this.style.left;
                const thisY = this.style.top;
                
                this.style.left = draggedPiece.style.left;
                this.style.top = draggedPiece.style.top;
                this.dataset.currentX = draggedPiece.dataset.currentX;
                this.dataset.currentY = draggedPiece.dataset.currentY;
                
                draggedPiece.style.left = thisX;
                draggedPiece.style.top = thisY;
                draggedPiece.dataset.currentX = this.dataset.currentX;
                draggedPiece.dataset.currentY = this.dataset.currentY;
                
                // Periksa apakah puzzle sudah tersusun
                checkCompletion();
            }
        }
        
        function dragEnd() {
            this.style.opacity = '1';
        }
        
        function checkCompletion() {
            let correct = true;
            
            pieces.forEach(piece => {
                const currentX = parseInt(piece.dataset.currentX);
                const currentY = parseInt(piece.dataset.currentY);
                
                const originalCol = parseInt(piece.dataset.originalCol);
                const originalRow = parseInt(piece.dataset.originalRow);
                
                const correctX = originalCol * pieceWidth;
                const correctY = originalRow * pieceHeight;
                
                // Periksa apakah potongan berada pada posisi yang benar (dengan toleransi 5px)
                if (Math.abs(currentX - correctX) > 5 || Math.abs(currentY - correctY) > 5) {
                    correct = false;
                }
            });
            
            if (correct) {
                message.textContent = "Selamat! Anda berhasil menyelesaikan puzzle!";
                gameArea.classList.add('completed');
                
                // Animasi kemenangan
                pieces.forEach(piece => {
                    piece.style.cursor = 'default';
                    piece.draggable = false;
                });
            } else {
                gameArea.classList.remove('completed');
            }
        }
        
        // Handle resize window
        window.addEventListener('resize', () => {
            calculatePieceDimensions();
            shufflePuzzle();
        });
        
        // Mulai game
        initGame();