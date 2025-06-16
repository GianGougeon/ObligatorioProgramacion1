// Módulos: clases y datos necesarios
import { peliculas } from "./models/peliculas.js";
import { Memoria } from "./models/memoria.js";
import { data } from "./data.js";

// Lista principal de películas
let peliculasArray = [...data];

// Al cargar la página
const inicio = () => {
    document.getElementById("pelicula-form").addEventListener("submit", agregarPelicula);
    document.getElementById("modificar-form").addEventListener("submit", modificarPelicula);
};

// Agrega una nueva película
const agregarPelicula = (event) => {
    event.preventDefault();
    const form = event.target;

    const generarId = () => Math.floor(Math.random() * 10000);
    const id = generarId();

    const nueva = {
        titulo: form.titulo.value,
        genero: form.genero.value,
        director: form.director.value,
        pais: form.pais.value,
        anio: parseInt(form.anio.value),
        clasificacion: form.clasificacion.value,
        precio: parseFloat(form.precio.value),
        imagen: "",
        id,
        alquilada: false,
        VecesAlquilada: 0
    };

    if (Object.values(nueva).some(v => v === "" || v === undefined || Number.isNaN(v))) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    const imagenInput = form.imagen;
    const reader = new FileReader();

    const cargarImagen = new Promise((resolve, reject) => {
        if (imagenInput.files.length > 0) {
            reader.onload = e => resolve(e.target.result);
            reader.onerror = () => reject("");
            reader.readAsDataURL(imagenInput.files[0]);
        } else {
            resolve("");
        }
    });

    cargarImagen.then((imagen) => {
        nueva.imagen = imagen;
        const nuevaPelicula = new peliculas({ ...nueva });
        peliculasArray.push(nuevaPelicula);

        new Memoria().escribir("peliculas", peliculasArray);
        listarPeliculas();
        form.reset();
        mostrarEstadisticas();
    }).catch(() => {
        alert("Error al cargar imagen. Se usará una por defecto.");
        nueva.imagen = "";
        const nuevaPelicula = new peliculas({ ...nueva });
        peliculasArray.push(nuevaPelicula);
        new Memoria().escribir("peliculas", peliculasArray);
        listarPeliculas();
        form.reset();
        mostrarEstadisticas();
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
        <ul>${populares.length ? populares.map(p => `<li>${p.titulo} (${p.VecesAlquilada})</li>`).join("") : "<li>Ninguna</li>"}</ul>
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

document.querySelector("#eliminar-pelicula").addEventListener("click", eliminarPeliculaDesdeFormulario);