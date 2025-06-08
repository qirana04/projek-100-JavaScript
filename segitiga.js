const tinggi = document.getElementById('fr-tinggi');
const alas = document.getElementById('fr-alas');
const luas = document.querySelector("#txt-luas");
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (a,t) => 1/2 * a * t;

btnHitung.addEventListener('click', function (){
  let t = Number(tinggi.value);
  let a = Number(alas.value);
  luas.textContent = hitungLuas (a,t);
})