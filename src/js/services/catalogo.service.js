// services/catalogo.service.js
import { Memoria } from "../models/memoria.js";
import { data } from "../data/data.js";
import { MemoriasAlquiladas } from "../models/memoriasAlquiladas.js";

let peliculasGuardadas = [...data];

const cargarPeliculas = () => {
    const memoria = new Memoria();
    const peliculasMemoria = memoria.leer("peliculas");
    if (peliculasMemoria) {
        return peliculasMemoria;
    } else {
        memoria.escribir("peliculas", peliculasGuardadas);
        return peliculasGuardadas;
    }
};

const guardarPeliculas = (peliculas) => {
    const memoria = new Memoria();
    memoria.escribir("peliculas", peliculas);
};

const alquilarPelicula = (pelicula, nombreCliente) => {
    pelicula.nombreCliente = nombreCliente.trim();
    pelicula.alquilada = true;
    pelicula.VecesAlquilada = (pelicula.VecesAlquilada || 0) + 1;

    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];
    const index = peliculas.findIndex(p => p.id === pelicula.id);
    if (index !== -1) peliculas[index] = pelicula;

    guardarPeliculas(peliculas);
    new MemoriasAlquiladas().agregarMemoria(pelicula);
};

const obtenerPeliculasPorGenero = (genero) => {
    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];
    if (genero === "Todos") return peliculas;
    return peliculas.filter(p => p.genero.toLowerCase().includes(genero.toLowerCase()));
};

const obtenerPeliculasAlquiladas = () => {
    return new MemoriasAlquiladas().obtenerMemorias() || [];
};

export {
    cargarPeliculas,
    guardarPeliculas,
    alquilarPelicula,
    obtenerPeliculasPorGenero,
    obtenerPeliculasAlquiladas
};
