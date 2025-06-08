function hitungJarakNyata() {
  const skala = parseFloat(document.getElementById("skala").value);
  const jarakPeta = parseFloat(document.getElementById("jarakPeta").value);

  if (isNaN(skala) || isNaN(jarakPeta)) {
    tampilkanHasil("Masukkan nilai skala dan jarak peta dengan benar.");
    return;
  }

  const jarakNyataKm = (jarakPeta * skala) / 100000;
  tampilkanHasil(`Jarak sebenarnya: ${jarakNyataKm.toFixed(2)} km`);
}

function hitungJarakPeta() {
  const skala = parseFloat(document.getElementById("skala").value);
  const jarakNyata = parseFloat(document.getElementById("jarakNyata").value);

  if (isNaN(skala) || isNaN(jarakNyata)) {
    tampilkanHasil("Masukkan nilai skala dan jarak sebenarnya dengan benar.");
    return;
  }
  
  const jarakPetaCm = (jarakNyata * 100000) / skala;
  tampilkanHasil(`Jarak di peta: ${jarakPetaCm.toFixed(2)} cm`);
}

function tampilkanHasil(teks) {
  document.getElementById("hasil").innerText = teks;
}
