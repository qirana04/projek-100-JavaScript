function konversi() {
  const derajatInput = document.getElementById("derajat");
  const hasilDiv = document.getElementById("hasil");
  
  const derajat = parseFloat(derajatInput.value);
  
  if (isNaN(derajat)) {
    hasilDiv.innerHTML = "Masukkan nilai derajat yang sesuia";
    return;
  }
  
  const radian = (Math.PI / 180) * derajat;
  
  let gradien = Math.tan(radian);
  
  hasilDiv.innerHTML = `${derajat} derajat = ${gradien.toFixed(1)} gradien`;
  
  hasilDiv.innerHTML += `<br><small>Rumus: tan(${derajat}°) = ${gradien.toFixed(1)}</small>`;
  
  let interpretasi = "";
  if (gradien === 0) {
    interpretasi = "Bidang datar";
  } 
  else if (Math.abs(gradien) < 0.01) {
    interpretasi = "Kemiringan sangat kecil";
  } 
  else if (gradien > 0) {
    interpretasi = `Kemiringan ke atas ${(gradien * 100).toFixed(1)}%`;
  } 
  else {
    interpretasi = `Kemiringan ke bawah ${(-gradien * 100).toFixed(1)}%`;
  }
  
  hasilDiv.innerHTML += `<br><div style="margin-top: 10px; font-weight: normal;">Interpretasi: ${interpretasi}</div>`;
  }