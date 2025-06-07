// Mostrar usuarios en tabla (si existe)
document.addEventListener('DOMContentLoaded', async function () {
    const tbody = document.getElementById('usuarios-tbody');
    if (!tbody) return;

    const response = await fetch('php/get_usuarios.php');
    const data = await response.json();

    if (data && Array.isArray(data.datos)) {
        tbody.innerHTML = '';
        data.datos.forEach(usuario => {
            let tipo = usuario.tipo_usuario_id;
            switch (tipo) {
                case "5": tipo = "Admin"; break;
                case "3": tipo = "Empresa"; break;
                case "4": tipo = "Estándar"; break;
                case "2": tipo = "Institución educativa"; break;
                case "1": tipo = "Organización"; break;
                case "6": tipo = "Trabajador"; break;
                default: tipo = tipo;
            }
            tbody.innerHTML += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${tipo}</td>
                    <td>
                        <button class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i> Editar</button>
                        <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i> Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="5">No hay usuarios en la base de datos.</td></tr>`;
    }
});

// Validación de nombre en formulario (si existe)
document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('name');
    if (nombreInput) {
        nombreInput.addEventListener('input', function () {
            if (nombreInput.value.trim() === '') {
                mostrarAlerta('El nombre es obligatorio.', 'danger');
            } else {
                ocultarAlerta();
            }
        });
    }

    // Alta de usuario desde formulario (si existe)
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = document.getElementById('name').value.trim();
        const correo = document.getElementById('email').value.trim();
        const contraseña = document.getElementById('password').value;
        const organizador = document.getElementById('organizadorEventos')?.checked || false;

        let tipo_usuario_id = organizador ? 1 : 4; // 1 = Organización, 4 = Estándar

        if (!nombre || !correo || !contraseña) {
            mostrarAlerta('Por favor, completa todos los campos.', 'danger');
            return;
        }

        const usuario = new Usuario(null, nombre, correo, contraseña, tipo_usuario_id);
       const lyricMenu = new GestorEventos();

        try {
            const result = await lyricMenu.altaUsuario(usuario);
            if (!result.error) {
                mostrarAlerta('Usuario registrado correctamente.', 'success');
                form.reset();
            } else {
                console.error('Error al registrar usuario:', result.mensaje || result);
                mostrarAlerta(result.mensaje || 'Error al registrar usuario.', 'danger');
            }
        } catch (error) {
            console.error('Error de conexión con el servidor:', error);
            mostrarAlerta('Error de conexión con el servidor.', 'danger');
        }
    });

    function mostrarAlerta(mensaje, tipo) {
        const alertContainer = document.getElementById('alert_container');
        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="alert alert-${tipo}" role="alert">
                    ${mensaje}
                </div>
            `;
        }
    }

    function ocultarAlerta() {
        const alertContainer = document.getElementById('alert_container');
        if (alertContainer) {
            alertContainer.innerHTML = '';
        }
    }
});