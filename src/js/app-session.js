// main-sesion.js
import { manejarLogin } from "./controllers/auth.controller.js";
import { redirectIfAuthenticated } from "./services/auth.service.js";

document.addEventListener("DOMContentLoaded", () => {
    redirectIfAuthenticated(); // Si ya está logueado, redirige
    manejarLogin(); // Espera al form para loguear
});
