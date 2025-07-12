// controllers/catalogo.controller.js
import { Memoria } from "../models/memoria.js";
import {
    cargarPeliculas,
    alquilarPelicula,
    obtenerPeliculasPorGenero,
    obtenerPeliculasAlquiladas
} from "../services/catalogo.service.js";

const memoria = new Memoria();
let peliculas = memoria.leer("peliculas");

if (!peliculas || peliculas.length === 0) {
  peliculas = cargarPeliculas(); // ← tus películas predefinidas
  memoria.escribir("peliculas", peliculas);
}

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
            const nombreCliente = prompt("Por favor, ingresá tu nombre para alquilar la película:");
            if (!nombreCliente || nombreCliente.trim() === "") {
                alert("Debés ingresar un nombre válido.");
                return;
            }

            alquilarPelicula(pelicula, nombreCliente);
            boton.textContent = "Alquilada";
            boton.disabled = true;
            alert(`Película "${pelicula.titulo}" alquilada por ${pelicula.nombreCliente}`);
        });
    });
};

// const filtrarPorGeneroDOM = (genero) => {
//     const peliculas = obtenerPeliculasPorGenero(genero);
//     imprimirPeliculas(peliculas);
// };

const mostrarPeliculasAlquiladasDOM = () => {
    const seccion = document.getElementById("misPeliculas");
    const contenedor = document.getElementById("peliculasAlquiladas");
    const totalPagar = document.getElementById("totalPagar");

    const alquiladas = obtenerPeliculasAlquiladas();

    if (!alquiladas.length) {
        contenedor.innerHTML = "<p style='color:white;'>No has alquilado ninguna película aún.</p>";
        totalPagar.textContent = "";
    } else {
        contenedor.innerHTML = "";
        let total = 0;

        alquiladas.forEach(pelicula => {
            total += pelicula.precio;
            contenedor.innerHTML += `
            <div>
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <p style="color:white;"><strong>${pelicula.titulo}</strong></p>
            <p style="color:white;">Precio: $${pelicula.precio}</p>
            <p>Alquilada por: ${pelicula.nombreCliente || "Desconocido"}</p>
            </div>
            `;
        });

        totalPagar.textContent = `Total a pagar: $${total}`;
    }

    seccion.style.display = "block";
    window.scroll({ top: seccion.offsetTop, behavior: "smooth" });
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

    const generos = obtenerGenerosUnicos(); // ← esto se actualiza dinámicamente

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
        mostrarPeliculasAlquiladasDOM();
    });

    const peliculas = cargarPeliculas();
    imprimirPeliculas(peliculas);
    console.log(peliculas)



    
};




const peliculasBuscador = () => {
    const formBusqueda = document.getElementById("form-busqueda");
    const inputBuscador = document.getElementById("buscador");
    const memoria = new Memoria();

    formBusqueda.addEventListener('submit', (event) => {
        event.preventDefault();

        const texto = inputBuscador.value.toLowerCase();
        const peliculasGuardadas = memoria.leer("peliculas") || [];

        peliculasGuardadas.forEach(p => console.log("Título:", p.titulo));
        const filtradas = peliculasGuardadas.filter(pelicula =>
            pelicula.titulo.toLowerCase().includes(texto)
        );

        if (filtradas.length === 0) {
            const tarjetasPeliculas = document.getElementById("tarjetasPeliculas");
            tarjetasPeliculas.innerHTML = `<div class = "not" <p >No se encontraron películas.</p></div>`;
            document.getElementById("buscador").value = "";
        } else {
            imprimirPeliculas(filtradas);
            document.getElementById("buscador").value = ""
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const memoria = new Memoria();
    const peliculasGuardadas = memoria.leer("peliculas") || [];

    imprimirPeliculas(peliculasGuardadas); // Mostrar todas al inicio
    peliculasBuscador(); // Activar buscador
});


export { iniciarCatalogo };
