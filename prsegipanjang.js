const panjang = document.getElementById('fr-panjang');
const lebar = document.getElementById('fr-lebar');
const luas = document.querySelector("#txt-luas");
const keliling = document.querySelector('#txt-keliling');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (p, l) => p * l;

btnHitung.addEventListener('click', function (){
  let p = Number(panjang.value);
  let l = Number(lebar.value);
  luas.textContent = hitungLuas (p , l);
})