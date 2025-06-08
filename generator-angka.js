document.addEventListener('DOMContentLoaded', function() {
            const minInput = document.getElementById('min');
            const maxInput = document.getElementById('max');
            const countInput = document.getElementById('count');
            const typeSelect = document.getElementById('type');
            const uniqueCheckbox = document.getElementById('unique');
            const generateBtn = document.getElementById('generate');
            const resultsDiv = document.getElementById('results');
            const copyBtn = document.getElementById('copy');
            const rangeError = document.getElementById('range-error');
            const uniqueError = document.getElementById('unique-error');
            
            // Generate random numbers
            generateBtn.addEventListener('click', function() {
                // Reset error messages
                rangeError.style.display = 'none';
                uniqueError.style.display = 'none';
                
                // Get input values
                const min = parseFloat(minInput.value);
                const max = parseFloat(maxInput.value);
                const count = parseInt(countInput.value);
                const type = typeSelect.value;
                const unique = uniqueCheckbox.checked;
                
                // Validate inputs
                if (max <= min) {
                    rangeError.style.display = 'block';
                    return;
                }
                
                if (unique && (max - min + 1 < count) && type === 'integer') {
                    uniqueError.style.display = 'block';
                    return;
                }
                
                // Generate numbers
                let numbers = [];
                
                if (unique) {
                    // For unique numbers
                    if (type === 'integer') {
                        // Create array of all possible numbers
                        let allNumbers = [];
                        for (let i = min; i <= max; i++) {
                            allNumbers.push(i);
                        }
                        
                        // Shuffle and take first 'count' elements
                        shuffleArray(allNumbers);
                        numbers = allNumbers.slice(0, count);
                    } else {
                        // For decimal numbers with uniqueness
                        while (numbers.length < count) {
                            const num = getRandomDecimal(min, max);
                            if (!numbers.includes(num)) {
                                numbers.push(num);
                            }
                            
                            // Prevent infinite loop
                            if (numbers.length > 1000) break;
                        }
                    }
                } else {
                    // For non-unique numbers
                    for (let i = 0; i < count; i++) {
                        if (type === 'integer') {
                            numbers.push(getRandomInt(min, max));
                        } else {
                            numbers.push(getRandomDecimal(min, max));
                        }
                    }
                }
                
                // Display results
                displayResults(numbers);
            });
            
            // Copy to clipboard
            copyBtn.addEventListener('click', function() {
                const text = resultsDiv.textContent;
                navigator.clipboard.writeText(text).then(function() {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Tersalin!';
                    setTimeout(function() {
                        copyBtn.textContent = originalText;
                    }, 2000);
                });
            });
            
            // Helper functions
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            function getRandomDecimal(min, max) {
                return Math.random() * (max - min) + min;
            }
            
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            
            function displayResults(numbers) {
                if (typeSelect.value === 'integer') {
                    resultsDiv.textContent = numbers.join(', ');
                } else {
                    // Format decimal numbers to 4 decimal places
                    resultsDiv.textContent = numbers.map(num => num.toFixed(4)).join(', ');
                }
            }
        });