// controllers/auth.controller.js
import { login, register, checkUser } from "../services/auth.service.js";
import { UsuarioMemoria } from "../models/usuario.js";

const usuarioMemoria = new UsuarioMemoria();

// Funcion para manejar el login
const manejarLogin = () => {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        try {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Validación de campos vacíos
            if (!username || !password) {
                alert("Por favor, complete ambos campos.");
                return;
            }

            // Validación especial para admin
            if (username === "admin" && password === "admin") {
                usuarioMemoria.escribirUsuario({ nombre: "admin", password: "admin" });
                window.location.href = "./datos.html";
                return;
            }

            // Validación con función login (debes definirla tú)
            if (login(username, password)) {
                window.location.href = "./datos.html";
                return;
            }

            // Si no es válido
            alert("Usuario o contraseña incorrectos.");
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
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value.trim();

        // Validar campos vacíos
        if (!username || !password) {
            alert("Por favor, complete todos los campos");
            return;
        }

        // Bloquear intento de registrar "admin"
        if (username.toLowerCase() === "admin") {
            alert("El nombre de usuario 'admin' está reservado y no puede ser registrado.");
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
            return;
        }

        if (register(username, password)) {
            alert("Registro exitoso");
            checkUser();
        } else {
            alert("Error al registrar. Intente con otro nombre de usuario.");
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
        }
    });
};

export { manejarLogin, manejarRegistro };
