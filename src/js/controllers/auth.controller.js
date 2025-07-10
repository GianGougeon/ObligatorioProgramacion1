// controllers/auth.controller.js
import { login } from "../services/auth.service.js";

const manejarLogin = () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (login(username, password)) {
            window.location.href = "./datos.html";
        } else {
            alert("Usuario o contraseña incorrectos");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    });
};

export { manejarLogin };
