const rusuk = document.getElementById('fr-rusuk');
const luas = document.querySelector("#txt-luas");
const volume = document.querySelector('#txt-volume');
const btnHitung = document.getElementById("btn-hitung");

const hitungLuas = (r) => 6 * r * r ;
const hitungVolume = (r) => r * r * r;

btnHitung.addEventListener('click', function (){
  let r = Number(rusuk.value);
  luas.textContent = hitungLuas (r);
  volume.textContent = hitungVolume (r);
})