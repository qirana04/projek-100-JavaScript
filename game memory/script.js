const simbol = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
        let kartuTerbuka = [];
        let pasanganDitemukan = 0;
        
        // Acak urutan simbol
        simbol.sort(() => 0.5 - Math.random());
        
        // Buat papan permainan
        const gameBoard = document.getElementById('game-board');
        simbol.forEach((simbol, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.simbol = simbol;
            card.dataset.index = index;
            card.addEventListener('click', bukaKartu);
            gameBoard.appendChild(card);
        });
        
        function bukaKartu() {
            if (kartuTerbuka.length < 2 && !kartuTerbuka.includes(this) && this.textContent === '') {
                this.textContent = this.dataset.simbol;
                kartuTerbuka.push(this);
                
                if (kartuTerbuka.length === 2) {
                    setTimeout(cekPasangan, 500);
                }
            }
        }
        
        function cekPasangan() {
            const [kartu1, kartu2] = kartuTerbuka;
            
            if (kartu1.dataset.simbol === kartu2.dataset.simbol) {
                pasanganDitemukan++;
                kartu1.style.visibility = 'hidden';
                kartu2.style.visibility = 'hidden';
                
                if (pasanganDitemukan === simbol.length / 2) {
                    alert('Selamat! Anda menang!');
                }
            } else {
                kartu1.textContent = '';
                kartu2.textContent = '';
            }
            
            kartuTerbuka = [];
        }