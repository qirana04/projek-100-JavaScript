const nilaiA = document.getElementById("fr-nilaiA");
const nilaiB = document.getElementById("fr-nilaiB");
const nilaiC = document.getElementById("fr-nilaiC");
const nilaiD = document.getElementById("fr-nilaiD");
const tinggi = document.getElementById("fr-tinggi");
const btnHitung = document.querySelector("#btn-hitung")
const luas = document.querySelector("#txt-luas")
const keliling = document.querySelector("#txt-keliling")

const hitungLuas = (nA,nB,t) => 1/2 * (nA + nB) * t;
const hitungKeliling = (nA,nB,nC,nD) => nA + nB + nC + nD;

btnHitung.addEventListener('click', function (){
  let nA = Number(nilaiA.value);
  let nB = Number(nilaiB.value);
  let nC = Number(nilaiC.value);
  let nD = Number(nilaiD.value);
  let t =  Number(tinggi.value);
  luas.textContent = hitungLuas(nA,nB,t)
  keliling.textContent = hitungKeliling(nA,nB,nC,nD)
})