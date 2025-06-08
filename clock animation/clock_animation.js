function updateClock() {
    const now = new Date();
    const secondRatio = now.getSeconds() / 60;
    const minuteRatio = (secondRatio + now.getMinutes()) / 60;
    const hourRatio = (minuteRatio + now.getHours()) / 12;

    setRotation(document.querySelector('.hand.second'), secondRatio * 360);
    setRotation(document.querySelector('.hand.minute'), minuteRatio * 360);
    setRotation(document.querySelector('.hand.hour'), hourRatio * 360);

    requestAnimationFrame(updateClock);
}

function setRotation(element, rotation) {
    element.style.setProperty('--rotation', rotation);
}

updateClock();