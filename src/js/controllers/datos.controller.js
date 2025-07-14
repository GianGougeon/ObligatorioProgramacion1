// datos.html
// Elementos de Nueva peliculas, modiicar y eliminar
const nME = () => {
    const btnNuevaPelicula = document.getElementById('formulario-pelicula');
    const btnModificarPelicula = document.getElementById('estadisticas');
    const btnEliminarPelicula = document.getElementById('formulario-modificar');
    return { btnEliminarPelicula, btnModificarPelicula, btnNuevaPelicula };
}
// Funciones para mostrar y ocultar los formularios de Nueva, Modificar y Eliminar Peliculas

export const btnNuevaPelicula = () => {
    const form = nME().btnNuevaPelicula;
    const modificar = nME().btnModificarPelicula;
    const eliminar = nME().btnEliminarPelicula;
    form.style.display = 'block';
    modificar.style.display = 'none';
    eliminar.style.display = 'none';
}

export const btnModificarPelicula = () => {
    const form = nME().btnNuevaPelicula;
    const modificar = nME().btnModificarPelicula;
    const eliminar = nME().btnEliminarPelicula;
    form.style.display = 'none';
    modificar.style.display = 'block';
    eliminar.style.display = 'none';
}

export const btnEliminarPelicula = () => {
    const form = nME().btnNuevaPelicula;
    const modificar = nME().btnModificarPelicula;
    const eliminar = nME().btnEliminarPelicula;
    form.style.display = 'none';
    modificar.style.display = 'none';
    eliminar.style.display = 'block';
}