/* Importa memoria Usuario */
import { UsuarioMemoria } from "../js/models/usuario.js";
const usuarioMemoria = new UsuarioMemoria();
// Verifica si ya está logueado
if (usuarioMemoria.leerUsuario()) {
    window.location.href = "./datos.html";
}
// Si este archivo se usa en otras páginas, redirige a sesion.html si NO está logueado
if (!usuarioMemoria.leerUsuario() && window.location.pathname.endsWith("datos.html")) {
    /* Redirige a la página de sesión */
    window.location.href = "./sesion.html";
}
/* Maneja el formulario de login */
document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    /* Previene el comportamiento por defecto del formulario */
    event.preventDefault();
    /* Obtiene los valores de usuario y contraseña */
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Solo permite acceso si username y password son "user"
    if (username === "user" && password === "user") {
        // Guarda en memoria que el usuario está logueado
        usuarioMemoria.escribirUsuario({ nombre: username, password: password });
        /* Redirige a la página de datos */
        window.location.href = "./datos.html";
    } else {
        alert("Usuario o contraseña incorrectos");
        // Limpia los campos de usuario y contraseña
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
});

