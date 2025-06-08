let count = 0;
const counterElement = document.getElementById('counter');
        
function tambah() {
    count++;
    counterElement.textContent = count;
}
        
function kurang() {
    count--;
    counterElement.textContent = count;
}
        
function reset() {
    count = 0;
    counterElement.textContent = count;
}