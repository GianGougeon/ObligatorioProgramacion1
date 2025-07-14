import { logout } from "./services/auth.service.js";
import {
    obtenerPeliculasAlquiladas
} from "./services/catalogo.service.js";
import { UsuarioMemoria } from "./models/usuario.js";

const manejarLogout = () => {
    const logoutButton = document.getElementById("logoutButton");
    if (!logoutButton) return;
    logoutButton.addEventListener("click", () => {
        logout();
        window.location.href = "/index.html";
    });
}

// Funcion para imprimir nombre del cliente
const cargarNombreCliente = () => {
    const usuarioMemoria = new UsuarioMemoria();
    const usuario = usuarioMemoria.leerUsuario("usuario");
    try {
        if (usuario && usuario.nombre) {
            const userNameElement = document.getElementById("user-name");
            if (userNameElement) {
                userNameElement.textContent = usuario.nombre;
            }
        }
    } catch (error) {
        console.error("Error al cargar el nombre del cliente:", error);
    }
}
const obtenerUsuarioActual = () => {
    const usuarioMemoria = new UsuarioMemoria();
    const usuario = usuarioMemoria.leerUsuario("usuario");
    return usuario;
};

const mostrarPeliculasAlquiladasDOM = () => {
    const contenedor = document.getElementById("peliculas-list");
    const totalPagar = document.getElementById("totalPagar");
    const usuario = obtenerUsuarioActual();

    if (!usuario) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>Debes iniciar sesión para ver tus alquileres.</p>";
        totalPagar.textContent = "";
        return;
    }

    const alquiladas = obtenerPeliculasAlquiladas()
        .filter(pelicula => pelicula.nombreCliente === usuario.nombre);

    if (alquiladas.length === 0) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>No has alquilado ninguna película aún.</p>";
        totalPagar.textContent = "";
        return;
    }

    let total = 0;

    const listaPeliculas = alquiladas.map(p => {
        const fecha = p.fechaAlquiler || "Fecha desconocida";
        total += p.precio;
        return `
            <li>
                <strong>${p.titulo}</strong>
                <span class="fecha-alquiler">(${fecha.hora} - ${fecha.fecha})</span>
            </li>`;
    }).join("");
    contenedor.innerHTML = `
        <table class="tabla-alquiladas">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Películas alquiladas</th>
                    <th>Total a pagar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>
                        <ul class="lista-peliculas">
                            ${listaPeliculas}
                        </ul>
                    </td>
                    <td>$${total}</td>
                </tr>
            </tbody>
        </table>
    `;

    totalPagar.textContent = `Total a pagar: $${total}`;
};

document.addEventListener("DOMContentLoaded", () => {
    manejarLogout();
    cargarNombreCliente();
    mostrarPeliculasAlquiladasDOM();
});