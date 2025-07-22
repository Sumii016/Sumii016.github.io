const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmpty = /^\s*$/;
const telefonoHNRegex = /^(?:\+504|00504)?[-\s]?[389]\d{3}[-\s]?\d{4}$/;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form"); 
    const txtNombre = document.getElementById("txtNombre");
    const txtEmail = document.getElementById("txtEmail");
    const txtTelefono = document.getElementById("txtTelefono");
    const selectMotivo = document.getElementById("Motivo");
    const txtMensaje = document.getElementById("txtMensaje");
    const errorContainer = document.getElementById("errorContainer");

    form.addEventListener("submit", (e) => {
        errorContainer.innerHTML = "";
        let error = [];
        let hasError = false;

        if (isEmpty.test(txtNombre.value.trim())) {
            hasError = true;
            error.push("El nombre es requerido.");
        }

        if (!emailRegex.test(txtEmail.value.trim())) {
            hasError = true;
            error.push("El correo electrónico no es válido.");
        }

        if (!telefonoHNRegex.test(txtTelefono.value.trim())) {
            hasError = true;
            error.push("El número de teléfono debe ser válido.");
        }

        if (selectMotivo.value === "") {
            hasError = true;
            error.push("Debe seleccionar un motivo.");
        }

        if (isEmpty.test(txtMensaje.value.trim())) {
            hasError = true;
            error.push("Debe escribir un mensaje.");
        }

        if (hasError) {
            e.preventDefault();
            error.forEach(msg => {
                const p = document.createElement("p");
                p.textContent = msg;
                errorContainer.appendChild(p);
            });
        } else {
            alert("Mensaje enviado correctamente.");
            form.reset();
        }
    });
});