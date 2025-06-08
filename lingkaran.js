const jariPersegi = document.getElementById('fr-jariPersegi');
const jari = document.getElementById('fr-jari');
const keliling = document.querySelector('#txt-keliling');
const luas = document.querySelector("#txt-luas");
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas= (jP) => 3.14 * jP;
const hitungKeliling = (j) => 2 * 3.14 * j;

btnHitung.addEventListener('click', function (){
  let jP = Number(jariPersegi.value);
  let j = Number(jari.value);
  luas.textContent = hitungLuas (jP).toFixed(2)
  keliling.textContent = hitungKeliling (j).toFixed(2)
})