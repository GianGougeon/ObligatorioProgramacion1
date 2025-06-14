// cargar peliculas desde localstorage con fetch
import { Memoria } from "./models/memoria.js";
import { data } from "./data.js";
import { MemoriasAlquiladas } from "./models/memoriasAlquiladas.js";

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

    peliculas.forEach((pelicula, index) => {
        tarjetasPeliculas.innerHTML += `
            <div class="card">
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}" />
                <div class="card-body">
                    <p>Genero: ${pelicula.genero}</p>
                    <p>Titulo: ${pelicula.titulo}</p>
                    <p>Clasificacion: ${pelicula.clasificacion}</p>
                    <button class="btn" data-id="${pelicula.id}">Alquilar</button>
                </div>
            </div>
        `;
    });

    console.log("Películas impresas en el DOM");

    const botonesAlquilar = document.querySelectorAll(".btn");
    const memoriasAlquiladas = new MemoriasAlquiladas();

    botonesAlquilar.forEach((boton) => {
        const id = parseInt(boton.getAttribute("data-id"));
        const pelicula = peliculas.find(p => p.id === id);

        if (!pelicula) return;

        // Verificar si ya estaba alquilada y actualizar botón
        if (pelicula.alquilada) {
            boton.textContent = "Alquilada";
            boton.disabled = true;
        }

        boton.addEventListener("click", () => {
            pelicula.alquilada = true;
            pelicula.VecesAlquilada = (pelicula.VecesAlquilada || 0) + 1;

            // Guardar en almacenamiento
            const memoria = new Memoria();
            memoria.escribir("peliculas", peliculas);

            // Guardar en lista de alquiladas (si querés usarla)
            memoriasAlquiladas.agregarMemoria(pelicula);

            // Actualizar botón
            boton.textContent = "Alquilada";
            boton.disabled = true;

            alert(`Película "${pelicula.titulo}" alquilada exitosamente!`);
            console.log(`Película alquilada: ${pelicula.titulo}`);
        });
    });
};