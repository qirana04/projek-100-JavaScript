const jarijari = document.getElementById("fr-jarijari")
const tinggi = document.getElementById("fr-tinggi")
const btnHitung = document.querySelector("#btn-hitung")
const Luaspermukaan = document.querySelector("#txt-Luaspermukaan")
const Volume = document.querySelector("#txt-Volume")

const hitungLuaspermukaan = (jarijari, tinggi) => 2 * Math.PI * jarijari * (jarijari + tinggi);
const hitungVolume = (jarijari, tinggi) => Math.PI * jarijari * jarijari * tinggi;

btnHitung.addEventListener('click', function (){
  Luaspermukaan.textContent = hitungLuaspermukaan(jarijari.value, tinggi.value).toFixed(2)
  Volume.textContent = hitungVolume(jarijari.value, tinggi.value).toFixed(2)
})