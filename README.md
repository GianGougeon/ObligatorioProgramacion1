# 🎬 PelisFlix – Obligatorio Programación 1

Aplicación web desarrollada como parte del curso **Programación 1**, orientada a la gestión de un catálogo de películas. Permite registrar, editar, buscar y eliminar películas, así como gestionar el alquiler de las mismas con estadísticas dinámicas.

---

## 🚀 Funcionalidades principales

- Agregar nuevas películas con título, género, director, país, clasificación, año, precio e imagen.
- Modificar y eliminar películas existentes.
- Buscar películas por título (filtro dinámico).
- Alquilar películas por cliente, con registro de fecha y estadísticas por día.
- Estadísticas visuales:
  - Películas más alquiladas
  - Total de películas alquiladas por día
  - Filtro por fecha con botones interactivos
- Guardado local persistente usando `localStorage`.

---

## 🔐 Acceso al panel de administración

Para acceder al panel admin, es necesario iniciar sesión con las siguientes credenciales:

- **Usuario:** `admin`
- **Contraseña:** `admin`

Una vez autenticado, se habilitan los formularios para la gestión del catálogo.

---

## 📁 Estructura del proyecto

| Ruta                    | Descripción                                 |
|-------------------------|---------------------------------------------|
| `/index.html`           | Página principal                            |
| `/pages/peliculas.html` | Vista de películas y sección de alquileres  |
| `/pages/nosotros.html`  | Información sobre el equipo                 |
| `/pages/sesion.html`    | Login de administrador                      |
| `/js/app.js`            | Código principal de interacción             |
| `/js/peliculas.js`      | Gestión de películas                        |
| `/js/sesion.js`         | Lógica de autenticación                     |
| `/js/controller/`       | Controladores de lógica de UI               |
| `/js/service/`          | Servicios y lógica de negocio               |
| `/js/models/`           | Clases como `Pelicula`, `Cliente`, etc.     |
| `/css/styles.css`       | Estilos base                                |
| `/scss/`                | Archivos Sass para estilos                  |
| `/assets/images/`       | Imágenes de películas y diseño              |

---

## 🧪 Tecnologías utilizadas

- HTML5
- CSS3 / Sass (SCSS)
- JavaScript ES6
- LocalStorage API
- Arquitectura por capas (`controller`, `service`, `model`)
- Git & GitHub

---

## 🌐 Acceso en línea

Puedes ver el proyecto funcionando en:

👉 [PelisFlix en GitHub Pages](https://giangougeon.github.io/ObligatorioProgramacion1/) 👈

---

## 👨‍💻 Autores

- **Gianfranco Gougeon** - [GitHub](https://github.com/GianGougeon)
- **Santiago Pino** - [GitHub](https://github.com/pichilo)

---

## 📸 Capturas de pantalla

### Página principal
![Home](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/home.png?raw=true)

### Vista de películas y alquileres
![Peliculas](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/peliculas.png?raw=true)

### Vista de Nosotoros
![Nosotros](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/nosotros.png?raw=true)

### Vista de perfil de usuario
![Perfil](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/perfil.png?raw=true)

### Vista del panel de administración
![Admin](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/admin.png?raw=true)
![Admin](https://github.com/GianGougeon/ObligatorioProgramacion1/blob/master/screenshots/admin2.png?raw=true)

---

## 📌 Estado del proyecto

✅ Finalizado para entrega de curso.  
🛠️ Abierto a mejoras futuras como integración con backend o autenticación real.

---
