// Konfigurasi game
        const BOARD_SIZE = 10;
        const MINE_COUNT = 15;
        
        // Variabel game
        let board = [];
        let revealedCount = 0;
        let flagCount = 0;
        let gameOver = false;
        
        // Elemen DOM
        const gameBoardElement = document.getElementById('game-board');
        const minesCountElement = document.getElementById('mines-count');
        const flagsCountElement = document.getElementById('flags-count');
        const resetButton = document.getElementById('reset-btn');
        
        // Inisialisasi game
        function initGame() {
            // Reset variabel game
            board = [];
            revealedCount = 0;
            flagCount = 0;
            gameOver = false;
            
            // Update tampilan info
            minesCountElement.textContent = `💣: ${MINE_COUNT};`
            flagsCountElement.textContent = `🚩: ${flagCount}`;
            
            // Kosongkan papan game
            gameBoardElement.innerHTML = '';
            
            // Buat papan game
            createBoard();
        }
        
        // Buat papan game
        function createBoard() {
            // Inisialisasi array 2D untuk papan
            for (let i = 0; i < BOARD_SIZE; i++) {
                board[i] = [];
                for (let j = 0; j < BOARD_SIZE; j++) {
                    board[i][j] = {
                        isMine: false,
                        isRevealed: false,
                        isFlagged: false,
                        neighborMines: 0
                    };
                }
            }
            
            // Tempatkan mine secara acak
            let minesPlaced = 0;
            while (minesPlaced < MINE_COUNT) {
                const x = Math.floor(Math.random() * BOARD_SIZE);
                const y = Math.floor(Math.random() * BOARD_SIZE);
                
                if (!board[x][y].isMine) {
                    board[x][y].isMine = true;
                    minesPlaced++;
                }
            }
            
            // Hitung jumlah mine di sekitar setiap cell
            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    if (!board[i][j].isMine) {
                        board[i][j].neighborMines = countNeighborMines(i, j);
                    }
                }
            }
            
            // Buat elemen HTML untuk setiap cell
            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    
                    // Event listener untuk klik kiri
                    cell.addEventListener('click', () => {
                        if (!gameOver && !board[i][j].isFlagged) {
                            revealCell(i, j);
                        }
                    });
                    
                    // Event listener untuk klik kanan (untuk flag)
                    cell.addEventListener('contextmenu', (e) => {
                        e.preventDefault();
                        if (!gameOver && !board[i][j].isRevealed) {
                            toggleFlag(i, j);
                        }
                    });
                    
                    gameBoardElement.appendChild(cell);
                }
            }
        }
        
        // Hitung jumlah mine di sekitar cell
        function countNeighborMines(row, col) {
            let count = 0;
            
            for (let i = Math.max(0, row - 1); i <= Math.min(BOARD_SIZE - 1, row + 1); i++) {
                for (let j = Math.max(0, col - 1); j <= Math.min(BOARD_SIZE - 1, col + 1); j++) {
                    if (board[i][j].isMine) {
                        count++;
                    }
                }
            }
            
            return count;
        }
        
        // Tampilkan cell
        function revealCell(row, col) {
            const cell = board[row][col];
            
            // Jika cell sudah ditampilkan atau diberi flag, abaikan
            if (cell.isRevealed || cell.isFlagged || gameOver) {
                return;
            }
            
            // Tandai cell sebagai ditampilkan
            cell.isRevealed = true;
            revealedCount++;
            
            // Update tampilan cell
            const cellElement = getCellElement(row, col);
            cellElement.classList.add('revealed');
            
            // Cek jika terkena mine
            if (cell.isMine) {
                cellElement.classList.add('mine');
                cellElement.textContent = '💣';
                gameOver = true;
                revealAllMines();
                alert('Game Over! Anda terkena bom!');
                return;
            }
            
            // Tampilkan jumlah mine di sekitar jika ada
            if (cell.neighborMines > 0) {
                cellElement.textContent = cell.neighborMines;
                cellElement.classList.add(color-`${cell.neighborMines}`);
            } else {
                // Jika tidak ada mine di sekitar, buka cell sekitar secara rekursif
                for (let i = Math.max(0, row - 1); i <= Math.min(BOARD_SIZE - 1, row + 1); i++) {
                    for (let j = Math.max(0, col - 1); j <= Math.min(BOARD_SIZE - 1, col + 1); j++) {
                        if (i !== row || j !== col) {
                            revealCell(i, j);
                        }
                    }
                }
            }
            
            // Cek jika menang
            if (revealedCount === BOARD_SIZE * BOARD_SIZE - MINE_COUNT) {
                gameOver = true;
                alert('Selamat! Anda menang!');
            }
        }
        
        // Toggle flag pada cell
        function toggleFlag(row, col) {
            const cell = board[row][col];
            
            if (cell.isRevealed) {
                return;
            }
            
            cell.isFlagged = !cell.isFlagged;
            const cellElement = getCellElement(row, col);
            
            if (cell.isFlagged) {
                cellElement.classList.add('flagged');
                cellElement.textContent = '🚩';
                flagCount++;
            } else {
                cellElement.classList.remove('flagged');
                cellElement.textContent = '';
                flagCount--;
            }
            
            flagsCountElement.textContent = `🚩: ${flagCount}`;
        }
        
        // Tampilkan semua mine saat game over
        function revealAllMines() {
            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    if (board[i][j].isMine) {
                        const cellElement = getCellElement(i, j);
                        cellElement.classList.add('mine');
                        cellElement.textContent = '💣';
                    }
                }
            }
        }
        
        // Dapatkan elemen cell berdasarkan posisi
        function getCellElement(row, col) {
            return document.querySelector`(.cell[data-row="${row}"][data-col="${col}"])`;
        }
        
        // Event listener untuk tombol reset
        resetButton.addEventListener('click', initGame);
        
        // Mulai game
        initGame();