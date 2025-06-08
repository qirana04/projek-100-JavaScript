        function validateForm() {
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorElement = document.getElementById('error');
            
            if (password.length < 6) {
                errorElement.textContent = "Password harus minimal 6 karakter";
                return false;
            }
            
            if (!email.includes('@')) {
                errorElement.textContent = "Email harus valid";
                return false;
            }
            
            errorElement.textContent = "";
            alert("Form berhasil disubmit!");
            return true;
        }