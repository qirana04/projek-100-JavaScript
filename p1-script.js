//get random letter from characters array
//ability to set password length
//generating the password
// rendering password to screen
//ability to copy to clipboard
 /* Alert the copied text */

const characters  = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
    "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", "'", "\"", ",", "<", ".", ">", "/", "?", "\\", "|", " "]
let randomPassword1 = document.getElementById("pass-el-one");
let randomPassword2 = document.getElementById("pass-el-two");
let randomPassword3 = document.getElementById("pass-el-three");
let randomPassword4 = document.getElementById("pass-el-four");

let passwordElements = [randomPassword1, randomPassword2, randomPassword3, randomPassword4];
let lengthEl = document.getElementById("length-el")
let buttonBtn = document.getElementById("button")

function generateRandomCharacters() {
     let randomCharacters = Math.floor(Math.random()*characters.length);
     return characters[randomCharacters];
}

function updatePasswordLength() {
    let InputValue = lengthEl.value;
    return InputValue;

}

function generatePassword(length) {
            let password = "";
            let InputValue = parseInt(updatePasswordLength());
            for (let i = 0 ; i < InputValue ; i++) {
                password += generateRandomCharacters();
            }
            return password;
        }

function displayPassword() {

    randomPassword1.textContent = '';
    randomPassword2.textContent = '';
    randomPassword3.textContent = '';
    randomPassword4.textContent = '';

    let length = generatePassword()

    let = randomPassword1.textContent += generatePassword()
    let = randomPassword2.textContent += generatePassword()
    let = randomPassword3.textContent += generatePassword()
    let = randomPassword4.textContent += generatePassword()
}

function copyText() {
    const password1 = randomPassword1.textContent
    const password2 = randomPassword2.textContent
    const password3 = randomPassword3.textContent
    const password4 = randomPassword4.textContent

        navigator.clipboard.writeText(password1).then(() => {
            alert( "Password Copied : " + password1)});


         navigator.clipboard.writeText(password2).then(() => {
            alert( "Password Copied : " + password2)});


            navigator.clipboard.writeText(password3).then(() => {
                alert( "Password Copied : " + password3)});

                navigator.clipboard.writeText(password4).then(() => {
                    alert( "Password Copied : " + password4)})
        
        
        }


buttonBtn.addEventListener("click" , displayPassword)
randomPassword1.addEventListener("click" , copyText)