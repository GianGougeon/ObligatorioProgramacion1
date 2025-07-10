import { Memoria } from "../models/memoria.js";
import { data } from "../data/data.js";

let peliculasArray = [...data];

const getPeliculas = () => peliculasArray;
console.log("Películas cargadas desde el servicio:", peliculasArray);


const guardarPeliculas = () => {
    new Memoria().escribir("peliculas", peliculasArray);
};

const leerPeliculas = () => {
    const guardadas = new Memoria().leer("peliculas");
    peliculasArray = guardadas || [...data];
};

const agregarPelicula = (nuevaPelicula) => {
    peliculasArray.push(nuevaPelicula);
    guardarPeliculas();
};

const modificarPeliculaPorId = (id, campos) => {
    const pelicula = peliculasArray.find(p => p.id === id);
    if (!pelicula) return false;

    Object.keys(campos).forEach(key => {
        if (campos[key] !== undefined && campos[key] !== "") {
            pelicula[key] = (key === "anio") ? parseInt(campos[key]) :
                (key === "precio") ? parseFloat(campos[key]) :
                    campos[key];
        }
    });

    guardarPeliculas();
    return true;
};

const eliminarPelicula = (id) => {
    const originalLength = peliculasArray.length;
    peliculasArray = peliculasArray.filter(p => p.id !== id);
    guardarPeliculas();
    return peliculasArray.length < originalLength;
};

const reiniciarPeliculas = () => {
    peliculasArray.forEach(p => {
        p.alquilada = false;
        delete p.nombreCliente;
    });
    guardarPeliculas();
    localStorage.removeItem("peliculasAlquiladas");
};

const generarId = () => Math.floor(Math.random() * 10000);

const obtenerEstadisticas = () => {
    const alquiladas = peliculasArray.filter(p => p.alquilada);
    const total = alquiladas.reduce((acc, p) => acc + p.precio, 0);
    const max = Math.max(...peliculasArray.map(p => p.VecesAlquilada));
    const populares = peliculasArray.filter(p => p.VecesAlquilada === max && max > 0);
    return { alquiladas, total, populares };
};

export {
    getPeliculas,
    agregarPelicula,
    modificarPeliculaPorId,
    eliminarPelicula,
    reiniciarPeliculas,
    leerPeliculas,
    generarId,
    obtenerEstadisticas
};
