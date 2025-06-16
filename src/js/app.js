// Módulos: clases y datos necesarios
import { peliculas } from "./models/peliculas.js";
import { Memoria } from "./models/memoria.js";
import { data } from "./data/data.js";

// Lista principal de películas
let peliculasArray = [...data];

// Al cargar la página
const inicio = () => {
    document.getElementById("pelicula-form").addEventListener("submit", agregarPelicula);
    document.getElementById("modificar-form").addEventListener("submit", modificarPelicula);
};

// Agrega una nueva película
const agregarPelicula = (event) => {
    // Evito la recarga de la página.
    event.preventDefault();

    // Genero un ID único.
    const generarId = () => {
        return Math.floor(Math.random() * 10000);
    }

    // Obtengo los datos del formulario.
    const form = event.target;
    const id = generarId();
    const titulo = form.querySelector("#titulo").value;
    const genero = form.querySelector("#genero").value;
    const director = form.querySelector("#director").value;
    const pais = form.querySelector("#pais").value;
    const anio = parseInt(form.querySelector("#anio").value);
    const clasificacion = form.querySelector("#clasificacion").value;
    const alquilada = false;
    const precio = parseFloat(form.querySelector("#precio").value);
    const imagenInput = form.querySelector("#imagen");
    const VecesAlquilada = 0;

    // Valido que los campos importantes estén llenos.
    if (!titulo || !genero || !director || !pais || isNaN(anio) || !clasificacion || isNaN(precio)) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Promesa para leer la imagen subida a Data URL.
    const leerImagenComoDataURL = new Promise((resolve, reject) => {
        if (imagenInput.files.length > 0) {
            const file = imagenInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => {
                console.error("Error al leer la imagen:", error);
                reject(""); // Si falla, retorno vacío.
            };
            reader.readAsDataURL(file);
        } else {
            resolve(""); // Si no hay imagen, retorno vacío.
        }
    });

    // Cuando la imagen se procesa...
    leerImagenComoDataURL.then((imagenDataUrl) => {
        // Creo la nueva película con los datos y la URL de la imagen.
        const nuevaPelicula = new peliculas(
            id, titulo, genero, director, pais, anio, clasificacion,
            alquilada, VecesAlquilada, precio, imagenDataUrl
        );

        // La añado a mi lista y la guardo.
        peliculasArray.push(nuevaPelicula);
        const LaMemoria = new Memoria();
        LaMemoria.escribir("peliculas", peliculasArray);

        // Actualizo la interfaz y limpio el formulario.
        listarPeliculas();
        form.reset();
    }).catch(errorUrl => {
        // Si la imagen falla, creo la película igual pero sin imagen.
        const nuevaPelicula = new peliculas(
            id, titulo, genero, director, pais, anio, clasificacion,
            alquilada, VecesAlquilada, precio, errorUrl
        );

        // La añado, la guardo y actualizo.
        peliculasArray.push(nuevaPelicula);
        const LaMemoria = new Memoria();
        LaMemoria.escribir("peliculas", peliculasArray);

        listarPeliculas();
        form.reset();
        alert("Error al cargar la imagen, se usará una imagen por defecto.");
    });
};

// Lista las películas en tabla
const listarPeliculas = () => {
    const lista = document.getElementById("listaPeliculas");
    lista.innerHTML = "";

    const table = document.createElement("table");
    table.border = "1";
    const thead = document.createElement("thead");
    const headers = [
        "ID", "Título", "Género", "Director", "País", "Año",
        "Clasificación", "Alquilada", "Nombre del cliente", "Veces Alquilada", "Precio", "Imagen"
    ];

    const headerRow = document.createElement("tr");
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    peliculasArray.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.titulo}</td>
            <td>${p.genero}</td>
            <td>${p.director}</td>
            <td>${p.pais}</td>
            <td>${p.anio}</td>
            <td>${p.clasificacion}</td>
            <td>${p.alquilada ? "Sí" : "No"}</td>
            <td>${p.alquilada ? p.nombreCliente || "-" : "-"}</td>
            <td>${p.VecesAlquilada}</td>
            <td>$${p.precio}</td>
            <td><img src="${p.imagen}" width="50" /></td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    lista.appendChild(table);
};

