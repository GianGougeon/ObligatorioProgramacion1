import { Memoria } from './memoria.js';

export class MemoriasAlquiladas {
    constructor() {
        this.memoria = new Memoria();
        this.clave = "peliculasAlquiladas";
    }

    agregarMemoria(pelicula) {
        const peliculasAlquiladas = this.obtenerMemorias() || [];
        peliculasAlquiladas.push(pelicula);
        this.memoria.escribir(this.clave, peliculasAlquiladas);
    }

    obtenerMemorias() {
        return this.memoria.leer(this.clave);
    }

    limpiarMemorias() {
        this.memoria.borrar(this.clave);
    }
}