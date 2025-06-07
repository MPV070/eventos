

// Función para mostrar usuarios
document.addEventListener('DOMContentLoaded', async function () {
    const tbody = document.getElementById('usuarios-tbody');
    const response = await fetch('php/retrive_usuario.php');
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

// Función para agregar un nuevo usuario
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    if (!form) return; // Solo ejecuta si hay formulario

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre = document.getElementById('name').value.trim();
        const correo = document.getElementById('exampleInputEmail1').value.trim();
        const contraseña = document.getElementById('exampleInputPassword1').value;
        const organizador = document.getElementById('organizadorEventos').checked;

        // Determina el tipo de usuario
        let tipo_usuario_id = organizador ? 1 : 4; // 1 = Organización, 4 = Estándar

        // Validación básica
        if (!nombre || !correo || !contraseña) {
            mostrarAlerta('Por favor, completa todos los campos.', 'danger');
            return;
        }

        // Usa la clase Usuario y LyricMenu
        const usuario = new Usuario(null, nombre, correo, contraseña, tipo_usuario_id);
        const lyricMenu = new LyricMenu();

        try {
            const result = await lyricMenu.altaUsuario(usuario);
            if (!result.error) {
                mostrarAlerta('Usuario registrado correctamente.', 'success');
                form.reset();
            } else {
                mostrarAlerta(result.mensaje || 'Error al registrar usuario.', 'danger');
            }
        } catch (error) {
            mostrarAlerta('Error de conexión con el servidor.', 'danger');
        }
    });

    function mostrarAlerta(mensaje, tipo) {
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `
            <div class="alert alert-${tipo}" role="alert">
                ${mensaje}
            </div>
        `;
    }
});