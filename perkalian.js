console.log('test')

//get the HTML component

const angka1 = document.getElementById('angka1')
const angka2 = document.getElementById('angka2')
const btnHitung = document.getElementById("btn-hitung");
const hasil = document.querySelector("#txt-hasil");

//hitung hasil
btnHitung.addEventListener('click', function () {
  let hasilHitung = angka1.value * angka2.value;
  hasil.textContent = hasilHitung;
});