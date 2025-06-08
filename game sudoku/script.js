 document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('sudoku-board');
            const messageEl = document.getElementById('message');
            const newGameBtn = document.getElementById('new-game');
            const checkBtn = document.getElementById('check');
            const solveBtn = document.getElementById('solve');
            const clearBtn = document.getElementById('clear');
            const hintBtn = document.getElementById('hint');
            
            let selectedCell = null;
            let boardData = Array(9).fill().map(() => Array(9).fill(0));
            let solution = Array(9).fill().map(() => Array(9).fill(0));
            let fixedCells = Array(9).fill().map(() => Array(9).fill(false));
            
            // Initialize the board
            function initializeBoard() {
                board.innerHTML = '';
                
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        
                        if (fixedCells[row][col]) {
                            cell.classList.add('fixed');
                            cell.textContent = boardData[row][col] !== 0 ? boardData[row][col] : '';
                        }
                        
                        cell.addEventListener('click', () => selectCell(cell, row, col));
                        board.appendChild(cell);
                    }
                }
            }
            
            // Select a cell
            function selectCell(cell, row, col) {
                if (selectedCell) {
                    selectedCell.classList.remove('selected');
                    // Remove highlighting from same number
                    const prevValue = selectedCell.textContent;
                    if (prevValue) {
                        document.querySelectorAll`(.cell:not(.fixed))`.forEach(c => {
                            if (c.textContent === prevValue) {
                                c.classList.remove('highlighted');
                            }
                        });
                    }
                }
                
                if (!fixedCells[row][col]) {
                    selectedCell = cell;
                    cell.classList.add('selected');
                    
                    // Highlight same numbers
                    const value = cell.textContent;
                    if (value) {
                        document.querySelectorAll`(.cell:not(.fixed))`.forEach(c => {
                            if (c.textContent === value) {
                                c.classList.add('highlighted');
                            }
                        });
                    }
                }
            }
            
            // Generate a new Sudoku puzzle
            function generateNewPuzzle(difficulty = 'medium') {
                // Reset the board
                boardData = Array(9).fill().map(() => Array(9).fill(0));
                fixedCells = Array(9).fill().map(() => Array(9).fill(false));
                
                // Generate a complete solution
                generateSolution(0, 0);
                solution = boardData.map(row => [...row]);
                
                // Remove numbers based on difficulty
                let cellsToRemove;
                switch (difficulty) {
                    case 'easy': cellsToRemove = 40; break;
                    case 'medium': cellsToRemove = 50; break;
                    case 'hard': cellsToRemove = 60; break;
                    default: cellsToRemove = 50;
                }
                
                let removed = 0;
                while (removed < cellsToRemove) {
                    const row = Math.floor(Math.random() * 9);
                    const col = Math.floor(Math.random() * 9);
                    
                    if (boardData[row][col] !== 0) {
                        boardData[row][col] = 0;
                        removed++;
                    }
                }
                
                // Mark fixed cells
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        fixedCells[row][col] = boardData[row][col] !== 0;
                    }
                }
                
                initializeBoard();
                messageEl.textContent = '';
            }
            
            // Generate a valid Sudoku solution (backtracking)
            function generateSolution(row, col) {
                if (row === 9) {
                    return true;
                }
                
                if (col === 9) {
                    return generateSolution(row + 1, 0);
                }
                
                if (boardData[row][col] !== 0) {
                    return generateSolution(row, col + 1);
                }
                
                const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                shuffleArray(numbers);
                
                for (const num of numbers) {
                    if (isValidPlacement(row, col, num)) {
                        boardData[row][col] = num;
                        
                        if (generateSolution(row, col + 1)) {
                            return true;
                        }
                        
                        boardData[row][col] = 0;
                    }
                }
                
                return false;
            }
            
            // Check if a number can be placed in a cell
            function isValidPlacement(row, col, num) {
                // Check row
                for (let c = 0; c < 9; c++) {
                    if (boardData[row][c] === num) {
                        return false;
                    }
                }
                
                // Check column
                for (let r = 0; r < 9; r++) {
                    if (boardData[r][col] === num) {
                        return false;
                    }
                }
                
                // Check 3x3 box
                const boxRow = Math.floor(row / 3) * 3;
                const boxCol = Math.floor(col / 3) * 3;
                
                for (let r = boxRow; r < boxRow + 3; r++) {
                    for (let c = boxCol; c < boxCol + 3; c++) {
                        if (boardData[r][c] === num) {
                            return false;
                        }
                    }
                }
                
                return true;
            }
            
            // Shuffle an array
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            
            // Check the current solution
            function checkSolution() {
                let isValid = true;
                
                // Check all cells are filled
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        const cell = document.querySelector`(.cell[data-row="${row}"][data-col="${col}"])`;
                        if (!cell.textContent) {
                            isValid = false;
                            cell.classList.add('error');
                        } else {
                            cell.classList.remove('error');
                        }
                    }
                }
                
                if (!isValid) {
                    messageEl.textContent = 'Not all cells are filled!';
                    return;
                }
                
                // Validate rows, columns, and boxes
                for (let i = 0; i < 9; i++) {
                    // Check row
                    const row = boardData[i];
                    if (new Set(row).size !== 9) {
                        isValid = false;
                        highlightErrors(i, -1);
                    }
                    
                    // Check column
                    const col = boardData.map(row => row[i]);
                    if (new Set(col).size !== 9) {
                        isValid = false;
                        highlightErrors(-1, i);
                    }
                    
                    // Check box
                    const boxRow = Math.floor(i / 3) * 3;
                    const boxCol = (i % 3) * 3;
                    const box = [];
                    for (let r = boxRow; r < boxRow + 3; r++) {
                        for (let c = boxCol; c < boxCol + 3; c++) {
                            box.push(boardData[r][c]);
                        }
                    }
                    if (new Set(box).size !== 9) {
                        isValid = false;
                        highlightErrors(boxRow, boxCol, true);
                    }
                }
                
                if (isValid) {
                    messageEl.textContent = 'Congratulations! Solution is correct!';
                } else {
                    messageEl.textContent = 'There are errors in your solution!';
                }
            }
            
            // Highlight errors in a row, column, or box
            function highlightErrors(row, col, isBox = false) {
                if (isBox) {
                    for (let r = row; r < row + 3; r++) {
                        for (let c = col; c < col + 3; c++) {
                            document.querySelector`(.cell[data-row="${r}"][data-col="${c}"]).classList.add('error')`;
                        }
                    }
                } else if (row >= 0) {
                    for (let c = 0; c < 9; c++) {
                        document.querySelector`(.cell[data-row="${row}"][data-col="${c}"]).classList.add('error')`;
                    }
                } else if (col >= 0) {
                    for (let r = 0; r < 9; r++) {
                        document.querySelector`(.cell[data-row="${r}"][data-col="${col}"]).classList.add('error')`;
                    }
                }
            }
            
            // Solve the puzzle
            function solvePuzzle() {
                boardData = solution.map(row => [...row]);
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        const cell = document.querySelector`(.cell[data-row="${row}"][data-col="${col}"])`;
                        cell.textContent = boardData[row][col];
                        cell.classList.remove('error');
                    }
                }
                messageEl.textContent = 'Puzzle solved!';
            }
            
            // Clear user inputs
            function clearBoard() {
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (!fixedCells[row][col]) {
                            boardData[row][col] = 0;
                            const cell = document.querySelector`(.cell[data-row="${row}"][data-col="${col}"])`;
                            cell.textContent = '';
                            cell.classList.remove('error');
                        }
                    }
                }
                messageEl.textContent = '';
            }
            
            // Provide a hint
            function giveHint() {
                if (!selectedCell) {
                    messageEl.textContent = 'Please select a cell first!';
                    return;
                }
                
                const row = parseInt(selectedCell.dataset.row);
                const col = parseInt(selectedCell.dataset.col);
                
                if (fixedCells[row][col]) {
                    messageEl.textContent = 'Cannot provide hint for a fixed cell!';
                    return;
                }
                
                selectedCell.textContent = solution[row][col];
                boardData[row][col] = solution[row][col];
                selectedCell.classList.remove('error');
                messageEl.textContent = 'Hint provided!';
            }
            
            // Handle keyboard input
            document.addEventListener('keydown', (e) => {
                if (!selectedCell || fixedCells[selectedCell.dataset.row][selectedCell.dataset.col]) {
                    return;
                }
                
                if (e.key >= '1' && e.key <= '9') {
                    selectedCell.textContent = e.key;
                    boardData[selectedCell.dataset.row][selectedCell.dataset.col] = parseInt(e.key);
                    selectedCell.classList.remove('error');
                } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
                    selectedCell.textContent = '';
                    boardData[selectedCell.dataset.row][selectedCell.dataset.col] = 0;
                    selectedCell.classList.remove('error');
                }
            });
            
            // Event listeners for buttons
            newGameBtn.addEventListener('click', () => generateNewPuzzle('medium'));
            checkBtn.addEventListener('click', checkSolution);
            solveBtn.addEventListener('click', solvePuzzle);
            clearBtn.addEventListener('click', clearBoard);
            hintBtn.addEventListener('click', giveHint);
            
            // Start a new game
            generateNewPuzzle();
        });