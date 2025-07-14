// Elementos de Nueva peliculas, modiicar y eliminar
const nME = () => {
    const nueva = document.getElementById('formulario-pelicula');
    const modificar = document.getElementById('estadisticas');
    const eliminar = document.getElementById('formulario-modificar');
    return { nueva, modificar, eliminar };
}

export const btnNuevaPelicula = () => {
    const form = nME().nueva;
    const modificar = nME().modificar;
    const eliminar = nME().eliminar;
    form.style.display = 'block';
    modificar.style.display = 'none';
    eliminar.style.display = 'none';
}

export const btnModificarPelicula = () => {
    const form = nME().modificar;
    const nueva = nME().nueva;
    const eliminar = nME().eliminar;
    form.style.display = 'block';
    nueva.style.display = 'none';
    eliminar.style.display = 'none';
}

export const btnEliminarPelicula = () => {
    const form = nME().eliminar;
    const nueva = nME().nueva;
    const modificar = nME().modificar;
    form.style.display = 'block';
    nueva.style.display = 'none';
    modificar.style.display = 'none';
}