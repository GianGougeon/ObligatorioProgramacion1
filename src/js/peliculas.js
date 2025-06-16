// cargar peliculas desde localstorage con fetch
import { Memoria } from "./models/memoria.js";
import { data } from "./data/data.js";
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
                <p>Titulo: ${pelicula.titulo}</p>
                    <p>Genero: ${pelicula.genero}</p>
                    <p>Clasificacion: ${pelicula.clasificacion}</p>
                    <p>Precio: $${pelicula.precio}</p>
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
            // Solicitar el nombre del cliente.
            const nombreCliente = prompt("Por favor, ingresá tu nombre para alquilar la película:");
            if (!nombreCliente || nombreCliente.trim() === "") {
                alert("Debés ingresar un nombre válido para alquilar la película.");
                return;
            }

            // Asignamos el nombre del cliente a la película.
            pelicula.nombreCliente = nombreCliente.trim();

            // Marcar la película como alquilada y aumentar su contador (por si querés conocer cuántas veces se alquiló).
            pelicula.alquilada = true;
            pelicula.VecesAlquilada = (pelicula.VecesAlquilada || 0) + 1;

            // Guardar en almacenamiento la lista actualizada de películas.
            const memoria = new Memoria();
            memoria.escribir("peliculas", peliculas);

            // Guardar la película en la lista de alquiladas.
            memoriasAlquiladas.agregarMemoria(pelicula);

            // Actualizar el botón para que se muestre "Alquilada" y no se pueda volver a presionar.
            boton.textContent = "Alquilada";
            boton.disabled = true;

            alert(`Película "${pelicula.titulo}" alquilada exitosamente por ${pelicula.nombreCliente}!`);
            console.log(`Película alquilada: ${pelicula.titulo}, por: ${pelicula.nombreCliente}`);
        });
    });
};

const filtrarPorGenero = (genero) => {
    const memoria = new Memoria();
    const peliculas = memoria.leer("peliculas") || [];

    let filtradas = [];

    if (genero === "Todos") {
        filtradas = peliculas;
    } else {
        filtradas = peliculas.filter(p => p.genero.toLowerCase().includes(genero.toLowerCase()));
    }

    imprimirPeliculas(filtradas);
};

document.getElementById("filtro-genero").addEventListener("change", (event) => {
    const generoSeleccionado = event.target.value;
    filtrarPorGenero(generoSeleccionado);
});

const tusPeliculasAlquiladas = () => {
    const botonTusPeliculas = document.querySelector(".btn");
    const seccionMisPeliculas = document.getElementById("misPeliculas");
    const contenedorAlquiladas = document.getElementById("peliculasAlquiladas");
    const totalPagar = document.getElementById("totalPagar");

    botonTusPeliculas.addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del <a>

        const memoria = new MemoriasAlquiladas();
        const alquiladas = memoria.obtenerMemorias();

        console.log("Películas alquiladas:", alquiladas);


        contenedorAlquiladas.innerHTML = "";
        let total = 0;

        if (!alquiladas || alquiladas.length === 0) {
            contenedorAlquiladas.innerHTML = "<p style='color:white;'>No has alquilado ninguna película aún.</p>";
            totalPagar.textContent = "";
        } else {
            alquiladas.forEach(pelicula => {
                console.log(pelicula, "película procesada para alquiladas");
                total += pelicula.precio;

                contenedorAlquiladas.innerHTML += `
        <div>
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <p style="color:white;"><strong>${pelicula.titulo}</strong></p>
            <p style="color:white;">Precio: $${pelicula.precio}</p>
            <p>Alquilada por: ${pelicula.nombreCliente ? pelicula.nombreCliente : "Desconocido"}</p>
        </div>
    `;
            }); 

            totalPagar.textContent = `Total a pagar: $${total}`;
        }

        // Mostrar la sección y hacer scroll
        seccionMisPeliculas.style.display = "block";
        window.scroll({ top: seccionMisPeliculas.offsetTop, behavior: "smooth" });
    });
};

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    cargarPeliculas().then(peliculas => {
        console.log("Películas cargadas desde memoria:", peliculas);
        imprimirPeliculas(peliculas);
        tusPeliculasAlquiladas();
    }).catch(error => {
        console.error("Error al cargar las películas:", error);
    });
});