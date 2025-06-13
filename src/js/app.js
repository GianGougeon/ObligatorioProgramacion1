import { peliculas } from "./models/peliculas.js";
import { Memoria } from "./models/memoria.js";
import { data } from "./data.js";
// Archivo principal de JavaScript

let peliculasArray = [...data];

const inicio = () => {
    document.getElementById("agregar-pelicula").addEventListener("click", agregarPelicula);
}
const agregarPelicula = () => {
    const generarId = () => {
        return Math.floor(Math.random() * 10000); // Genera un ID aleatorio entre 0 y 9999
    }
    const id = generarId(); // Si no hay ID, genera uno nuevo
    const titulo = document.getElementById("titulo").value;
    const genero = document.getElementById("genero").value;
    const director = document.getElementById("director").value;
    const pais = document.getElementById("pais").value;
    const anio = document.getElementById("anio").value;
    const clasificacion = document.getElementById("clasificacion").value;
    const alquilada = document.getElementById("alquilada").checked;
    const precio = document.getElementById("precio").value;
    const VecesAlquilada = document.getElementById("VecesAlquilada").value;

    // Crear una nueva instancia de la clase peliculas
    const nuevaPelicula = new peliculas(
        id,
        titulo,
        genero,
        director,
        pais,
        anio,
        clasificacion,
        alquilada,
        VecesAlquilada,
        precio
    );

    if (!nuevaPelicula.id || !nuevaPelicula.titulo || !nuevaPelicula.genero || !nuevaPelicula.director || !nuevaPelicula.pais || !nuevaPelicula.anio || !nuevaPelicula.clasificacion || !nuevaPelicula.precio) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }
    peliculasArray.push(nuevaPelicula);
    // guardarPeliculas();
    const LaMemoria = new Memoria();
    LaMemoria.escribir("peliculas", peliculasArray);
    listarPeliculas();


};
const listarPeliculas = () => {
    const listaPeliculas = document.getElementById("listaPeliculas");
    listaPeliculas.innerHTML = ""; // Limpiar la lista antes de mostrar las películas

    peliculasArray.forEach((pelicula) => {
        const li = document.createElement("li");
        li.textContent = `${pelicula.id} - ${pelicula.titulo} - ${pelicula.genero} - ${pelicula.director} - ${pelicula.pais} - ${pelicula.anio} - ${pelicula.clasificacion} - Alquilada: ${pelicula.alquilada ? "Sí" : "No"} - Veces Alquilada: ${pelicula.VecesAlquilada} - Precio: $${pelicula.precio}`;
        listaPeliculas.appendChild(li);
    });
    console.log(peliculasArray);

}

// carga desde el array de peliculas y luego desde la memoria   
const cargarPeliculas = () => {
    const LaMemoria = new Memoria();
    const peliculasGuardadas = LaMemoria.leer("peliculas");
    if (peliculasGuardadas) {
        peliculasArray = peliculasGuardadas;
    } else {
        peliculasArray = [...data]; // Cargar datos por defecto si no hay guardados
    }
    listarPeliculas();
};


document.addEventListener("DOMContentLoaded", () => {
    inicio();
    cargarPeliculas();
});
