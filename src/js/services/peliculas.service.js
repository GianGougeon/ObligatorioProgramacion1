import { Memoria } from "../models/memoria.js";
import { data } from "../data/data.js";
import { obtenerPeliculasAlquiladas } from "../services/catalogo.service.js";
// Carga las películas desde data.js y las guarda en memoria
let peliculasArray = [...data];
// Si no hay películas guardadas, las inicializa con las de data.js
const getPeliculas = () => peliculasArray;
// Guarda las películas en memoria, se usa al alquilar una película o al modificar una película
const guardarPeliculas = () => {
    new Memoria().escribir("peliculas", peliculasArray);
};
//  Lee las películas desde memoria, si no hay, las inicializa con las de data.js 
const leerPeliculas = () => {
    const guardadas = new Memoria().leer("peliculas");
    peliculasArray = guardadas || [...data];
};
// Alquila una película, actualiza su estado y guarda los cambios en memoria
const agregarPelicula = (nuevaPelicula) => {
    peliculasArray.push(nuevaPelicula);
    guardarPeliculas();
};
// Modifica una película por su ID, actualizando los campos especificados
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

// Elimina una película por su ID, actualizando el array y guardando los cambios
const eliminarPelicula = (id) => {
    const originalLength = peliculasArray.length;
    peliculasArray = peliculasArray.filter(p => p.id !== id);
    guardarPeliculas();
    return peliculasArray.length < originalLength;
};
// Reinicia el estado de las películas, marcándolas como no alquiladas y eliminando el nombre del cliente
const reiniciarPeliculas = () => {
    peliculasArray.forEach(p => {
        p.alquilada = false;
        delete p.nombreCliente;
    });
    // Elimina las veces alquiladas
    guardarPeliculas();
    localStorage.removeItem("peliculasAlquiladas");
};
// Genera un ID aleatorio para una nueva película
const generarId = () => Math.floor(Math.random() * 10000);
// Obtiene estadísticas de las películas alquiladas, incluyendo total, cliente, populares e ingresos
const obtenerEstadisticas = () => {
    const alquiladas = peliculasArray.filter(p => p.alquilada);
    // nombre de cliente
    const cliente = [...new Set(alquiladas.map(p => p.nombreCliente))];
    // Total de películas alquiladas
    const total = obtenerPeliculasAlquiladas()
    // Películas más populares (más veces alquiladas)
    const populares = [...alquiladas].sort((a, b) => (b.VecesAlquilada || 0) - (a.VecesAlquilada || 0)).slice(0, 5);
    // Suma total de ingresos
    const ingresos = alquiladas.reduce((sum, p) => sum + (p.precio || 0), 0);
    return { total, populares, ingresos, cliente };
};
// Exporta las funciones del servicio de películas
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
