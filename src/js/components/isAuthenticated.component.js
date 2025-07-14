import { UsuarioMemoria } from "../models/usuario.js";

//  Verifica si el usuario está autenticado si se entra desde la url, para no permitir el acceso a la página de administración si no es admin
const isAuthenticatedComponent = () => {
    const usuarioMemoria = new UsuarioMemoria();
    const admin = usuarioMemoria.leerUsuario();
    const isAdmin = admin && (admin.nombre === "admin" || admin.password === "admin");
    if (!isAdmin) {
        window.location.href = "./../../index.html";
    }
}

// Doom cargado
document.addEventListener("DOMContentLoaded", () => {
    isAuthenticatedComponent();
});