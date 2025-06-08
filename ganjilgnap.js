function cek() {
  const nilai =
  parseInt(document.getElementById("angka").value);
    const hasil = (nilai % 2 == 0 ) ? "Genap" : "Ganjil";
    document.getElementById("hasil").innerHTML = hasil;
}