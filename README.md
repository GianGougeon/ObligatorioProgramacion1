# 🎬 PelisFlix – Obligatorio Programación 1

Aplicación web creada como parte del curso de Programación 1. Permite la gestión de un catálogo de películas, incluyendo operaciones como agregar, modificar, eliminar y buscar, además de mostrar estadísticas relevantes.

---

## 🚀 Funcionalidades principales

-   Agregar nuevas películas con título, género, director, país, clasificación, año, precio e imagen.
-   Modificar los datos de películas existentes.
-   Eliminar películas por ID.
-   Buscar películas por título.
-   Mostrar estadísticas generales (cantidad, promedio de precios, etc.).
-   Guardado local persistente usando `localStorage`.

---

## 🔒 Acceso al menú Admin

Para acceder a la sección de administración se requiere autenticación.

-   **Usuario:** `user`
-   **Contraseña:** `user` _(verificada dentro del formulario, típicamente hardcodeada en JS)_

Una vez autenticado, se habilita el acceso a los formularios de gestión de películas.

---

## 🌐 Rutas del sitio

| Ruta                    | Descripción                                 |
| ----------------------- | ------------------------------------------- |
| `/index.html`           | Página principal                            |
| `/pages/peliculas.html` | Lista de películas y películas alquiladas   |
| `/pages/nosotros.html`  | Información del equipo o proyecto           |
| `/pages/sesion.html`    | Login para acceder al menú Admin            |
| `/assets/images/`       | Imágenes y recursos                         |
| `/js/app.js`            | Lógica de interacción y memoria             |
| `/js/sesion.js`         | Lógica de autenticación y gestión de sesión |
| `/js/peliculas.js`      | Lógica de gestión de películas              |
| `/css/styles.css`       | Estilos principales                         |

---

## 🛠️ Tecnologías utilizadas

-   HTML5
-   CSS3
-   JavaScript ES6
-   Git & GitHub
-   Web Storage API (`localStorage`)
-   Sass

---

## 🌐 Acceso en línea

Puedes acceder a la aplicación desplegada en GitHub Pages en el siguiente enlace:

👉 [PelisFlix](https://giangougeon.github.io/ObligatorioProgramacion1/) 👈

---

## 👨‍💻 Autores

Gianfranco Gougeon - [GitHub](https://github.com/GianGougeon)
Santiago Pino - [GitHub](https://github.com/pichilo)

---

## 📷 Imágenes de la aplicación

![Home](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/main/screenshots/home.png?raw=true)
##
![Peliculas](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/main/screenshots/peliculas.png?raw=true)
##
![Admin](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/main/screenshots/admin.png?raw=true)

---

