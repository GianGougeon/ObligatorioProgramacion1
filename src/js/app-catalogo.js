// main-catalogo.js
import { iniciarCatalogo } from "./controllers/catalogo.controller.js";
import { isAuthenticated, logout} from "./services/auth.service.js";
document.addEventListener("DOMContentLoaded", () => {
    iniciarCatalogo();
    
});

document.addEventListener("DOMContentLoaded", () => {
    const btnPerfil = document.getElementById("btnPerfil");

    // Si el usuario NO está autenticado, se oculta el botón
    if (!isAuthenticated() && btnPerfil) {
        btnPerfil.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnSalir = document.getElementById("Salir");
if (!isAuthenticated() && btnSalir){
    btnSalir.style.display = "none";
}
    if (btnSalir) {
        btnSalir.addEventListener("click", () => {
            logout(); // elimina al usuario del almacenamiento
            alert("Se a cerrado su session con exito!")
            window.location.href = "../../index.html"; // redirige al inicio (ajustá la ruta si hace falta)
        });
    }
});