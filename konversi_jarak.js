function konversi() {
  const meterInput = document.getElementById('meter').value;
  const meter = parseFloat(meterInput);
  if (isNaN(meter)) {
    alert("Masukkan angka yang valid!");
    return;

}
  const kilometer = meter / 1000;
  const hektameter = meter / 100;
  const dekameter = meter / 10;
  const desimeter = meter * 10;
  const centimeter = meter * 100;
  const milimeter = meter * 1000;

const hasil = `Jarak Dalam Satuan Kilometer  (KM)\t= ${kilometer}
Jarak Dalam Satuan Hektameter (HM)\t= ${hektameter}
Jarak Dalam Satuan Dekameter  (DAM)\t= ${dekameter}
Jarak Dalam Satuan Desimeter  (DM)\t= ${desimeter}
Jarak Dalam Satuan Centimeter (CM)\t= ${centimeter}
Jarak Dalam Satuan Milimeter  (MM)\t= ${milimeter}`;
document.getElementById('result').textContent = hasil;
}