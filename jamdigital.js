const hoursText = document.getElementById("jam")
const minutesText = document.getElementById("menit")
const secondsText = document.getElementById("detik")

const showClock = () => {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  hoursText.textContent = hours < 10 ? "0" + hours : hours
  minutesText.textContent = minutes < 10 ? "0" + minutes : minutes
  secondsText.textContent = seconds < 10 ? "0" + seconds : seconds
}

setInterval(showClock, 1000)

