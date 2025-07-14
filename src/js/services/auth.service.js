import { Memoria } from "../models/memoria.js";
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();


// Chequea si el usuario está autenticado
export const checkUser = () => {
    const usuario = new Memoria().leer("usuario");
    const admin = usuario.nombre !== "admin" || usuario.password !== "admin";
    // Si el usuario no es admin, redirige a perfil.html, si es admin, redirige a datos.html
    if (admin) {
        console.log("Usuario no es admin, redirigiendo a index.html");
        window.location.href = "./perfil.html";
    } else {
        console.log("Usuario es admin, redirigiendo a datos.html");
        window.location.href = "./datos.html";
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
// Verifica si el usuario está autenticado
const isAuthenticated = () => {
    return !!usuarioMemoria.leerUsuario();
};
// Cierra la sesión del usuario eliminando los datos del usuario en memoria
const logout = () => {
    usuarioMemoria.eliminarUsuario();
};
// Exporta las funciones de autenticación
export {
    login,
    register,
    isAuthenticated,
    logout,
};
