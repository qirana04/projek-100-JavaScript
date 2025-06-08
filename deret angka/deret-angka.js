function deretAngka(containerId) {
  const container = document.getElementById(containerId);
  const jumlah = parseInt(document.getElementById(`jumlah-${containerId}`).value);
  const kelipatan = parseInt(document.getElementById(`kelipatan-${containerId}`).value);
  
  let deret = [];
  for (let i = 1; i <= jumlah; i++) {
    deret.push(i * kelipatan);
  }  
  return deret.join(' ');
}
function main() {
  const jml = parseInt(document.getElementById('jmlDeret').value);
  const deretContainer = document.getElementById('deret-container');
  deretContainer.innerHTML = '';
  
  for (let i = 0; i < jml; i++) {
    const containerId = `deret-${i}`;
      
    const deretDiv = document.createElement('div');
    deretDiv.style.marginBottom = '15px';
    deretDiv.innerHTML = `
<h3>Deret ${i+1}:</h3>
<label>Masukan Jumlah Deret:</label>
<input type="number" id="jumlah-${containerId}" min="1" value="5">
<br>
<label>Masukan Kelipatan:</label>
<input type="number" id="kelipatan-${containerId}" min="1" value="2">
      `;
    deretContainer.appendChild(deretDiv);
  }
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';
  const btnHitung = document.createElement('button');
  btnHitung.textContent = 'Hitung Deret';
  btnHitung.onclick = function() {
    resultContainer.innerHTML = '';
    for (let i = 0; i < jml; i++) {
const deret = deretAngka(`deret-${i}`);
resultContainer.innerHTML += `Deret ${i+1}:\n${deret}\n\n`;
}
};

deretContainer.appendChild(btnHitung);
}
document.getElementById('btnBuatDeret').addEventListener('click', main);