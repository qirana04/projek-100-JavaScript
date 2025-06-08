//get the HTML component
const panjang = document.getElementById('fr-panjang')
const lebar = document.getElementById('fr-lebar');
const tinggi = document.getElementById('fr-tinggi');
const btnHitung = document.getElementById("btn-hitung");
const keliling = document.querySelector('#txt-hasil');
const luas = document.querySelector("#txt-luas");
const volume = document.querySelector("#txt-volume");

//fungsi konvesional
function hitungLuas(panjang, lebar, tinggi){
  return 2* ((panjang *lebar) + (panjang * tinggi) + (lebar * tinggi))
}

//fungsi dan arrow function (arrow function)
const hitungVolume = (panjang, lebar, tinggi) => panjang * lebar * tinggi

//onclick hitung
btnHitung.addEventListener ('click', function (){
  luas.textContent = hitungLuas(panjang.value, lebar.value, tinggi.value)
  volume.textContent = hitungVolume(panjang.value, lebar.value, tinggi.value)
})