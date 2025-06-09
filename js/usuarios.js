// --- Función para cargar y renderizar la tabla de usuarios ---
async function cargarYRenderizarUsuarios() {
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
                <tr data-usuario-id="${usuario.id}">
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${tipo}</td>
                    <td>
                        <button class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i> Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-usuario"><i class="bi bi-trash"></i> Eliminar</button>
                    </td>
                </tr>
            `;
        });
        // Re-bindea los botones eliminar
        tbody.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
            btn.addEventListener('click', async function (e) {
                e.preventDefault();
                const tr = btn.closest('tr[data-usuario-id]');
                const usuarioId = tr ? tr.getAttribute('data-usuario-id') : null;
                if (!usuarioId) return;
                if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
                const formData = new FormData();
                formData.append('id', usuarioId);
                const response = await fetch('php/del_usuario.php', {
                    method: 'POST',
                    body: formData
                });
                let res;
                try {
                    res = await response.json();
                } catch (err) {
                    window.mostrarAlerta && window.mostrarAlerta('Error inesperado al eliminar el usuario', 'danger');
                    return;
                }
                if (!res.error) {
                    window.mostrarAlerta && window.mostrarAlerta('Usuario eliminado correctamente.', 'success');
                    setTimeout(() => cargarYRenderizarUsuarios(), 800);
                } else {
                    window.mostrarAlerta && window.mostrarAlerta('No se pudo eliminar el usuario', 'danger');
                }
            });
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="5">No hay usuarios en la base de datos.</td></tr>`;
    }
}

// Llama a la función al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarYRenderizarUsuarios);
} else {
    cargarYRenderizarUsuarios();
}

// Validación de nombre en formulario (si existe)
document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('name');
    if (nombreInput) {
        nombreInput.addEventListener('input', function () {
            if (nombreInput.value.trim() === '') {
                window.mostrarAlerta && window.mostrarAlerta('El nombre es obligatorio.', 'danger');
            } else {
                window.ocultarAlerta && window.ocultarAlerta();
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
            window.mostrarAlerta && window.mostrarAlerta('Por favor, completa todos los campos.', 'danger');
            return;
        }

        const usuario = new Usuario(null, nombre, correo, contraseña, tipo_usuario_id);
       const lyricMenu = new GestorEventos();

        try {
            const result = await lyricMenu.altaUsuario(usuario);
            if (!result.error) {
                window.mostrarAlerta && window.mostrarAlerta('Usuario registrado correctamente.', 'success');
                form.reset();
            } else {
                console.error('Error al registrar usuario:', result.mensaje || result);
                window.mostrarAlerta && window.mostrarAlerta(result.mensaje || 'Error al registrar usuario.', 'danger');
            }
        } catch (error) {
            console.error('Error de conexión con el servidor:', error);
            window.mostrarAlerta && window.mostrarAlerta('Error de conexión con el servidor.', 'danger');
        }
    });

    // Definir mostrarAlerta y ocultarAlerta en window para que estén disponibles globalmente
    window.mostrarAlerta = function(mensaje, tipo) {
        const alertContainer = document.getElementById('alert_container');
        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="alert alert-${tipo}" role="alert">
                    ${mensaje}
                </div>
            `;
        }
    }
    window.ocultarAlerta = function() {
        const alertContainer = document.getElementById('alert_container');
        if (alertContainer) {
            alertContainer.innerHTML = '';
        }
    }
});

// --- Filtro de usuarios por nombre ---
document.addEventListener('DOMContentLoaded', function () {
  const inputBusquedaUsuarios = document.getElementById('busqueda-usuarios');
  if (!inputBusquedaUsuarios) return;

  let usuariosCache = [];

  // Sobrescribe la función de cargar usuarios para cachear los datos
  const originalCargarYRenderizarUsuarios = window.cargarYRenderizarUsuarios;
  window.cargarYRenderizarUsuarios = async function () {
    const tbody = document.getElementById('usuarios-tbody');
    if (!tbody) return;
    const response = await fetch('php/get_usuarios.php');
    const data = await response.json();
    usuariosCache = data && Array.isArray(data.datos) ? data.datos : [];
    renderizarUsuarios(usuariosCache);
  };

  // Renderiza la tabla de usuarios según un array
  function renderizarUsuarios(usuarios) {
    const tbody = document.getElementById('usuarios-tbody');
    if (!tbody) return;
    if (!usuarios.length) {
      tbody.innerHTML = `<tr><td colspan="5">No hay usuarios en la base de datos.</td></tr>`;
      return;
    }
    tbody.innerHTML = '';
    usuarios.forEach(usuario => {
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
        <tr data-usuario-id="${usuario.id}">
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${tipo}</td>
          <td>
            <button class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i> Editar</button>
            <button class="btn btn-danger btn-sm btn-eliminar-usuario"><i class="bi bi-trash"></i> Eliminar</button>
          </td>
        </tr>
      `;
    });
    // Re-bindea los botones eliminar
    tbody.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        const tr = btn.closest('tr[data-usuario-id]');
        const usuarioId = tr ? tr.getAttribute('data-usuario-id') : null;
        if (!usuarioId) return;
        if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;
        const formData = new FormData();
        formData.append('id', usuarioId);
        const response = await fetch('php/del_usuario.php', {
          method: 'POST',
          body: formData
        });
        let res;
        try {
          res = await response.json();
        } catch (err) {
          window.mostrarAlerta && window.mostrarAlerta('Error inesperado al eliminar el usuario', 'danger');
          return;
        }
        if (!res.error) {
          window.mostrarAlerta && window.mostrarAlerta('Usuario eliminado correctamente.', 'success');
          setTimeout(() => window.cargarYRenderizarUsuarios(), 800);
        } else {
          window.mostrarAlerta && window.mostrarAlerta('No se pudo eliminar el usuario', 'danger');
        }
      });
    });
  }

  // Filtro en tiempo real
  inputBusquedaUsuarios.addEventListener('input', function () {
    const texto = inputBusquedaUsuarios.value.trim().toLowerCase();
    if (!texto) {
      renderizarUsuarios(usuariosCache);
      return;
    }
    const filtrados = usuariosCache.filter(u => u.nombre && u.nombre.toLowerCase().includes(texto));
    renderizarUsuarios(filtrados);
  });

  // Carga inicial
  window.cargarYRenderizarUsuarios();
});