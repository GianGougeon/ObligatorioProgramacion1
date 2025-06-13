// cargar peliculas desde localstorage con fetch
import { Memoria } from "./models/memoria.js";
import { data } from "./data.js";

let peliculasGuardadas = [...data];

const cargarPeliculas = async () => {
    console.log("Cargando películas desde memoria...");

    const memoria = new Memoria();
    const peliculasMemoria = memoria.leer("peliculas");

    if (peliculasMemoria) {
        console.log("Películas encontradas en memoria:", peliculasMemoria);
        return peliculasMemoria;
    } else {
        console.log("No se encontraron películas en memoria, cargando datos por defecto...");
        memoria.escribir("peliculas", peliculasGuardadas);
        return peliculasGuardadas;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    cargarPeliculas().then(peliculas => {
        console.log("Películas cargadas desde memoria:", peliculas);
        imprimirPeliculas(peliculas);
    }).catch(error => {
        console.error("Error al cargar las películas:", error);
    });
});

const imprimirPeliculas = (peliculas) => {
    console.log("Imprimiendo películas:", peliculas);
    const tarjetasPeliculas = document.getElementById("tarjetasPeliculas");
    if (!tarjetasPeliculas) return;

    tarjetasPeliculas.innerHTML = "";

    peliculas.forEach(pelicula => {
        tarjetasPeliculas.innerHTML += `
            <div class="card">
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}" />
                <div class="card-body">
                    <p>Genero: ${pelicula.genero}</p>
                    <p>Titulo: ${pelicula.titulo}</p>
                    <p>Clasificacion: ${pelicula.clasificacion}</p>
                </div>
            </div>
        `;
    });
    console.log("Películas impresas en el DOM");
}

