import {
    getPeliculas,
    agregarPelicula,
    modificarPeliculaPorId,
    eliminarPelicula,
    reiniciarPeliculas,
    leerPeliculas,
    generarId,
    obtenerEstadisticas
} from "../services/peliculas.service.js";

import { peliculas } from "../models/peliculas.js";

const agregarPeliculaDOM = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = generarId();
    const titulo = form["titulo"].value;
    const genero = form["genero"].value;
    const director = form["director"].value;
    const pais = form["pais"].value;
    const anio = parseInt(form["anio"].value);
    const clasificacion = form["clasificacion"].value;
    const precio = parseFloat(form["precio"].value);
    const imagenInput = form["imagen"];

    if (!titulo || !genero || !director || !pais || isNaN(anio) || !clasificacion || isNaN(precio)) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const leerImagenComoDataURL = new Promise((resolve, reject) => {
        if (imagenInput.files.length > 0) {
            const file = imagenInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject("");
            reader.readAsDataURL(file);
        } else {
            resolve("");
        }
    });

    leerImagenComoDataURL.then((imagenUrl) => {
        const nueva = new peliculas(id, titulo, genero, director, pais, anio, clasificacion, false, 0, precio, imagenUrl);
        agregarPelicula(nueva);
        listarPeliculasDOM();
        form.reset();
    }).catch((imgError) => {
        const nueva = new peliculas(id, titulo, genero, director, pais, anio, clasificacion, false, 0, precio, imgError);
        agregarPelicula(nueva);
        listarPeliculasDOM();
        form.reset();
        alert("Error al cargar la imagen. Se usará imagen por defecto.");
    });
};

const listarPeliculasDOM = () => {
    const lista = document.getElementById("listaPeliculas");
    lista.innerHTML = "";

    const peliculas = getPeliculas();

    const table = document.createElement("table");
    table.border = "1";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["ID", "Título", "Género", "Director", "País", "Año", "Clasificación", "Alquilada", "Nombre del cliente", "Veces Alquilada", "Precio", "Imagen"]
        .forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });

    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");

    peliculas.forEach(p => {
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

const mostrarEstadisticasDOM = () => {
    const cont = document.getElementById("estadisticasPeliculas");
    if (!cont) return;

    const { alquiladas, total, populares } = obtenerEstadisticas();

    cont.innerHTML = `
        <p><strong>Alquiladas:</strong> ${alquiladas.length}</p>
        <p><strong>Total recaudado:</strong> $${total}</p>
        <p><strong>Más alquiladas:</strong></p>
        <table border="1">
            <tr><th>Cantidad</th><th>Nombre</th></tr>
            ${populares.length
            ? populares.map(p => `<tr><td>${p.VecesAlquilada}</td><td>${p.titulo}</td></tr>`).join("")
            : `<tr><td colspan="2">Ninguna</td></tr>`
        }
        </table>
    `;
};

const modificarPeliculaDOM = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = parseInt(form["modificar-id"].value);

    const actualizado = modificarPeliculaPorId(id, {
        titulo: form["modificar-titulo"].value,
        genero: form["modificar-genero"].value,
        director: form["modificar-director"].value,
        pais: form["modificar-pais"].value,
        anio: form["modificar-anio"].value,
        clasificacion: form["modificar-clasificacion"].value,
        precio: form["modificar-precio"].value,
    });

    if (!actualizado) return alert("ID no encontrado.");
    listarPeliculasDOM();
    mostrarEstadisticasDOM();
    form.reset();
    alert("Película modificada.");
};

const eliminarPeliculaDOM = () => {
    const id = parseInt(document.querySelector("#modificar-id").value);
    if (isNaN(id)) return alert("ID inválido.");

    if (!confirm("¿Eliminar esta película?")) return;
    if (eliminarPelicula(id)) {
        listarPeliculasDOM();
        mostrarEstadisticasDOM();
        document.querySelector("#modificar-form").reset();
        alert("Película eliminada.");
    } else {
        alert("Película no encontrada.");
    }
};

const reiniciarMemoriaDOM = () => {
    reiniciarPeliculas();
    listarPeliculasDOM();
    mostrarEstadisticasDOM();
    alert("Se han reiniciado los alquileres.");
};

const cargarPeliculasDOM = () => {
    leerPeliculas();
    listarPeliculasDOM();
    mostrarEstadisticasDOM();
};

export {
    agregarPeliculaDOM,
    listarPeliculasDOM,
    mostrarEstadisticasDOM,
    modificarPeliculaDOM,
    eliminarPeliculaDOM,
    reiniciarMemoriaDOM,
    cargarPeliculasDOM
};
