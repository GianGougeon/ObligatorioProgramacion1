// main.js
import {
    agregarPeliculaDOM,
    modificarPeliculaDOM,
    eliminarPeliculaDOM,
    reiniciarMemoriaDOM,
    cargarPeliculasDOM,
} from "./controllers/peliculas.controller.js";

import { checkUser } from "./services/auth.service.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pelicula-form")?.addEventListener("submit", agregarPeliculaDOM);
    document.getElementById("modificar-form")?.addEventListener("submit", modificarPeliculaDOM);
    document.getElementById("eliminar-pelicula")?.addEventListener("click", eliminarPeliculaDOM);
    document.getElementById("reiniciar-memoria")?.addEventListener("click", reiniciarMemoriaDOM);
    cargarPeliculasDOM();
    checkUser();
});
