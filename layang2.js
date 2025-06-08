const diagonal3 = document.getElementById('fr-diagonal3');
const diagonal4 = document.getElementById('fr-diagonal4');
const nilaiA = document.getElementById('fr-nilaiA');
const nilaiB = document.getElementById('fr-nilaiB');
const luas = document.querySelector("#txt-luas");
const keliling = document.querySelector('#txt-keliling');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (d1, d2) => 1/2 * d1 * d2;
const hitungKeliling = (nA, nB) => 2 * (nA + nB);

btnHitung.addEventListener('click', function (){
  let d3 = Number(diagonal3.value);
  let d4 = Number(diagonal4.value);
  let nA = Number(nilaiA.value);
  let nB = Number(nilaiB.value);
  luas.textContent = hitungLuas (d3, d4)
  keliling.textContent = hitungKeliling (nA, nB)
})