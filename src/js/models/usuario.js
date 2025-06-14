export class UsuariosMemoria {
    constructor() { }

    leerUsuarios() {
        const datos = localStorage.getItem('usuarios');
        if (datos) {
            return JSON.parse(datos);
        }
        return [];
    }

    escribirUsuarios(usuarios) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}