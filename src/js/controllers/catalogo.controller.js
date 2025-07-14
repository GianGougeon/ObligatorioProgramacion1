// controllers/catalogo.controller.js
import { Memoria } from "../models/memoria.js";
import { UsuarioMemoria } from "../models/usuario.js";
import {
    cargarPeliculas,
    alquilarPelicula,
    obtenerPeliculasPorGenero,
} from "../services/catalogo.service.js";


// Devuelve el nombre del cliente almacenado en memoria
const cargarNombreCliente = () => {
    const usuarioMemoria = new UsuarioMemoria();
    const usuario = usuarioMemoria.leerUsuario("usuario");
    if (usuario && usuario.nombre) {
        return usuario.nombre;
    }
}
// Fecha actual en formato dd/mm/yyyy
const obtenerFechaActual = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const año = hoy.getFullYear();
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    // retorna un objeto que diga fecha y el otro hora
    let fecha = `${dia}/${mes}/${año}`;
    let hora = `${horas}:${minutos}`;
    return { fecha, hora };
};

const imprimirPeliculas = (peliculas) => {
    const tarjetasPeliculas = document.getElementById("tarjetasPeliculas");
    if (!tarjetasPeliculas) return;
    tarjetasPeliculas.innerHTML = "";
    peliculas.forEach(pelicula => {
        tarjetasPeliculas.innerHTML += `
            <div class="card">
                <img src="${pelicula.imagen}" alt="${pelicula.titulo}" />
                <div class="card-body">
                    <p>Titulo: ${pelicula.titulo}</p>
                    <p>Genero: ${pelicula.genero}</p>
                    <p>Clasificacion: ${pelicula.clasificacion}</p>
                    <p>Precio: $${pelicula.precio}</p>
                    <button class="btn" data-id="${pelicula.id}">${pelicula.alquilada ? "Alquilada" : "Alquilar"}</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".btn").forEach(boton => {
        const id = parseInt(boton.getAttribute("data-id"));
        const pelicula = peliculas.find(p => p.id === id);
        if (!pelicula) return;
        if (pelicula.alquilada) {
            boton.disabled = true;
        }
        boton.addEventListener("click", () => {
            // Agrega la fecha de alquiler
            pelicula.fechaAlquiler = obtenerFechaActual();
            // Ejecuta el alquiler
            alquilarPelicula(pelicula, cargarNombreCliente());
            // Feedback visual
            boton.textContent = "Alquilada";
            boton.disabled = true;
        });
    });
};


const obtenerGenerosUnicos = () => {
    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];

    // Obtener todos los géneros sin repetir
    const generosSet = new Set();
    peliculas.forEach(p => {
        if (p.genero) {
            p.genero.split(",").forEach(g => {
                generosSet.add(g.trim());
            });
        }
    });

    // Convertir a array y agregar "Todos" al principio
    return ["Todos", ...Array.from(generosSet)];
};

const iniciarCatalogo = () => {
    const contenedorBotones = document.getElementById("botones-genero");
    // Limpiar botones por si se actualiza más adelante
    contenedorBotones.innerHTML = "";
    const generos = obtenerGenerosUnicos(); // esto se actualiza dinámicamente
    generos.forEach(genero => {
        const boton = document.createElement("button");
        boton.textContent = genero;
        boton.className = "btn";
        boton.addEventListener("click", () => {
            document.querySelectorAll("#botones-genero button").forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");
            const peliculasFiltradas = obtenerPeliculasPorGenero(genero);
            imprimirPeliculas(peliculasFiltradas);
        });
        contenedorBotones.appendChild(boton);
    });
    const botonTusPeliculas = document.querySelector(".btn-tus-peliculas");
    botonTusPeliculas?.addEventListener("click", (e) => {
        e.preventDefault();
    });
    const peliculas = cargarPeliculas();
    imprimirPeliculas(peliculas);
};



export { iniciarCatalogo };
