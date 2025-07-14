import { logout } from "./services/auth.service.js";
import {
    obtenerPeliculasAlquiladas
} from "./services/catalogo.service.js";
import { UsuarioMemoria } from "./models/usuario.js";

// Maneja el evento de logout y redirige al usuario a index.html
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
// Obtiene el usuario actual desde memoria
const obtenerUsuarioActual = () => {
    const usuarioMemoria = new UsuarioMemoria();
    const usuario = usuarioMemoria.leerUsuario("usuario");
    return usuario;
};
// Muestra las películas alquiladas del usuario actual en el DOM
const mostrarPeliculasAlquiladasDOM = () => {
    const contenedor = document.getElementById("peliculas-list");
    const totalPagar = document.getElementById("totalPagar");
    const usuario = obtenerUsuarioActual();
    // Si no hay usuario, muestra un mensaje de error y sale de la función
    if (!usuario) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>Debes iniciar sesión para ver tus alquileres.</p>";
        totalPagar.textContent = "";
        return;
    }
    // Obtiene las películas alquiladas del usuario actual
    const alquiladas = obtenerPeliculasAlquiladas()
        .filter(pelicula => pelicula.nombreCliente === usuario.nombre);
    // Si no hay películas alquiladas, muestra un mensaje y sale de la función
    if (alquiladas.length === 0) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>No has alquilado ninguna película aún.</p>";
        if (!totalPagar) {
            return; // Si no se encuentra el elemento totalPagar, sale de la función
        }
        totalPagar.textContent = "";
        return;
    }
    // Muestra las películas alquiladas en el contenedor
    let total = 0;
    if (!contenedor) {
        return; // Si no se encuentra el contenedor, sale de la función
    }
    contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar las películas
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
    // Actualiza el total a pagar en el DOM
    totalPagar.textContent = `Total a pagar: $${total}`;
};
// Espera a que el DOM esté completamente cargado antes de ejecutar las funciones
document.addEventListener("DOMContentLoaded", () => {
    manejarLogout();
    cargarNombreCliente();
    mostrarPeliculasAlquiladasDOM();
});