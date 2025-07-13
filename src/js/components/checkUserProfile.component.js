// cargar el usuario desde el localStorage
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();

const cambiarTextoPerfil = (text) => {
    const profile = document.getElementById("perfil");
    const button = profile.querySelector('.btn');
    if (button) {
        button.textContent = text;
    };
}


export const checkUserProfile = () => {
    // Cargar el usuario desde memoria
    const usuario = usuarioMemoria.leerUsuario();
    // chequea si el usuario es admin
    const isAdmin = usuario && (usuario.nombre === "admin" || usuario.password === "admin");
    if (!usuario) {
        cambiarTextoPerfil(`Iniciar sesión`);
    } else if (isAdmin) {
        cambiarTextoPerfil(`Admin`);
    } else {
        cambiarTextoPerfil(`Perfil`);
    }
}
// cargar cuando el doom esté listo
document.addEventListener("DOMContentLoaded", () => {
    checkUserProfile();
});

