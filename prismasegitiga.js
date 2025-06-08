const luasAlas = document.getElementById('fr-luasAlas');
const luasSelimut = document.getElementById('fr-luasSelimut');
const tinggi = document.getElementById('fr-tinggi');
const luas = document.querySelector("#txt-luas");
const volume = document.querySelector('#txt-volume');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (lA,lS) => (2 * (lA) + (lS));
const hitungVolume = (lA, t) => (lA * t);

btnHitung.addEventListener('click', function (){
  let t = Number(tinggi.value);
  let lA = Number(luasAlas.value);
  let lS = Number(luasSelimut.value);
  luas.textContent = hitungLuas (lA, lS);
  volume.textContent =  hitungVolume (lA, t);
})