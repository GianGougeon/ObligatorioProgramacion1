export class UsuarioMemoria {
    constructor() { }

    leerUsuario() {
        const datos = localStorage.getItem('usuario');
        if (datos) {
            return JSON.parse(datos);
        }
        return null;
    }

    escribirUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    eliminarUsuario() {
        localStorage.removeItem('usuario');
    }
}