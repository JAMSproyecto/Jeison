'use strict';

const InputCorreo = document.querySelector('#txtCorreo');
const InputContrasena = document.querySelector('#txtContrasena');
const BotonSesion = document.querySelector('#btnSesion');

let mostrarAlerta = (mensaje, input) => {
    input.classList.add('error_input');
    Swal.fire({
        toast: false,
        title: mensaje,
        type: 'warning',
        position: 'center',
        //timer: 7000,
        animation: false,
        customClass: 'animated tada',
        showConfirmButton: true,
        onAfterClose: () => {
            if (input) {
                input.focus();
            }
        }
    });
};

let enviarDatos = () => {
    const Correo = InputCorreo.value.trim();
    const Contrasena = InputContrasena.value.trim();

    if (Correo.length < 1) {
        mostrarAlerta('Digite un correo electrónico válido', InputCorreo);
        return false;
    } else {
        InputCorreo.classList.remove('error_input');
    }

    if (validarCorreo(Correo) == false) {
        mostrarAlerta('El correo electrónico ingresado no es válido', InputCorreo);
        return false;
    } else {
        InputCorreo.classList.remove('error_input');
    }

    if (Contrasena.length < 6 || Contrasena.length > 8) {
        mostrarAlerta('Digite una contraseña válida', InputContrasena);
        return false;
    } else {
        InputContrasena.classList.remove('error_input');
    }

    if (validarContrasena(Contrasena) == false) {
        mostrarAlerta('La contraseña ingresada no es válida', InputContrasena);
        return false;
    } else {
        InputContrasena.classList.remove('error_input');
    }

    // Enviamos los datos limpios al servicio:
    iniciarSesion(Correo, codificar(Contrasena));
};

BotonSesion.addEventListener('click', enviarDatos, false);

window.onload = () => {
    if (InputCorreo) {
        InputCorreo.select();
        InputCorreo.focus();
    }
};
