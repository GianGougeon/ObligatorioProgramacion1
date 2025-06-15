// Módulos: 'peliculas' es la plantilla, 'Memoria' es para guardar, 'data' son los datos iniciales.
import { peliculas } from "./models/peliculas.js";
import { Memoria } from "./models/memoria.js";
import { data } from "./data.js";

// Mi lista de películas actual. La inicio con una copia de 'data'.
let peliculasArray = [...data];

// Configura lo que pasa al cargar la página.
const inicio = () => {
    // Al enviar el formulario de película, llamo a 'agregarPelicula'.
    document.getElementById("pelicula-form").addEventListener("submit", agregarPelicula);
}

// Añade una nueva película a la lista desde el formulario.
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
        mostrarEstadisticas();
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
        mostrarEstadisticas();
    });
};


// Muestra todas las películas en una tabla HTML.
const listarPeliculas = () => {
    // Obtengo y limpio el contenedor de la tabla.
    const listaPeliculas = document.getElementById("listaPeliculas");
    listaPeliculas.innerHTML = "";

    // Creo la tabla, encabezado y columnas.
    const table = document.createElement("table");
    table.border = "1";
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
        "ID", "Título", "Género", "Director", "País", "Año",
        "Clasificación", "Alquilada", "Veces Alquilada", "Precio", "Imagen"
    ];

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Creo el cuerpo de la tabla.
    const tbody = document.createElement("tbody");

    // Por cada película, creo una fila con sus datos e imagen.
    peliculasArray.forEach((pelicula) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pelicula.id}</td>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.genero}</td>
            <td>${pelicula.director}</td>
            <td>${pelicula.pais}</td>
            <td>${pelicula.anio}</td>
            <td>${pelicula.clasificacion}</td>
            <td>${pelicula.alquilada ? "Sí" : "No"}</td>
            <td>${pelicula.VecesAlquilada}</td>
            <td>$${pelicula.precio}</td>
            <td><img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="50"></td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    listaPeliculas.appendChild(table); // Inserto la tabla en el HTML.

    console.log(peliculasArray); // Verifico la lista en consola.
}
const mostrarEstadisticas = () => {
    const contenedor = document.getElementById("estadisticasPeliculas");
    if (!contenedor) return;

    // Filtrar películas alquiladas
    const alquiladas = peliculasArray.filter(p => p.alquilada);

    // Sumar precios
    const totalPrecio = alquiladas.reduce((acum, p) => acum + p.precio, 0);

    // Encontrar la(s) más alquilada(s)
    const maxVeces = Math.max(...peliculasArray.map(p => p.VecesAlquilada));
    const masAlquiladas = peliculasArray.filter(p => p.VecesAlquilada === maxVeces && maxVeces > 0);

    // Armar HTML
    contenedor.innerHTML = `
        <p><strong>Total de películas alquiladas:</strong> ${alquiladas.length}</p>
        <p><strong>Suma total Recaudado del dia:</strong> $${totalPrecio}</p>
        <p><strong>Película(s) más alquilada(s):</strong></p>
        <ul>
            ${
                masAlquiladas.length
                    ? masAlquiladas.map(p => `<li>${p.titulo} (${p.VecesAlquilada} veces)</li>`).join("")
                    : "<li>Ninguna aún</li>"
            }
        </ul>
    `;

};


// Carga las películas guardadas al iniciar la app.
const cargarPeliculas = () => {
    const LaMemoria = new Memoria();
    const peliculasGuardadas = LaMemoria.leer("peliculas");

    // Si hay guardadas, las uso; si no, uso los datos iniciales.
    if (peliculasGuardadas) {
        peliculasArray = peliculasGuardadas;
    } else {
        peliculasArray = [...data];
    }
    listarPeliculas();
    mostrarEstadisticas(); // Muestro la lista cargada.
};


// Cuando el HTML esté listo, ejecuto mis funciones de inicio y carga.
document.addEventListener("DOMContentLoaded", () => {
    inicio();
    cargarPeliculas();
    mostrarEstadisticas();
    
});

// 
