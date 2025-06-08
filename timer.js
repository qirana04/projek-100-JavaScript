const btnStop = document.querySelector("#btn-stop");
const btnStart = document.querySelector("#btn-start");
const btnReset = document.querySelector("#btn-reset");

const jamText = document.querySelector("#jam");
const menitText = document.querySelector("#menit");
const detiktext = document.querySelector("#detik");

  let timer
  let jam = 0
  let menit = 0
  let detik = 0

  const increment = () => {
    detik++

    if (detik === 60) {
      detik = 0
      menit++
    } if (menit === 60) {
      menit = 0
      jam++
    }

    showTimer()
  }

  const showTimer = () => {
    jamText.textContent = jam < 10 ? "0" + jam : jam
    menitText.textContent = menit < 10 ? "0" + menit : menit
    detikText.textContent = detik < 10 ? "0" + detik: detik
  }

  btnStart.addEventListener("click", () => {
    timer = setInterval(increment, 1)
  })

   btnStop.addEventListener("click", () => {
    clearInterval(timer)
  })

  btnReset.addEventListener("click", () => {
    detik = 0
    menit = 0
    detik = 0

    showTimer()
  })


