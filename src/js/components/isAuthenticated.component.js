import { isAuthenticated } from '../services/auth.service.js';

const isAuthenticatedComponent = () => {
    if (!isAuthenticated()) {
        console.log("No hay usuario autenticado, redirigiendo a index.html");
        window.location.href = "./../../index.html";
    }
}

// Doom cargado
document.addEventListener("DOMContentLoaded", () => {
    isAuthenticatedComponent();
});