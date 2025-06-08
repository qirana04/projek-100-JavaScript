function hitung(){
  const jariJari= parseFloat(document.getElementById('jari-jari').value);

  if (isNaN(jariJari) || jariJari <= 0){
    alert("Masukkan jari-jari yang valid (bilangan positif)!");
    return;
  }

  const volume = (4 / 3) * Math.PI * Math.pow(jariJari, 3);
  const luas = 4 * Math.PI * Math.pow(jariJari, 2);

  document.getElementById('volume').textContent =
    `volume: ${volume.toFixed(2)}`;
  document.getElementById('luas').textContent =
    `Luas Permukaan: ${luas.toFixed(2)}`;
}