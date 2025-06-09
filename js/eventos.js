// --- Función para cargar y renderizar la tabla de eventos ---
async function cargarYRenderizarEventos() {
    const tbody = document.getElementById('eventos-tbody');
    if (!tbody) return;

    const response = await fetch('php/get_eventos.php');
    const data = await response.json();

    if (data && Array.isArray(data.datos)) {
        tbody.innerHTML = '';
        data.datos.forEach((evento, idx) => {
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
                    <td class="d-none d-sm-table-cell">${evento.plazas_disponibles}</td>
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
                                <strong>Plazas disponibles:</strong> ${evento.plazas_disponibles}<br>
                                <button class="btn btn-primary btn-sm mt-2"><i class="bi bi-pencil"></i> Editar</button>
                                <button class="btn btn-danger btn-sm mt-2 btn-eliminar-evento"><i class="bi bi-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>`;
        });
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
    } else {
        tbody.innerHTML = `<tr><td colspan="11">No hay eventos en la base de datos.</td></tr>`;
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
  if (!inputBusqueda) return;

  let eventosCache = [];

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
          <td class="d-none d-sm-table-cell">${evento.plazas_disponibles}</td>
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
                <strong>Plazas disponibles:</strong> ${evento.plazas_disponibles}<br>
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