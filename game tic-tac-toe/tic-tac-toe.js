document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('board');
            const cells = document.querySelectorAll('.cell');
            const status = document.querySelector('.status');
            const resetButton = document.getElementById('reset');
            
            let currentPlayer = 'X';
            let gameState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            
            const winningConditions = [
                [0, 1, 2], // baris atas
                [3, 4, 5], // baris tengah
                [6, 7, 8], // baris bawah
                [0, 3, 6], // kolom kiri
                [1, 4, 7], // kolom tengah
                [2, 5, 8], // kolom kanan
                [0, 4, 8], // diagonal kiri atas ke kanan bawah
                [2, 4, 6]  // diagonal kanan atas ke kiri bawah
            ];
            
            // Fungsi untuk menangani klik sel
            function handleCellClick(e) {
                const clickedCell = e.target;
                const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
                
                // Jika sel sudah terisi atau game tidak aktif, abaikan klik
                if (gameState[clickedCellIndex] !== '' || !gameActive) {
                    return;
                }
                
                // Update game state dan tampilan
                gameState[clickedCellIndex] = currentPlayer;
                clickedCell.textContent = currentPlayer;
                clickedCell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
                
                // Cek apakah ada pemenang atau seri
                checkResult();
            }
            
            // Fungsi untuk memeriksa hasil game
            function checkResult() {
                let roundWon = false;
                
                // Cek semua kondisi menang
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    
                    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                        continue;
                    }
                    
                    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                        roundWon = true;
                        break;
                    }
                }
                
                // Jika ada pemenang
                if (roundWon) {
                    status.textContent = Player ` ${currentPlayer} wins!`;
                    gameActive = false;
                    return;
                }
                
                // Jika seri
                if (!gameState.includes('')) {
                    status.textContent = "Game ended in a draw!";
                    gameActive = false;
                    return;
                }
                
                // Ganti pemain
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = Player `${currentPlayer}'s turn`;
            }
            
            // Fungsi untuk mereset game
            function resetGame() {
                currentPlayer = 'X';
                gameState = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                status.textContent = Player `${currentPlayer}'s turn`;
                
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o');
                });
            }
            
            // Event listeners
            cells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
            
            resetButton.addEventListener('click', resetGame);
        });