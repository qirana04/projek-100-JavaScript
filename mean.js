function hitungMean() {
  const input = document.getElementById("dataInput").value;
  const angka = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

  if (angka.length === 0) {
    document.getElementById("hasil").innerText = "Masukkan angka yang valid!";
    return;
  }

  const total = angka.reduce((a, b) => a + b, 0);
  const mean = total / angka.length;

  document.getElementById("hasil").innerText = `Rata-rata: ${mean.toFixed(2)}`;
}
