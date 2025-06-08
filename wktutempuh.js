function hitungWaktu() {
  const jarakInput = document.getElementById("jarak");
  const kecepatanInput = document.getElementById("kecepatan");
  const hasilDiv = document.getElementById("hasil");
  
  const jarak = parseFloat(jarakInput.value);
  const kecepatan = parseFloat(kecepatanInput.value);
  
  if (isNaN(jarak) || isNaN(kecepatan)) {
    hasilDiv.innerHTML = "Masukkan nilai dengan benar";
    return;
  }
  if (jarak < 0) {
    hasilDiv.innerHTML = "Jarak tidak boleh negatif";
    return;
  }
  if (kecepatan <= 0) {
    hasilDiv.innerHTML = "Kecepatan harus lebih besar dari 0";
    return;
  }
  const waktu = jarak / kecepatan;
  const jam = Math.floor(waktu);
  const menit = Math.round((waktu - jam) * 60);
  hasilDiv.innerHTML = `Waktu Tempuh Nya Adalah = ${waktu.toFixed(2)} jam`;

  if (jam > 0 || menit > 0) {
    hasilDiv.innerHTML += `<br>Atau ${jam} jam ${menit} menit`;
  }
  
  hasilDiv.innerHTML += `<br><small>Rumus: ${jarak} km / ${kecepatan} km/jam = ${waktu.toFixed(2)} jam</small>`;
}