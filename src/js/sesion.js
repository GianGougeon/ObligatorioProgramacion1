import { UsuarioMemoria } from "../js/models/usuario.js";
const usuarioMemoria = new UsuarioMemoria();

// Verifica si ya está logueado
if (usuarioMemoria.leerUsuario()) {
    window.location.href = "./datos.html";
}

// Si este archivo se usa en otras páginas, redirige a sesion.html si NO está logueado
if (!usuarioMemoria.leerUsuario() && window.location.pathname.endsWith("datos.html")) {
    window.location.href = "./sesion.html";
}

document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Solo permite acceso si username y password son "user"
    if (username === "user" && password === "user") {
        // Guarda en memoria que el usuario está logueado
        usuarioMemoria.escribirUsuario({ nombre: username, password: password });
        window.location.href = "./datos.html";
    } else {
        alert("Usuario o contraseña incorrectos");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});

