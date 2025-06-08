const diagonal1 = document.getElementById('fr-diagonal1');
const diagonal2 = document.getElementById('fr-diagonal2');
const sisi = document.getElementById('fr-sisi');
const luas = document.querySelector("#txt-luas");
const keliling = document.querySelector('#txt-keliling');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (d1, d2) => 1/2 * d1 * d2;
const hitungKeliling = (s) => 4 * s;

btnHitung.addEventListener('click', function (){
  let d1 = Number(diagonal1.value);
  let d2 = Number(diagonal2.value);
  let s = Number(sisi.value);
  luas.textContent = hitungLuas (d1, d2)
  keliling.textContent = hitungKeliling (s)
})