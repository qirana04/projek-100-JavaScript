const tinggi = document.getElementById('fr-tinggi');
const nilaia = document.getElementById('fr-a');
const nilaib = document.getElementById('fr-b');
const luas = document.querySelector("#txt-luas");
const keliling = document.querySelector('#txt-keliling');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (t,a) => a * t;
const hitungKeliling = (a,b) => 2 * (a + b );

btnHitung.addEventListener('click', function (){
  let t = Number(tinggi.value);
  let a = Number(nilaia.value);
  let b = Number(nilaib.value);
  luas.textContent = hitungLuas (a,t);
  keliling.textContent = hitungKeliling (a,b);
})