// Muestra estadísticas básicas
const mostrarEstadisticas = () => {
    const cont = document.getElementById("estadisticasPeliculas");
    if (!cont) return;

    const alquiladas = peliculasArray.filter(p => p.alquilada);
    const total = alquiladas.reduce((acc, p) => acc + p.precio, 0);
    const max = Math.max(...peliculasArray.map(p => p.VecesAlquilada));
    const populares = peliculasArray.filter(p => p.VecesAlquilada === max && max > 0);

    cont.innerHTML = `
        <p><strong>Alquiladas:</strong> ${alquiladas.length}</p>
        <p><strong>Total recaudado:</strong> $${total}</p>
        <p><strong>Más alquiladas:</strong></p>
        <table border="1">
            <tr>
                <th>Cantidad</th>
                <th>Nombre</th>
            </tr>
            ${
                populares.length
                    ? populares.map(p => `<tr><td>${p.VecesAlquilada}</td><td class>${p.titulo}</td></tr>`).join("")
                    : `<tr><td colspan="2">Ninguna</td></tr>`
            }
        </table>
    `;
};

// Modifica una película por ID
const modificarPelicula = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = parseInt(form["modificar-id"].value);
    const pelicula = peliculasArray.find(p => p.id === id);
    if (!pelicula) return alert("ID no encontrado.");

    ["titulo", "genero", "director", "pais", "anio", "clasificacion", "precio"].forEach(campo => {
        const valor = form[`modificar-${campo}`].value;
        if (valor) pelicula[campo] = campo === "anio" ? parseInt(valor) : campo === "precio" ? parseFloat(valor) : valor;
    });

    new Memoria().escribir("peliculas", peliculasArray);
    listarPeliculas();
    mostrarEstadisticas();
    form.reset();
    alert("Película modificada.");
};

// Elimina película por ID
const eliminarPeliculaDesdeFormulario = () => {
    const input = document.querySelector("#modificar-id");
    const id = parseInt(input.value);
    if (!id || isNaN(id)) return alert("ID inválido.");

    const pelicula = peliculasArray.find(p => p.id === id);
    if (!pelicula) return alert("No existe película con ese ID.");

    if (confirm(`¿Eliminar "${pelicula.titulo}"?`)) {
        peliculasArray = peliculasArray.filter(p => p.id !== id);
        new Memoria().escribir("peliculas", peliculasArray);
        listarPeliculas();
        mostrarEstadisticas();
        document.querySelector("#modificar-form").reset();
        alert("Eliminada correctamente.");
    }
};

// Carga datos guardados o iniciales
const cargarPeliculas = () => {
    const guardadas = new Memoria().leer("peliculas");
    peliculasArray = guardadas || [...data];
    listarPeliculas();
    mostrarEstadisticas();
};
// Reinicia la memoria eliminando películas alquiladas
const reiniciarMemoria = () => {
    // Marca todas las películas como NO alquiladas, pero conserva VecesAlquilada
    peliculasArray.forEach(p => {
        p.alquilada = false;
        delete p.nombreCliente; // Opcional: limpia el nombre del cliente si existe
    });
    new Memoria().escribir("peliculas", peliculasArray);
    listarPeliculas();
    mostrarEstadisticas();
    alert("Se han reiniciado los estados de alquiler de todas las películas.");
};

// Verifica si hay usuario logueado
const checkUser = () => {
    const usuario = new Memoria().leer("usuario");
    if (!usuario) window.location.href = "./sesion.html";
};

// Al cargar todo
document.addEventListener("DOMContentLoaded", () => {
    inicio();
    cargarPeliculas();
    checkUser();
});

document.querySelector("#reiniciar-memoria").addEventListener("click", reiniciarMemoria);
document.querySelector("#eliminar-pelicula").addEventListener("click", eliminarPeliculaDesdeFormulario);
