document.addEventListener('DOMContentLoaded', () => {
            const gameBoard = document.getElementById('game-board');
            const pairsElement = document.getElementById('pairs');
            const attemptsElement = document.getElementById('attempts');
            const restartBtn = document.getElementById('restart-btn');
            
            // Simbol untuk kartu (8 pasang)
            const cardSymbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍐', '🍉'];
            
            let cards = [];
            let flippedCards = [];
            let matchedPairs = 0;
            let attempts = 0;
            let canFlip = true;
            
            // Inisialisasi game
            function initGame() {
                // Reset variabel game
                cards = [];
                flippedCards = [];
                matchedPairs = 0;
                attempts = 0;
                canFlip = true;
                
                // Update tampilan
                pairsElement.textContent = matchedPairs;
                attemptsElement.textContent = attempts;
                
                // Kosongkan papan game
                gameBoard.innerHTML = '';
                
                // Buat array kartu (duplikat simbol untuk membuat pasangan)
                let gameCards = [...cardSymbols, ...cardSymbols];
                
                // Acak urutan kartu
                gameCards = shuffleArray(gameCards);
                
                // Buat elemen kartu dan tambahkan ke papan game
                gameCards.forEach((symbol, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.index = index;
                    card.dataset.symbol = symbol;
                    
                    card.innerHTML = `
                        <div class="card-face card-back">?</div>
                        <div class="card-face card-front">${symbol}</div>
                    `;
                    
                    card.addEventListener('click', flipCard);
                    gameBoard.appendChild(card);
                    cards.push(card);
                });
            }
            
            // Fungsi untuk mengacak array
            function shuffleArray(array) {
                const newArray = [...array];
                for (let i = newArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            }
            
            // Fungsi untuk membalik kartu
            function flipCard() {
                if (!canFlip) return;
                if (flippedCards.length >= 2) return;
                if (this.classList.contains('flipped')) return;
                if (this.classList.contains('matched')) return;
                
                this.classList.add('flipped');
                flippedCards.push(this);
                
                // Jika 2 kartu sudah terbuka, cek kecocokan
                if (flippedCards.length === 2) {
                    attempts++;
                    attemptsElement.textContent = attempts;
                    
                    canFlip = false;
                    setTimeout(checkMatch, 500);
                }
            }
            
            // Fungsi untuk memeriksa kecocokan kartu
            function checkMatch() {
                const [card1, card2] = flippedCards;
                const symbol1 = card1.dataset.symbol;
                const symbol2 = card2.dataset.symbol;
                
                if (symbol1 === symbol2) {
                    // Kartu cocok
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    pairsElement.textContent = matchedPairs;
                    
                    // Cek jika semua pasangan sudah ditemukan
                    if (matchedPairs === cardSymbols.length) {
                        setTimeout(() => {
                            `alert(Selamat! Anda menang dengan ${attempts} percobaan!)`;
                        }, 300);
                    }
                } else {
                    // Kartu tidak cocok, balik kembali
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }
                
                flippedCards = [];
                canFlip = true;
            }
            
            // Event listener untuk tombol restart
            restartBtn.addEventListener('click', initGame);
            
            // Mulai game pertama kali
            initGame();
        });
