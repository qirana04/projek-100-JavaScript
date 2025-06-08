 function cekKabisat() {
      const input = document.getElementById("inputTahun").value;
      const tahun = parseInt(input);
      const hasilElement = document.getElementById("hasil");
      
      if (isNaN(tahun) || input === "") {
        hasilElement.innerText = "Masukkan tahun yang valid!";
        return;
      }
      
      if (isKabisat(tahun)) {
        hasilElement.innerHTML = `<b>${tahun} </b> adalah <span style="color:green">TAHUN KABISAT</span>`;
      } else {
        hasilElement.innerHTML = `<b>${tahun}</b> adalah <span style="color:red">BUKAN tahun kabisat</span>`;
      }
    }

    function isKabisat(tahun) {
      return (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0;
    }