import { Memoria } from "../models/memoria.js";
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();

export const checkUser = () => {
    const usuario = new Memoria().leer("usuario");
    if (!usuario) {
        window.location.href = "./sesion.html";
    }
};

// services/auth.service.js
const login = (username, password) => {
    if (username === "user" && password === "user") {
        usuarioMemoria.escribirUsuario({ nombre: username, password });
        return true;
    }
    return false;
};

const isAuthenticated = () => {
    return !!usuarioMemoria.leerUsuario();
};

const redirectIfAuthenticated = () => {
    if (isAuthenticated()) {
        window.location.href = "./datos.html";
    }
};

const redirectIfNotAuthenticated = () => {
    if (!isAuthenticated() && window.location.pathname.endsWith("datos.html")) {
        window.location.href = "./sesion.html";
    }
};

const logout = () => {
    usuarioMemoria.eliminarUsuario?.(); // Asegurate de tener este método en tu clase UsuarioMemoria
};

export {
    login,
    isAuthenticated,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
    logout
};
