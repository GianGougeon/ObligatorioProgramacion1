// controllers/auth.controller.js
import { login, register, checkUser } from "../services/auth.service.js";
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();

// Funcion crear un usuario admin en memoria
export const inicializarAdminPorDefecto = () => {
    const usuario = usuarioMemoria.leerUsuario();
    if (!usuario) {
        usuarioMemoria.escribirUsuario({ nombre: "admin", password: "admin" });
        console.log("Usuario admin creado por defecto.");
    }
};

// Funcion para manejar el login
const manejarLogin = () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // captura los valores de los campos de usuario y contraseña
        try {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Caso especial: si es admin entra a datos
            if (username === "user" && password === "user") {
                usuarioMemoria.guardarUsuario({ nombre: "user", password: "user" });
                window.location.href = "./datos.html";
                return;
            }

            // Verifica si el login es válido
            if (login(username, password)) {
                window.location.href = "./datos.html";
                return;
            }

            // Verifica si al menos el nombre coincide (usuario registrado)
            const usuario = usuarioMemoria.leerUsuario();
            if (usuario && usuario.nombre === username) {
                usuarioMemoria.guardarUsuario({ nombre: username, password }); // opcional
                window.location.href = "./../../../index.html";
            } else {
                alert("Usuario o contraseña incorrectos");
                form.reset();
            }
        } catch (error) {
            console.error("Error durante el proceso de login:", error);
            alert("Ocurrió un error inesperado durante el login. Por favor, intenta de nuevo.");
        }
    });
};

const manejarRegistro = () => {
    const form = document.getElementById("registroForm");
    if (!form) {
        console.error("Formulario de registro no encontrado");
        return;
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;

        if (register(username, password)) {
            alert("Registro exitoso");
            checkUser();
        } else {
            alert("Por favor, complete todos los campos");
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        }
    });

}

export { manejarLogin, manejarRegistro };
