 class Calculator {
            constructor(previousOperandTextElement, currentOperandTextElement) {
                this.previousOperandTextElement = previousOperandTextElement;
                this.currentOperandTextElement = currentOperandTextElement;
                this.clear();
            }
            
            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
                this.resetScientificMode();
            }
            
            delete() {
                if (this.currentOperand === 'Error') return;
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                if (this.currentOperand === '') {
                    this.currentOperand = '0';
                }
            }
            
            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number;
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
                }
            }
            
            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }
            
            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                
                if (isNaN(prev) || isNaN(current)) return;
                
                try {
                    switch (this.operation) {
                        case '+':
                            computation = prev + current;
                            break;
                        case '-':
                            computation = prev - current;
                            break;
                        case '×':
                            computation = prev * current;
                            break;
                        case '÷':
                            computation = prev / current;
                            break;
                        default:
                            return;
                    }
                    
                    this.currentOperand = computation.toString();
                    this.operation = undefined;
                    this.previousOperand = '';
                } catch (error) {
                    this.currentOperand = 'Error';
                }
            }
            
            scientificFunction(func) {
                const current = parseFloat(this.currentOperand);
                if (isNaN(current)) return;
                
                try {
                    switch (func) {
                        case 'sin':
                            this.currentOperand = Math.sin(current * Math.PI / 180).toString();
                            break;
                        case 'cos':
                            this.currentOperand = Math.cos(current * Math.PI / 180).toString();
                            break;
                        case 'tan':
                            this.currentOperand = Math.tan(current * Math.PI / 180).toString();
                            break;
                        case 'log':
                            this.currentOperand = Math.log10(current).toString();
                            break;
                        case 'ln':
                            this.currentOperand = Math.log(current).toString();
                            break;
                        case '√':
                            this.currentOperand = Math.sqrt(current).toString();
                            break;
                        case 'x²':
                            this.currentOperand = Math.pow(current, 2).toString();
                            break;
                        case 'x³':
                            this.currentOperand = Math.pow(current, 3).toString();
                            break;
                        case 'x^y':
                            this.operation = '^';
                            this.previousOperand = this.currentOperand;
                            this.currentOperand = '';
                            break;
                        case 'π':
                            this.currentOperand = Math.PI.toString();
                            break;
                        case 'e':
                            this.currentOperand = Math.E.toString();
                            break;
                        case '10^x':
                            this.currentOperand = Math.pow(10, current).toString();
                            break;
                    }
                    
                    // For power operation (x^y)
                    if (this.operation === '^' && this.previousOperand !== '' && this.currentOperand !== '') {
                        const prev = parseFloat(this.previousOperand);
                        const curr = parseFloat(this.currentOperand);
                        this.currentOperand = Math.pow(prev, curr).toString();
                        this.operation = undefined;
                        this.previousOperand = '';
                    }
                } catch (error) {
                    this.currentOperand = 'Error';
                }
            }
            
            toggleScientificMode() {
                const calculator = document.querySelector('.calculator');
                calculator.classList.toggle('show-scientific');
                const button = document.querySelector('.toggle-scientific');
                if (calculator.classList.contains('show-scientific')) {
                    button.textContent = 'Standard';
                } else {
                    button.textContent = 'Scientific';
                    this.resetScientificMode();
                }
            }
            
            resetScientificMode() {
                this.operation = undefined;
                this.previousOperand = '';
            }
            
            getDisplayNumber(number) {
                if (number === 'Error') return number;
                
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                
                let integerDisplay;
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
                }
                
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }
            
            updateDisplay() {
                this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
                if (this.operation != null) {
                    this.previousOperandTextElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandTextElement.innerText = '';
                }
            }
        }
        
        // DOM Elements
        const numberButtons = document.querySelectorAll('[class=""]');
        const operationButtons = document.querySelectorAll('.operator');
        const equalsButton = document.querySelector('.equals');
        const deleteButton = document.querySelector('.delete');
        const allClearButton = document.querySelector('.clear');
        const scientificButtons = document.querySelectorAll('.scientific');
        const toggleScientificButton = document.querySelector('.toggle-scientific');
        const previousOperandTextElement = document.querySelector('#previous-operand');
        const currentOperandTextElement = document.querySelector('#current-operand');
        
        // Create calculator
        const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
        
        // Event Listeners
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
            });
        });
        
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
                calculator.updateDisplay();
            });
        });
        
        equalsButton.addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        });
        
        allClearButton.addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        });
        
        deleteButton.addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        });
        
        scientificButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.scientificFunction(button.innerText);
                calculator.updateDisplay();
            });
        });
        
        toggleScientificButton.addEventListener('click', () => {
            calculator.toggleScientificMode();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= 0 && e.key <= 9) {
                calculator.appendNumber(e.key);
                calculator.updateDisplay();
            } else if (e.key === '.') {
                calculator.appendNumber('.');
                calculator.updateDisplay();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                let operation;
                switch (e.key) {
                    case '*': operation = '×'; break;
                    case '/': operation = '÷'; break;
                    default: operation = e.key;
                }
                calculator.chooseOperation(operation);
                calculator.updateDisplay();
            } else if (e.key === 'Enter' || e.key === '=') {
                calculator.compute();
                calculator.updateDisplay();
            } else if (e.key === 'Backspace') {
                calculator.delete();
                calculator.updateDisplay();
            } else if (e.key === 'Escape') {
                calculator.clear();
                calculator.updateDisplay();
            } else if (e.key === 's') {
                calculator.toggleScientificMode();
            }
        });