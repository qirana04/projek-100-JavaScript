function showInputFields() {
            const shape = document.getElementById('shape').value;
            let html = '';
            
            switch(shape) {
                case 'square':
                    html = `
                        <div class="input-group">
                            <label for="side">Panjang Sisi:</label>
                            <input type="number" id="side" placeholder="Masukkan panjang sisi">
                        </div>
                    `;
                    break;
                    
                case 'rectangle':
                    html = `
                        <div class="input-group">
                            <label for="length">Panjang:</label>
                            <input type="number" id="length" placeholder="Masukkan panjang">
                        </div>
                        <div class="input-group">
                            <label for="width">Lebar:</label>
                            <input type="number" id="width" placeholder="Masukkan lebar">
                        </div>
                    `;
                    break;
                    
                case 'triangle':
                    html = `
                        <div class="input-group">
                            <label for="base">Alas:</label>
                            <input type="number" id="base" placeholder="Masukkan alas">
                        </div>
                        <div class="input-group">
                            <label for="height">Tinggi:</label>
                            <input type="number" id="height" placeholder="Masukkan tinggi">
                        </div>
                        <div class="input-group">
                            <label for="side1">Sisi 1:</label>
                            <input type="number" id="side1" placeholder="Masukkan sisi 1">
                        </div>
                        <div class="input-group">
                            <label for="side2">Sisi 2:</label>
                            <input type="number" id="side2" placeholder="Masukkan sisi 2">
                        </div>
                    `;
                    break;
                    
                case 'circle':
                    html = `
                        <div class="input-group">
                            <label for="radius">Jari-jari:</label>
                            <input type="number" id="radius" placeholder="Masukkan jari-jari">
                        </div>
                    `;
                    break;
                    
                default:
                    html = '';
            }
            
            document.getElementById('inputFields').innerHTML = html;
            document.getElementById('result').style.display = 'none';
        }
        
        function calculate() {
            const shape = document.getElementById('shape').value;
            let area = 0;
            let perimeter = 0;
            
            switch(shape) {
                case 'square':
                    const side = parseFloat(document.getElementById('side').value);
                    area = side * side;
                    perimeter = 4 * side;
                    break;
                    
                case 'rectangle':
                    const length = parseFloat(document.getElementById('length').value);
                    const width = parseFloat(document.getElementById('width').value);
                    area = length * width;
                    perimeter = 2 * (length + width);
                    break;
                    
                case 'triangle':
                    const base = parseFloat(document.getElementById('base').value);
                    const height = parseFloat(document.getElementById('height').value);
                    const side1 = parseFloat(document.getElementById('side1').value);
                    const side2 = parseFloat(document.getElementById('side2').value);
                    area = 0.5 * base * height;
                    perimeter = base + side1 + side2;
                    break;
                    
                case 'circle':
                    const radius = parseFloat(document.getElementById('radius').value);
                    area = Math.PI * radius * radius;
                    perimeter = 2 * Math.PI * radius;
                    break;
                    
                default:
                    alert('Silakan pilih bangun datar terlebih dahulu');
                    return;
            }
            
            document.getElementById('areaResult').textContent = `Luas: ${area.toFixed(2)}`;
            document.getElementById('perimeterResult').textContent =` Keliling: ${perimeter.toFixed(2)}`;
            document.getElementById('result').style.display = 'block';
        }