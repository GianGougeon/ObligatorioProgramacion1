import { UsuarioMemoria } from "../js/models/usuario.js";
const usuarioMemoria = new UsuarioMemoria();

// Verifica si ya está logueado
if (localStorage.getItem("usuario")) {
    window.location.href = "./datos.html";
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Obtiene el usuario guardado
    let usuarioGuardado = usuarioMemoria.leerUsuario();

    if (usuarioGuardado && usuarioGuardado.nombre === username && usuarioGuardado.password === password) {
        window.location.href = "./datos.html";
    } else if (!usuarioGuardado) {
        // Si no existe, lo crea
        usuarioMemoria.escribirUsuario({ nombre: username, password: password });
        window.location.href = "./datos.html";
    } else {
        alert("Usuario o contraseña incorrectos");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});

