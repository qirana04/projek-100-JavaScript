const luas_alas = document.getElementById('fr-luas_alas')
const keliling_alas = document.getElementById('fr-keliling_alas')
const tinggi = document.getElementById('fr-tinggi')
const panjang = document.getElementById('fr-panjang')
const lebar = document.getElementById('fr-lebar')
const btnhasil = document.querySelector('#btn-hasil')
const luas_permukaan = document.querySelector('#txt-luasP')
const volume = document.querySelector('#txt-volume')

const hasilluaspermukaan = (LA, KA, t) => (2 * LA) + (KA * t);
const hasilvolume = (p,l,t) => p * l * t;

btnhasil.addEventListener('click', function () {
  let LA = Number(luas_alas.value);
  let KA = Number(keliling_alas.value);
  let t = Number(tinggi.value);
  let p = Number(panjang.value);
  let l = Number(lebar.value);

  luas_permukaan.textContent = hasilluaspermukaan (LA,KA,t);
  volume.textContent = hasilvolume (p,l,t);
})