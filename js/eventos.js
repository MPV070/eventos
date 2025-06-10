// --- Función para cargar y renderizar la tabla de eventos ---
async function cargarYRenderizarEventos() {
    const tbody = document.getElementById('eventos-tbody');
    if (!tbody) return;

    const response = await fetch('php/get_eventos.php');
    const data = await response.json();

    if (data && Array.isArray(data.datos)) {
        tbody.innerHTML = '';
        for (const evento of data.datos) {
            // Formatear fecha a dd/mm/aaaa de forma robusta
            let fechaFormateada = evento.fecha;
            if (fechaFormateada) {
                const dateObj = new Date(fechaFormateada);
                if (!isNaN(dateObj)) {
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = dateObj.getFullYear();
                    fechaFormateada = `${day}/${month}/${year}`;
                }
            }
            // Obtener los pases por AJAX de forma síncrona (para cada evento)
            let pasesHtml = '<span class="text-muted">Cargando...</span>';
            try {
                const pasesResp = await fetch(`php/get_pases.php?evento_id=${evento.id}`);
                const pasesData = await pasesResp.json();
                if (pasesData.success && pasesData.pases.length) {
                    pasesHtml = '<ul class="list-unstyled mb-0">';
                    pasesData.pases.forEach(pase => {
                        pasesHtml += `<li><span class='badge bg-secondary me-1'>${pase.fecha}</span> <span class='badge bg-info'>${pase.hora}</span></li>`;
                    });
                    pasesHtml += '</ul>';
                } else {
                    pasesHtml = '<span class="text-danger">Sin pases</span>';
                }
            } catch (e) {
                pasesHtml = '<span class="text-danger">Error</span>';
            }
            tbody.innerHTML += `
                <tr data-evento-id="${evento.id}">
                    <td class="d-none d-sm-table-cell">${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td class="d-none d-sm-table-cell tableImg">${evento.url_imagen ? `<img src="${evento.url_imagen}" class="tableImg" alt="${evento.nombre}">` : ''}</td>
                    <td class="d-none d-sm-table-cell">${evento.descripcion}</td>
                    <td class="d-none d-sm-table-cell">${evento.ubicacion}</td>
                    <td class="d-none d-sm-table-cell">${fechaFormateada}</td>
                    <td class="d-none d-sm-table-cell">${evento.hora}</td>
                    <td class="d-none d-sm-table-cell">${evento.precio}€</td>
                    <td class="d-none d-sm-table-cell">${evento.plazas_disponibles}/${evento.plazas_totales}</td>
                    <td class="d-none d-sm-table-cell">${pasesHtml}</td>
                    <td class="d-none d-sm-table-cell">
                        <button class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i> Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-evento"><i class="bi bi-trash"></i> Eliminar</button>
                    </td>
                    <td class="d-sm-none">
                        <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#evento${evento.id}" aria-expanded="false" aria-controls="evento${evento.id}">
                            Ver más
                        </button>
                    </td>
                </tr>
                <tr class="d-sm-none">
                    <td colspan="2" class="p-0 border-0">
                        <div class="collapse" id="evento${evento.id}">
                            <div class="card card-body">
                                ${evento.url_imagen ? `<img src="${evento.url_imagen}" alt="${evento.nombre}" class="mb-2 tableImg" style="width: 100px;">` : ''}
                                <strong>Descripción:</strong> ${evento.descripcion}<br>
                                <strong>Ubicación:</strong> ${evento.ubicacion}<br>
                                <strong>Fecha:</strong> ${fechaFormateada}<br>
                                <strong>Hora:</strong> ${evento.hora}<br>
                                <strong>Precio:</strong> ${evento.precio}€<br>
                                <strong>Plazas:</strong> ${evento.plazas_disponibles}/${evento.plazas_totales}<br>
                                <strong>Pases:</strong> ${pasesHtml}
                                <button class="btn btn-primary btn-sm mt-2"><i class="bi bi-pencil"></i> Editar</button>
                                <button class="btn btn-danger btn-sm mt-2 btn-eliminar-evento"><i class="bi bi-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>`;
        }
        // Re-bindea los botones eliminar
        tbody.querySelectorAll('.btn-eliminar-evento').forEach(btn => {
            btn.addEventListener('click', async function (e) {
                e.preventDefault();
                const tr = btn.closest('tr[data-evento-id]');
                const eventoId = tr ? tr.getAttribute('data-evento-id') : null;
                if (!eventoId) return;
                if (!confirm('¿Seguro que quieres eliminar este evento?')) return;
                const formData = new FormData();
                formData.append('id', eventoId);
                const response = await fetch('php/del_evento.php', {
                    method: 'POST',
                    body: formData
                });
                let res;
                try {
                    res = await response.json();
                } catch (err) {
                    mostrarToast('Error inesperado al eliminar el evento', 'Error', 'bg-danger');
                    return;
                }
                if (!res.error) {
                    mostrarToast('Evento eliminado correctamente', 'Éxito', 'bg-success');
                    // Refresca la tabla de eventos automáticamente
                    setTimeout(() => cargarYRenderizarEventos(), 800);
                } else {
                    mostrarToast('No se pudo eliminar el evento', 'Error', 'bg-danger');
                }
            });
        });
        // --- NUEVO: Inicializa popovers para los botones "Ver pases" ---
        tbody.querySelectorAll('.btn-ver-pases').forEach(btn => {
            btn.addEventListener('click', async function (e) {
                e.preventDefault();
                const eventoId = btn.getAttribute('data-evento-id');
                btn.setAttribute('data-bs-content', 'Cargando...');
                btn.setAttribute('data-bs-toggle', 'popover');
                if (btn._popoverInstance) {
                    btn._popoverInstance.dispose();
                }
                // Carga los pases por AJAX
                const response = await fetch(`php/get_pases.php?evento_id=${eventoId}`);
                const data = await response.json();
                let html = '';
                if (data.success && data.pases.length) {
                    html += '<div class="list-group">';
                    data.pases.forEach(pase => {
                        html += `<button type=\"button\" class=\"list-group-item list-group-item-action pase-popover-item\" data-pase-id=\"${pase.id}\">${pase.fecha} ${pase.hora}</button>`;
                    });
                    html += '</div>';
                } else {
                    html = '<span class="text-danger">No hay pases disponibles</span>';
                }
                btn.setAttribute('data-bs-content', html);
                // Inicializa el popover SIEMPRE (aunque ya exista uno)
                btn._popoverInstance = new bootstrap.Popover(btn, {
                    html: true,
                    content: html,
                    placement: 'bottom',
                    trigger: 'focus',
                    sanitize: false
                });
                btn._popoverInstance.show();
            });
        });
        // --- NUEVO: Delegación para click en pase dentro del popover ---
        document.body.addEventListener('click', function(e) {
            if (e.target.classList.contains('pase-popover-item')) {
                const paseId = e.target.getAttribute('data-pase-id');
                // Cierra todos los popovers
                document.querySelectorAll('.btn-ver-pases').forEach(b => {
                    if (b._popoverInstance) b._popoverInstance.hide();
                });
                mostrarModalReserva(paseId);
            }
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="11">No hay eventos en la base de datos.</td></tr>`;
    }
}

// --- NUEVO: Modal de reserva para pase ---
function mostrarModalReserva(paseId) {
    // Puedes personalizar este modal según tu HTML
    const usuarioId = prompt("Introduce tu ID de usuario para reservar:");
    if (!usuarioId) return;
    reservarPase(paseId, usuarioId);
}

async function reservarPase(paseId, usuarioId) {
    const formData = new FormData();
    formData.append('pase_id', paseId);
    formData.append('usuario_id', usuarioId);
    const response = await fetch('php/reservar_pase.php', { method: 'POST', body: formData });
    const data = await response.json();
    alert(data.message);
    if (data.success) {
        // Opcional: recargar los pases para actualizar plazas
        // cargarYRenderizarEventos();
    }
}

// Llama a la función al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarYRenderizarEventos);
} else {
    cargarYRenderizarEventos();
}

// --- Toast Bootstrap ---
function mostrarToast(mensaje, titulo = 'Aviso', tipo = 'bg-success') {
  const toastEl = document.getElementById('liveToast');
  const toastHeader = toastEl.querySelector('.toast-header');
  const toastBody = toastEl.querySelector('.toast-body');
  toastHeader.innerHTML = `<strong class='me-auto'>${titulo}</strong><button type='button' class='btn-close' data-bs-dismiss='toast' aria-label='Close'></button>`;
  toastBody.textContent = mensaje;
  toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
  toastEl.classList.add(tipo);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// --- Envío de formulario de registro de evento ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = document.getElementById('eventName')?.value.trim();
    const url_imagen = document.getElementById('eventImg')?.value.trim();
    const descripcion = document.getElementById('eventDescription')?.value.trim();
    const ubicacion = document.getElementById('eventLocation')?.value.trim();
    const fecha = document.getElementById('eventDate')?.value;
    const hora = document.getElementById('eventTime')?.value;
    const precio = document.getElementById('eventPrice')?.value;
    const plazas_totales = document.getElementById('eventSeats')?.value;
    if (!nombre || !url_imagen || !descripcion || !ubicacion || !fecha || !hora || !precio || !plazas_totales) {
      mostrarToast('Por favor, completa todos los campos.', 'Error', 'bg-danger');
      return;
    }
    const evento = Evento.fromFormFields({
      nombre,
      url_imagen,
      descripcion,
      ubicacion,
      fecha,
      hora,
      precio,
      plazas_totales
    });
    try {
      const formData = new FormData();
      formData.append('evento', JSON.stringify(evento.toJSON()));
      const response = await fetch('php/alta_eventos.php', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (!data.error) {
        mostrarToast('Se ha registrado el evento', 'Éxito', 'bg-success');
        form.reset();
        // Refresca la tabla si existe
        cargarYRenderizarEventos();
      } else {
        mostrarToast('No se ha podido registrar el evento', 'Error', 'bg-danger');
      }
    } catch (err) {
      mostrarToast('No se ha podido registrar el evento', 'Error', 'bg-danger');
    }
  });
});

// --- Filtro de eventos por nombre ---
document.addEventListener('DOMContentLoaded', function () {
  const inputBusqueda = document.getElementById('busqueda-eventos');
  const idBusqueda = document.getElementById('busqueda-id-evento');
  const precioMinInput = document.getElementById('precio-min');
  const precioMaxInput = document.getElementById('precio-max');
  const btnFiltrar = document.getElementById('btn-filtrar-precio');
  if (!inputBusqueda || !idBusqueda || !precioMinInput || !precioMaxInput || !btnFiltrar) return;

  let eventosCache = [];

  // Función para cargar eventos con filtros
  async function cargarEventosFiltrados() {
    const nombre = inputBusqueda.value.trim();
    const id = idBusqueda.value.trim();
    const precioMin = precioMinInput.value;
    const precioMax = precioMaxInput.value;
    let url = 'php/get_eventos.php?';
    if (id) {
      url += `id=${encodeURIComponent(id)}&`;
    } else {
      if (precioMin) url += `precio_min=${encodeURIComponent(precioMin)}&`;
      if (precioMax) url += `precio_max=${encodeURIComponent(precioMax)}&`;
    }
    const response = await fetch(url);
    const data = await response.json();
    eventosCache = data && Array.isArray(data.datos) ? data.datos : [];
    // Si hay filtro por nombre, filtra en el cliente
    let filtrados = eventosCache;
    if (nombre) {
      filtrados = filtrados.filter(ev => ev.nombre && ev.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    renderizarEventos(filtrados);
  }

  btnFiltrar.addEventListener('click', function (e) {
    e.preventDefault();
    cargarEventosFiltrados();
  });

  idBusqueda.addEventListener('input', function () {
    if (idBusqueda.value) {
      precioMinInput.value = '';
      precioMaxInput.value = '';
    }
  });

  // Sobrescribe la función de cargar eventos para cachear los datos
  const originalCargarYRenderizarEventos = window.cargarYRenderizarEventos;
  window.cargarYRenderizarEventos = async function () {
    const tbody = document.getElementById('eventos-tbody');
    if (!tbody) return;
    const response = await fetch('php/get_eventos.php');
    const data = await response.json();
    eventosCache = data && Array.isArray(data.datos) ? data.datos : [];
    renderizarEventos(eventosCache);
  };

  // Renderiza la tabla de eventos según un array
  function renderizarEventos(eventos) {
    const tbody = document.getElementById('eventos-tbody');
    if (!tbody) return;
    if (!eventos.length) {
      tbody.innerHTML = `<tr><td colspan="11">No hay eventos en la base de datos.</td></tr>`;
      return;
    }
    tbody.innerHTML = '';
    eventos.forEach((evento, idx) => {
      // Formatear fecha a dd/mm/aaaa de forma robusta
      let fechaFormateada = evento.fecha;
      if (fechaFormateada) {
        const dateObj = new Date(fechaFormateada);
        if (!isNaN(dateObj)) {
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          fechaFormateada = `${day}/${month}/${year}`;
        }
      }
      tbody.innerHTML += `
        <tr data-evento-id="${evento.id}">
          <td class="d-none d-sm-table-cell">${evento.id}</td>
          <td>${evento.nombre}</td>
          <td class="d-none d-sm-table-cell tableImg">${evento.url_imagen ? `<img src="${evento.url_imagen}" class="tableImg" alt="${evento.nombre}">` : ''}</td>
          <td class="d-none d-sm-table-cell">${evento.descripcion}</td>
          <td class="d-none d-sm-table-cell">${evento.ubicacion}</td>
          <td class="d-none d-sm-table-cell">${fechaFormateada}</td>
          <td class="d-none d-sm-table-cell">${evento.hora}</td>
          <td class="d-none d-sm-table-cell">${evento.precio}€</td>
          <td class="d-none d-sm-table-cell">${evento.plazas_disponibles}/${evento.plazas_totales}</td>
          <td class="d-none d-sm-table-cell">
            <button class="btn btn-primary btn-sm"><i class="bi bi-pencil"></i> Editar</button>
            <button class="btn btn-danger btn-sm btn-eliminar-evento"><i class="bi bi-trash"></i> Eliminar</button>
          </td>
          <td class="d-sm-none">
            <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#evento${evento.id}" aria-expanded="false" aria-controls="evento${evento.id}">
              Ver más
            </button>
          </td>
        </tr>
        <tr class="d-sm-none">
          <td colspan="2" class="p-0 border-0">
            <div class="collapse" id="evento${evento.id}">
              <div class="card card-body">
                ${evento.url_imagen ? `<img src="${evento.url_imagen}" alt="${evento.nombre}" class="mb-2 tableImg" style="width: 100px;">` : ''}
                <strong>Descripción:</strong> ${evento.descripcion}<br>
                <strong>Ubicación:</strong> ${evento.ubicacion}<br>
                <strong>Fecha:</strong> ${fechaFormateada}<br>
                <strong>Hora:</strong> ${evento.hora}<br>
                <strong>Precio:</strong> ${evento.precio}€<br>
                <strong>Plazas:</strong> ${evento.plazas_disponibles}/${evento.plazas_totales}<br>
                <strong>Pases:</strong> ${pasesHtml}
                <button class="btn btn-primary btn-sm mt-2"><i class="bi bi-pencil"></i> Editar</button>
                <button class="btn btn-danger btn-sm mt-2 btn-eliminar-evento"><i class="bi bi-trash"></i> Eliminar</button>
              </div>
            </div>
          </td>
        </tr>`;
    });
    // Re-bindea los botones eliminar igual que en js/eventos.js
    tbody.querySelectorAll('.btn-eliminar-evento').forEach(btn => {
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        const tr = btn.closest('tr[data-evento-id]');
        const eventoId = tr ? tr.getAttribute('data-evento-id') : null;
        if (!eventoId) return;
        if (!confirm('¿Seguro que quieres eliminar este evento?')) return;
        const formData = new FormData();
        formData.append('id', eventoId);
        const response = await fetch('php/del_evento.php', {
          method: 'POST',
          body: formData
        });
        let res;
        try {
          res = await response.json();
        } catch (err) {
          window.mostrarToast && window.mostrarToast('Error inesperado al eliminar el evento', 'Error', 'bg-danger');
          return;
        }
        if (!res.error) {
          window.mostrarToast && window.mostrarToast('Evento eliminado correctamente', 'Éxito', 'bg-success');
          setTimeout(() => window.cargarYRenderizarEventos(), 800);
        } else {
          window.mostrarToast && window.mostrarToast('No se pudo eliminar el evento', 'Error', 'bg-danger');
        }
      });
    });
    // --- NUEVO: Re-bindea los botones editar evento ---
    tbody.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const tr = btn.closest('tr[data-evento-id]');
        const eventoId = tr ? tr.getAttribute('data-evento-id') : null;
        if (!eventoId) return;
        // Busca el evento en eventosCache (si existe) o en la tabla
        let evento = null;
        if (typeof eventosCache !== 'undefined' && Array.isArray(eventosCache)) {
          evento = eventosCache.find(ev => String(ev.id) === String(eventoId));
        }
        if (!evento) {
          // Si no hay cache, busca en la fila
          const tds = tr.querySelectorAll('td');
          evento = {
            id: eventoId,
            nombre: tds[1]?.textContent || '',
            url_imagen: tds[2]?.querySelector('img')?.src || '',
            descripcion: tds[3]?.textContent || '',
            ubicacion: tds[4]?.textContent || '',
            fecha: tds[5]?.textContent || '',
            hora: tds[6]?.textContent || '',
            precio: (tds[7]?.textContent || '').replace('€',''),
            plazas_disponibles: tds[8]?.textContent || '',
            plazas_totales: '' // No está en la tabla, pero se puede cargar si es necesario
          };
        }
        // Rellena el modal
        document.getElementById('editarEventoId').value = evento.id;
        document.getElementById('editarEventoNombre').value = evento.nombre;
        document.getElementById('editarEventoUrlImagen').value = evento.url_imagen;
        document.getElementById('editarEventoDescripcion').value = evento.descripcion;
        document.getElementById('editarEventoUbicacion').value = evento.ubicacion;
        // Fecha en formato yyyy-mm-dd
        let fecha = evento.fecha;
        if (fecha && fecha.includes('/')) {
          // Si está en formato dd/mm/yyyy, conviértelo
          const [d, m, y] = fecha.split('/');
          fecha = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
        }
        document.getElementById('editarEventoFecha').value = fecha;
        document.getElementById('editarEventoHora').value = evento.hora;
        document.getElementById('editarEventoPrecio').value = evento.precio;
        document.getElementById('editarEventoPlazasDisponibles').value = evento.plazas_disponibles;
        document.getElementById('editarEventoPlazasTotales').value = evento.plazas_totales;
        // Muestra el modal
        const modal = new bootstrap.Modal(document.getElementById('modalEditarEvento'));
        modal.show();
      });
    });
  }

  // Filtro en tiempo real
  inputBusqueda.addEventListener('input', function () {
    const texto = inputBusqueda.value.trim().toLowerCase();
    if (!texto) {
      renderizarEventos(eventosCache);
      return;
    }
    const filtrados = eventosCache.filter(ev => ev.nombre && ev.nombre.toLowerCase().includes(texto));
    renderizarEventos(filtrados);
  });

  // Carga inicial
  window.cargarYRenderizarEventos();
});

// --- Lógica para guardar cambios del modal de edición de evento ---
document.addEventListener('DOMContentLoaded', function () {
  const formEditar = document.getElementById('formEditarEvento');
  if (!formEditar) return;
  formEditar.addEventListener('submit', async function (e) {
    e.preventDefault();
    const id = document.getElementById('editarEventoId').value;
    const nombre = document.getElementById('editarEventoNombre').value.trim();
    const url_imagen = document.getElementById('editarEventoUrlImagen').value.trim();
    const descripcion = document.getElementById('editarEventoDescripcion').value.trim();
    const ubicacion = document.getElementById('editarEventoUbicacion').value.trim();
    const fecha = document.getElementById('editarEventoFecha').value;
    const hora = document.getElementById('editarEventoHora').value;
    const precio = document.getElementById('editarEventoPrecio').value;
    const plazas_disponibles = document.getElementById('editarEventoPlazasDisponibles').value;
    const plazas_totales = document.getElementById('editarEventoPlazasTotales').value;
    const errorDiv = document.getElementById('plazasDisponiblesError');
    // --- Validación de plazas ---
    if (parseInt(plazas_disponibles, 10) > parseInt(plazas_totales, 10)) {
      errorDiv.classList.remove('d-none');
      document.getElementById('editarEventoPlazasDisponibles').focus();
      return;
    }
    if (!id || !nombre || !url_imagen || !descripcion || !ubicacion || !fecha || !hora || !precio || !plazas_disponibles || !plazas_totales) {
      mostrarToast('Todos los campos son obligatorios.', 'Error', 'bg-danger');
      return;
    }
    const formData = new FormData();
    formData.append('id', id);
    formData.append('nombre', nombre);
    formData.append('url_imagen', url_imagen);
    formData.append('descripcion', descripcion);
    formData.append('ubicacion', ubicacion);
    formData.append('fecha', fecha);
    formData.append('hora', hora);
    formData.append('precio', precio);
    formData.append('plazas_disponibles', plazas_disponibles);
    formData.append('plazas_totales', plazas_totales);
    try {
      const response = await fetch('php/editar_evento.php', {
        method: 'POST',
        body: formData
      });
      const res = await response.json();
      if (res.success) {
        mostrarToast('Evento editado correctamente.', 'Éxito', 'bg-success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarEvento'));
        modal.hide();
        window.cargarYRenderizarEventos && window.cargarYRenderizarEventos();
      } else {
        mostrarToast(res.message || 'No se pudo editar el evento', 'Error', 'bg-danger');
      }
    } catch (err) {
      mostrarToast('Error inesperado al editar el evento', 'Error', 'bg-danger');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const plazasDisponiblesInput = document.getElementById('editarEventoPlazasDisponibles');
  const plazasTotalesInput = document.getElementById('editarEventoPlazasTotales');
  const errorDiv = document.getElementById('plazasDisponiblesError');
  if (plazasDisponiblesInput && plazasTotalesInput && errorDiv) {
    function validarPlazas() {
      const disponibles = parseInt(plazasDisponiblesInput.value, 10);
      const totales = parseInt(plazasTotalesInput.value, 10);
      if (!isNaN(disponibles) && !isNaN(totales) && disponibles > totales) {
        errorDiv.classList.remove('d-none');
      } else {
        errorDiv.classList.add('d-none');
      }
    }
    plazasDisponiblesInput.addEventListener('input', validarPlazas);
    plazasTotalesInput.addEventListener('input', validarPlazas);
  }
});