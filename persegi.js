const sisi = document.getElementById('fr-sisi');
const keliling = document.querySelector('#txt-keliling');
const luas = document.querySelector("#txt-luas");
const btnHitung = document.getElementById("btn-hitung");

function hitungLuas (sisi){
  return (sisi * sisi);
}

const hitungKeliling = (sisi) => 4 *sisi;

btnHitung.addEventListener('click', function (){
  luas.textContent = hitungLuas (parseInt(sisi.value))
  keliling.textContent = hitungKeliling (parseInt(sisi.value))
})