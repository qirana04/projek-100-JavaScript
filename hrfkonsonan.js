function analisisTeks() {
  const inputTeks = document.getElementById('inputTeks');
  const teks = inputTeks.value;
  const jumlah = teks.length;
  let jumlahKonsonan = 0;
  let hurufKonsonan = '';
  
  for (let i = 0; i < teks.length; i++) {
    const karakter = teks[i];
    if (!'aiueoAIUEO'.includes(karakter)) {
      jumlahKonsonan++;
      hurufKonsonan += karakter + ' ';
    }
  }
  document.getElementById('jumlahKarakter').textContent = jumlah;
  document.getElementById('jumlahKonsonan').textContent = jumlahKonsonan;
  document.getElementById('hurufKonsonan').textContent = hurufKonsonan;
}