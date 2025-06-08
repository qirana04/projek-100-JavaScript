const jariPersegi = document.getElementById('fr-jariPersegi');
const tinggi = document.getElementById('fr-tinggi');
const jari = document.getElementById('fr-jari');
const sisi = document.getElementById('fr-sisi');
const luas = document.querySelector("#txt-luas");
const keliling = document.querySelector('#txt-keliling');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (j,s) => 3.14 * j * (j + s);
const hitungKeliling = (jP,t) => 1/3 * 3.14 * jP * t;

btnHitung.addEventListener('click', function (){
  let t = Number(tinggi.value);
  let s = Number(sisi.value);
  let jP = Number(jariPersegi.value);
  let j = Number(jari.value);
  luas.textContent = hitungLuas (j,s).toFixed(2)
  keliling.textContent = hitungKeliling (jP,s).toFixed(2)
})