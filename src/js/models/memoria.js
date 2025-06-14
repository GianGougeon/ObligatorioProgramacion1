export class Memoria {
    escribir(clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify(datos));
        } catch (e) {
            console.error("Error al escribir en localStorage:", e);
            if (e.name === 'QuotaExceededError') {
                alert("Advertencia: Se ha excedido el límite de almacenamiento del navegador para las películas e imágenes. Algunas películas podrían no guardarse.");
            }
        }
    }

    leer(clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (e) {
            console.error("Error al leer de localStorage:", e);
            return null;
        }
    }
}