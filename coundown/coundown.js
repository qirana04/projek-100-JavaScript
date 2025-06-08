function countdown() {
  let set = document.getElementById("set_waktu").value;
  let sisa = document.getElementById("sisa_waktu");
  const interval = setInterval(() => {
        sisa.innerHTML = "Sisa waktu: " + set + " detik";
    set--;
    if (set < 0) {
      clearInterval(interval);
      sisa.innerHTML = "Waktu Habis";
    }
  }, 1000)
}