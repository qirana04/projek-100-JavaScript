function cari_kpk(a, b) {
  let kpk = Math.max(a, b);
  let cari = kpk;
  
  while (kpk === Math.max(a, b)) {
    if (cari % a === 0 && cari % b === 0) {
      kpk = cari;
    }
    cari++;
  }
  return kpk;
}

function hitungKPK() {
  const bilangan1 = parseInt(document.getElementById('bilangan1').value);
  const bilangan2 = parseInt(document.getElementById('bilangan2').value);
  
  if (isNaN(bilangan1) || isNaN(bilangan2)) {
    document.getElementById('hasil').textContent = 'Masukan nilai yang benar';
    return;
  }
  if (bilangan1 <= 0 || bilangan2 <= 0) {
    document.getElementById('hasil').textContent = 'Bilangan harus lebih besar dari';
    return;
  }
  
  const hasil_kpk = cari_kpk(bilangan1, bilangan2);
  
  document.getElementById('hasil').innerHTML = 
  `KPK dari ${bilangan1} dan ${bilangan2} adalah ${hasil_kpk}`;}
  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      hitungKPK();}
    });