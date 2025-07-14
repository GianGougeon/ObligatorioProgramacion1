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

const botonReiniciarAlquilerPelicula = (id) => {
    const peliculas = getPeliculas();
    const pelicula = peliculas.find(p => p.id === id);
    if (!pelicula) return;
    pelicula.alquilada = false;
    pelicula.nombreCliente = "";
    pelicula.fechaAlquiler = "";
    agregarPelicula(pelicula); // Actualiza la película en el almacenamiento
    listarPeliculasDOM(); // Actualiza la lista en el DOM
    mostrarEstadisticasDOM(); // Actualiza las estadísticas
    alert("Alquiler reiniciado correctamente.");
};
// Función para listar las películas en el DOM
const listarPeliculasDOM = () => {
    const lista = document.getElementById("listaPeliculas");
    lista.innerHTML = "";
    const peliculas = getPeliculas();
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    [
        "ID", "Título", "Género", "Director", "País", "Año", "Clasificación",
        "Alquilada", "Nombre del cliente", "Fecha", "Veces Alquilada",
        "Precio", "Imagen", "Reiniciar alquiler"
    ].forEach(text => {
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
            <td>${p.alquilada ? p.nombreCliente || "" : ""}</td>
            <td>${p.alquilada ? `<span>${p.fechaAlquiler.fecha}</span><hr><span>${p.fechaAlquiler.hora}</span>` : ""}</td>
            <td>${p.VecesAlquilada}</td>
            <td>$${p.precio}</td>
            <td><img src="${p.imagen}" width="50" /></td>
            <td class="reiniciar-col"></td>
        `;

        // Solo si está alquilada agregamos el botón
        if (p.alquilada) {
            const btn = document.createElement("button");
            btn.className = "btn";
            btn.textContent = "Reinicio";
            btn.id = p.id;

            btn.addEventListener("click", (event) => {
                event.preventDefault();
                const id = parseInt(event.target.id);
                botonReiniciarAlquilerPelicula(id);
            });

            row.querySelector(".reiniciar-col").appendChild(btn);
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    lista.appendChild(table);
};

//
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

const mostrarEstadisticasDOM = (fechaSeleccionada = null) => {
    const cont = document.getElementById("estadisticasPeliculas");
    if (!cont) return;

    const { total } = obtenerEstadisticas();

    // 1. Agrupar fechas únicas (solo parte de la fecha, sin hora)
    const fechasUnicas = [...new Set(total
        .map(p => p.fechaAlquiler?.fecha?.split("T")[0])
        .filter(f => f)
    )].sort((a, b) => new Date(b) - new Date(a)); // orden descendente

    // 2. Filtrar por fecha si hay una seleccionada
    const filtrado = fechaSeleccionada
        ? total.filter(p => p.fechaAlquiler?.fecha?.startsWith(fechaSeleccionada))
        : total;

    // 3. Agrupar por cliente
    const agrupadoPorCliente = {};
    filtrado.forEach(p => {
        if (p.nombreCliente === "admin") return;
        if (!agrupadoPorCliente[p.nombreCliente]) {
            agrupadoPorCliente[p.nombreCliente] = [];
        }
        agrupadoPorCliente[p.nombreCliente].push(p);
    });
    const clientes = Object.entries(agrupadoPorCliente);

    // 4. HTML
    cont.innerHTML = `
        <div class="estadisticas">
            <h2 class="estadisticas__titulo">Resumen de Alquileres por Cliente</h2>

            <div class="filtros-fechas">
                <button data-fecha="">Todos los días</button>
                ${fechasUnicas.map(fecha => `
                    <button data-fecha="${fecha}">${fecha}</button>
                `).join("")}
            </div>

            <div class="estadisticas__resumen resumen-grid">
                <div class="resumen-item">
                    <strong>Total de alquileres</strong>
                    <span>${filtrado.length}</span>
                </div>
                <div class="resumen-item">
                    <strong>Total recaudado</strong>
                    <span>$${filtrado.reduce((sum, peli) => sum + (peli.precio || 0), 0)}</span>
                </div>
                <div class="resumen-item">
                    <strong>Total de clientes únicos</strong>
                    <span>${clientes.length}</span>
                </div>
            </div>

            <div class="clientes-grid">
                ${clientes.map(([nombre, pelis]) => {
        const totalGastado = pelis.reduce((sum, p) => sum + (p.precio || 0), 0);
        return `
                    <div class="cliente-card">
                        <h3>Usuario: ${nombre}</h3>
                        <p><strong>Total gastado:</strong> $${totalGastado}</p>
                        <table>
                            <thead>
                                <tr><th>Título</th><th>Precio</th><th>Fecha</th></tr>
                            </thead>
                            <tbody>
                                ${pelis.map(p => `
                                    <tr>
                                        <td>${p.titulo}</td>
                                        <td>$${p.precio}</td>
                                        <td>${p.fechaAlquiler?.fecha || "—"}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                `;
    }).join("")}
            </div>
        </div>
    `;

    // 5. Agregar listeners a los botones
    const botones = cont.querySelectorAll(".filtros-fechas button");
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const fecha = btn.getAttribute("data-fecha");
            mostrarEstadisticasDOM(fecha || null);
        });
    });
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
