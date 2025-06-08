  document.getElementById('convert').addEventListener('click', function() {
            const temp = parseFloat(document.getElementById('temperature').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            
            if (isNaN(temp)) return;

            let result;
            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                result = (temp * 9/5) + 32;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                result = (temp - 32) * 5/9;
            } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
                result = temp + 273.15;
            } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
                result = temp - 273.15;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
                result = (temp - 32) * 5/9 + 273.15;
            } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
                result = (temp - 273.15) * 9/5 + 32;
            } else {
                result = temp; 
            }

            document.getElementById('result').textContent = 
                `${temp} ${getUnitSymbol(fromUnit)} = ${result.toFixed(2)} ${getUnitSymbol(toUnit)}`;
        });

        function getUnitSymbol(unit) {
            return {
                'celsius': '°C',
                'fahrenheit': '°F',
                'kelvin': 'K'
            }[unit];
        }