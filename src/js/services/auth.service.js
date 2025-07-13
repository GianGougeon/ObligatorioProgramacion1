import { Memoria } from "../models/memoria.js";
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();


// Chequea si el usuario está autenticado
export const checkUser = () => {
    const usuario = new UsuarioMemoria().leer("usuario");

    // Si no hay usuario guardado, redirigir al login
    if (!usuario) {
        console.log("No hay usuario, redirigiendo a sesion.html");
    
        return;
    }

    // Verificar si es admin
    const esAdmin = usuario.nombre === "user" || usuario.password === "user";

    if (esAdmin) {
        console.log("Usuario es admin, redirigiendo a datos.html");
        window.location.href = "./datos.html";
    } else {
        console.log("Usuario no es admin, redirigiendo a index.html");
        window.location.href = "./../../../index.html";
    }
}



// Autenticación para manejar el login
const login = (username, password) => {
    const usuario = usuarioMemoria.leerUsuario();
    if (usuario && usuario.nombre === username && usuario.password === password) {
        return true;
    }
    return false;
};

// registro de usuario
const register = (username, password) => {
    if (username && password) {
        usuarioMemoria.escribirUsuario({ nombre: username, password });
        return true;
    }
    return false;
};

const usuarioExiste = (username) => {
    const usuario = usuarioMemoria.leerUsuario();
    return usuario && usuario.nombre === username;
};

const isAuthenticated = () => {
    return !!usuarioMemoria.leerUsuario();
};

const logout = () => {
    usuarioMemoria.eliminarUsuario();
};

export {
    login,
    register,
    isAuthenticated,
    logout,
    usuarioExiste
};
