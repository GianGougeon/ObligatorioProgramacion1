import { UsuarioMemoria } from "../models/usuario.js";
const usuarioMemoria = new UsuarioMemoria();

const chequeaUsuario = () => {
    // Cargar el usuario desde memoria y chequear que exista, sino hay nada, redirige a login
    const usuario = usuarioMemoria.leerUsuario();
    if (!usuario) {
        window.location.href = "/index.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    chequeaUsuario();
});