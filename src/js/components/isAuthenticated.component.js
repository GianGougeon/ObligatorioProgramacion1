import { isAuthenticated } from '../services/auth.service.js';
import { UsuarioMemoria } from "../models/usuario.js";

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