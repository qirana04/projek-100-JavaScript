const questions = [
            {
                question: "Apa ibukota Indonesia?",
                options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
                answer: 0,
                explanation: "Jakarta adalah ibukota Indonesia sejak tahun 1945."
            },
            {
                question: "Berapa hasil dari 2 + 2?",
                options: ["3", "4", "5", "6"],
                answer: 1,
                explanation: "2 ditambah 2 sama dengan 4."
            },
            {
                question: "Planet terdekat dari matahari adalah?",
                options: ["Venus", "Mars", "Mercury", "Bumi"],
                answer: 2,
                explanation: "Mercury adalah planet terdekat dengan matahari dalam tata surya kita."
            }
        ];
        
        let currentQuestion = 0;
        let score = 0;
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const nextBtn = document.getElementById('next-btn');
        const resultEl = document.getElementById('result');
        const currentQEl = document.getElementById('current-q');
        const totalQEl = document.getElementById('total-q');
        const scoreContainerEl = document.getElementById('score-container');
        const finalScoreEl = document.getElementById('final-score');
        const restartBtn = document.getElementById('restart-btn');
        
        // Initialize quiz
        totalQEl.textContent = questions.length;
        
        function loadQuestion() {
            const q = questions[currentQuestion];
            questionEl.textContent = q.question;
            currentQEl.textContent = currentQuestion + 1;
            
            optionsEl.innerHTML = '';
            q.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option;
                button.onclick = () => selectAnswer(index);
                optionsEl.appendChild(button);
            });
            
            resultEl.className = 'hidden';
            nextBtn.disabled = true;
        }
        
        function selectAnswer(selectedIndex) {
            const q = questions[currentQuestion];
            const buttons = optionsEl.querySelectorAll('.option-btn');
            
            // Disable all buttons
            buttons.forEach(button => {
                button.disabled = true;
            });
            
            // Mark correct and wrong answers
            buttons[q.answer].classList.add('correct');
            if (selectedIndex !== q.answer) {
                buttons[selectedIndex].classList.add('wrong');
            }
            
            // Show result
            if (selectedIndex === q.answer) {
                resultEl.textContent = ` Benar! ${q.explanation}`;
                resultEl.className = 'correct';
                score++;
            } else {
                resultEl.textContent = `Salah! Jawaban benar: ${q.options[q.answer]}. ${q.explanation}`;
                resultEl.className = 'wrong';
            }
            
            nextBtn.disabled = false;
            updateScore();
        }
        
        function updateScore() {
            // You can add score display during quiz if needed
        }
        
        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        });
        
        function endQuiz() {
            questionEl.style.display = 'none';
            optionsEl.style.display = 'none';
            nextBtn.style.display = 'none';
            resultEl.style.display = 'none';
            
            scoreContainerEl.classList.remove('hidden');
            finalScoreEl.textContent = `Skor akhir: ${score} dari ${questions.length}`;
        }
        
        restartBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            
            questionEl.style.display = 'block';
            optionsEl.style.display = 'grid';
            nextBtn.style.display = 'block';
            resultEl.style.display = 'block';
            
            scoreContainerEl.classList.add('hidden');
            loadQuestion();
        });
        
        // Start the quiz
        loadQuestion();