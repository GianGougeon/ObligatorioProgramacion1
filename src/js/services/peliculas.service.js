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
    // Buscar la película por su ID
    const peliculaEncontrada = peliculasArray.find(pelicula => pelicula.id === id);
    if (!peliculaEncontrada) {
        return false; // No se encontró la película
    }

    // Recorrer cada campo a modificar
    for (const campo in campos) {
        const valor = campos[campo];

        // Ignorar valores vacíos o indefinidos
        if (valor === undefined || valor === "") continue;

        // Asignar valor con tipo correcto según el campo
        switch (campo) {
            case "anio":
                peliculaEncontrada[campo] = parseInt(valor);
                break;
            case "precio":
                peliculaEncontrada[campo] = parseFloat(valor);
                break;
            default:
                peliculaEncontrada[campo] = valor;
                break;
        }
    }

    // Guardar cambios
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
