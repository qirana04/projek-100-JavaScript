function aritmatika(n, a, b) {
  const un = a + (n - 1) * b;
  
  const sn = (n / 2) * (2 * a + (n - 1) * b);
  
  const hasilDiv = document.getElementById("hasil");
  hasilDiv.innerHTML = `
    <div>Suku Ke-${n} (Un) = ${un}</div>
    <div>Jumlah ${n} Suku Pertama (Sn) = ${sn}</div>`;
        }

  function hitungAritmatika() {
    const n = parseInt(document.getElementById("n").value);
    const a = parseInt(document.getElementById("a").value);
    const b = parseInt(document.getElementById("b").value);
  
  if (isNaN(n) || isNaN(a) || isNaN(b)) {
    document.getElementById("hasil").innerHTML = "Masukkan semua nilai dengan benar";
    return;
  }
  
  aritmatika(n, a, b);
  }