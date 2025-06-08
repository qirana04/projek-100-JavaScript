const luasAlas = document.getElementById('fr-luasAlas');
const luasSelimut = document.getElementById('fr-luasSelimut');
const tinggi = document.getElementById('fr-tinggi');
const luaspermukaan = document.querySelector("#txt-luaspermukaan");
const volume = document.querySelector('#txt-volume');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuaspermukaan = (lA,lS) => lA + lS;
const hitungVolume = (lA, t) => 1/3 * lA * t;

btnHitung.addEventListener('click', function (){
  let t = Number(tinggi.value);
  let lA = Number(luasAlas.value);
  let lS = Number(luasSelimut.value);
  luaspermukaan.textContent = hitungLuaspermukaan (lA, lS);
  volume.textContent =  hitungVolume (lA, t).toFixed(2)
})