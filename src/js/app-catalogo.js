import { iniciarCatalogo, cargarPelisBuscador } from "./controllers/catalogo.controller.js";
// Espera a que el DOM esté completamente cargado antes de iniciar el catálogo y cargar las películas
document.addEventListener("DOMContentLoaded", () => {
    iniciarCatalogo();
    cargarPelisBuscador();
});
