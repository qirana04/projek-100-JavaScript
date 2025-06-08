function hitungUmur() {
  const tanggal = parseInt(document.getElementById('tanggal').value);
  const bulan = parseInt(document.getElementById('bulan').value);
  const tahun = parseInt(document.getElementById('tahun').value);
  
  if (isNaN(tanggal) || isNaN(bulan) || isNaN(tahun)) {
    alert("Mohon isi semua field dengan angka!");
    return;
  }
  try {
    const lahir = new Date(tahun, bulan - 1, tanggal);
    if (lahir.getDate() !== tanggal || 
    lahir.getMonth() !== bulan - 1 || 
    lahir.getFullYear() !== tahun) {
      throw new Error("Tanggal tidak valid!");
    }
    
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const hariIni = new Date();
    const selisihWaktu = hariIni - lahir;
    const umurHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
    const umurTahun = Math.floor(umurHari / 365);
    const umurBulanSisa = Math.floor((umurHari % 365) / 30);
    const hasil =
    `Tanggal lahirmu Adalah\t\t= ${lahir.toLocaleDateString('id-ID')}
Hari Ini Tanggal\t\t= ${hariIni.toLocaleDateString('id-ID')}
Hari Nya Adalah\t\t\t= ${hari[lahir.getDay()]}
Umur Anda Adalah\t\t= ${umurTahun} Tahun, ${umurBulanSisa} Bulan`;
        
  document.getElementById('result').textContent = hasil;
} catch (error) {
  alert(error.message);
}
}