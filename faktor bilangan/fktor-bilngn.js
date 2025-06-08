function cariPasangan(n) {
  const pasangan = [];
  const batas = Math.floor(Math.sqrt(n));
  
  for (let i = 1; i <= batas; i++) {
    if (n % i === 0) {
      const pasang = [i, n / i];
      pasangan.push(pasang);
    }
  }
  
  return pasangan;
}
        
  function cariPasanganFaktor() {
  const inputBilangan = document.getElementById('inputBilangan');
  const bilangan = parseInt(inputBilangan.value);
  
  if (isNaN(bilangan) || bilangan < 1) {
    alert('Masukkan bilangan bulat positif lebih besar dari 0');
    return;
  }
  
  const pasangan = cariPasangan(bilangan);
  
  document.getElementById('judulHasil').textContent = `Pasangan Faktor Dari ${bilangan} Adalah =`;
  
  const hasilElement = document.getElementById('hasil');
  hasilElement.innerHTML = '';
  
  if (pasangan.length === 0) {
    hasilElement.textContent = 'Tidak ada pasangan faktor';
  } 
  else {
    pasangan.forEach(pasang => {
      const p = document.createElement('p');
      p.textContent = `(${pasang[0]}, ${pasang[1]})`;
      hasilElement.appendChild(p);});
    }
  }