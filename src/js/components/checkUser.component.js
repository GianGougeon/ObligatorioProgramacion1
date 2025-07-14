import { UsuarioMemoria } from "../models/usuario.js";
const usuarioMemoria = new UsuarioMemoria();

// Chequea si el usuario está en memoria y redirige a login si no existe
const chequeaUsuario = () => {
    const usuario = usuarioMemoria.leerUsuario();
    if (!usuario) {
        window.location.href = "/index.html";
    }
}
// Espera que cargue el DOM para ejecutar la función
document.addEventListener("DOMContentLoaded", () => {
    chequeaUsuario();
});