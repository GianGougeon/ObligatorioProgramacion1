import { manejarLogin, manejarRegistro } from "./controllers/auth.controller.js";
import { checkUser } from "./services/auth.service.js";

// Referencias al DOM
const contenedor = document.getElementById("formularioContainer");
const btnLogin = document.getElementById("btnLogin");
const btnRegistro = document.getElementById("btnRegistro");

// Render de formulario de login
const renderLogin = () => {
    contenedor.innerHTML = `
        <form class="formulario" id="loginForm">
            <div>
                <label for="username">Usuario:</label>
                <input type="text" id="username" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" required />
            </div>
            <button type="submit" class="btn">Iniciar Sesión</button>
        </form>
    `;
    manejarLogin();
};

// Render de formulario de registro
const renderRegistro = () => {
    contenedor.innerHTML = `
        <form class="formulario" id="registroForm">
            <div>
                <label for="newUsername">Nuevo Usuario:</label>
                <input type="text" id="newUsername" required />
            </div>
            <div>
                <label for="newPassword">Contraseña:</label>
                <input type="password" id="newPassword" required />
            </div>
            <button type="submit" class="btn">Registrarse</button>
        </form>
    `;
    manejarRegistro();
};

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderLogin(); // Muestra login por defecto
    // Listeners para cambiar entre formularios
    btnLogin.addEventListener("click", renderLogin);
    btnRegistro.addEventListener("click", renderRegistro);
    // Manejar el logout
    // Chequea si el usuario está autenticado
    checkUser();
});
