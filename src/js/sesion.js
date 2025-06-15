
document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Evita el envío del formulario

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            
            if (username === "user" && password === "user") {
                alert("Inicio de sesión exitoso");
                
                window.location.href = "./datos.html"; // Redirige a la página de datos
            } else {
                alert("usuario o contraseña incorrectos");
                limpiarCampos(); // Limpia los campos de entrada
            }
        });

        function limpiarCampos() {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }