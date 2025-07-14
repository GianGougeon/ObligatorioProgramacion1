// services/catalogo.service.js
import { Memoria } from "../models/memoria.js";
import { data } from "../data/data.js";
import { MemoriasAlquiladas } from "../models/memoriasAlquiladas.js";
//  Carga las películas desde data.js y las guarda en memoria
let peliculasGuardadas = [...data];

// Si no hay películas guardadas, las inicializa con las de data.js
const cargarPeliculas = () => {
    const memoria = new Memoria();
    const peliculasMemoria = memoria.leer("peliculas");
    // Si ya hay películas en memoria, las devuelve, si no, las guarda y las devuelve
    if (peliculasMemoria) {
        return peliculasMemoria;
    } else {
        memoria.escribir("peliculas", peliculasGuardadas);
        return peliculasGuardadas;
    }
};
// Guarda las películas en memoria, se usa al alquilar una película o al modificar una película
const guardarPeliculas = (peliculas) => {
    const memoria = new Memoria();
    memoria.escribir("peliculas", peliculas);
};
// Alquila una película, actualiza su estado y guarda los cambios en memoria
const alquilarPelicula = (pelicula, nombreCliente) => {
    pelicula.nombreCliente = nombreCliente.trim();
    pelicula.alquilada = true;
    pelicula.VecesAlquilada = (pelicula.VecesAlquilada || 0) + 1;
    // Si la película ya está alquilada, no se puede alquilar de nuevo
    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];
    // Busca la película en memoria por su ID y actualiza su estado
    const index = peliculas.findIndex(p => p.id === pelicula.id);
    // Si la película no está en memoria, no se puede alquilar
    if (index !== -1) peliculas[index] = pelicula;
    // Actualiza las películas en memoria
    guardarPeliculas(peliculas);
    new MemoriasAlquiladas().agregarMemoria(pelicula);
};
// Obtiene las películas filtradas por género, si el género es "Todos", devuelve todas las películas
const obtenerPeliculasPorGenero = (genero) => {
    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];
    if (genero === "Todos") return peliculas;
    return peliculas.filter(p => p.genero.toLowerCase().includes(genero.toLowerCase()));

};
// // Obtiene las películas alquiladas, si no hay películas alquiladas, devuelve un array vacío
const obtenerPeliculasAlquiladas = () => {
    return new MemoriasAlquiladas().obtenerMemorias() || [];
};
// // Exporta las funciones del servicio de catálogo
export {
    cargarPeliculas,
    guardarPeliculas,
    alquilarPelicula,
    obtenerPeliculasPorGenero,
    obtenerPeliculasAlquiladas
};
