import {
    agregarPeliculaDOM,
    modificarPeliculaDOM,
    eliminarPeliculaDOM,
    reiniciarMemoriaDOM,
    cargarPeliculasDOM,
} from "./controllers/peliculas.controller.js";
import { btnNuevaPelicula, btnModificarPelicula, btnEliminarPelicula } from "./controllers/datos.controller.js";
import { checkUserProfile } from "./components/checkUserProfile.component.js";
// Cargar el catálogo de películas y los botones de administración
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pelicula-form")?.addEventListener("submit", agregarPeliculaDOM);
    document.getElementById("modificar-form")?.addEventListener("submit", modificarPeliculaDOM);
    document.getElementById("eliminar-pelicula")?.addEventListener("click", eliminarPeliculaDOM);
    document.getElementById("reiniciar-memoria")?.addEventListener("click", reiniciarMemoriaDOM);
    // Botones admin
    document.getElementById("btnNuevaPelicula")?.addEventListener("click", btnNuevaPelicula);
    document.getElementById("btnModificarPelicula")?.addEventListener("click", btnModificarPelicula);
    document.getElementById("btnEliminarPelicula")?.addEventListener("click", btnEliminarPelicula);
    cargarPeliculasDOM();
    checkUserProfile();
});
