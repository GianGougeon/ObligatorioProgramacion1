// cargar el usuario desde el localStorage
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();
// Cambia el texto del botón de perfil según el estado del usuario
const cambiarTextoPerfil = (text) => {
    const profile = document.getElementById("perfil");
    if (!profile) {
        return; // Si no se encuentra el elemento, no hacemos nada
    }
    const button = profile.querySelector('.btn');
    if (button) {
        button.textContent = text;
    };
}

// Chequea el perfil del usuario y actualiza el texto del botón
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

