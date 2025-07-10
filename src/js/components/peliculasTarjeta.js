export function crearTarjetaPelicula(pelicula, onEliminar) {
    const div = document.createElement('div')
    div.className = 'tarjeta-pelicula'
    div.innerHTML = `
      <h3>${pelicula.titulo}</h3>
      <p>Género: ${pelicula.genero}</p>
      <p>Precio: $${pelicula.precio}</p>
      <button>Eliminar</button>
    `

    const btnEliminar = div.querySelector('button')
    btnEliminar.addEventListener('click', () => {
        onEliminar(pelicula.id)
    })

    return div
}