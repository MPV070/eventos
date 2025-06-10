document.addEventListener('DOMContentLoaded', function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            html: true
        });
    });
});



var myCarousel = document.getElementById('myCarousel');

if (myCarousel) {
    myCarousel.addEventListener('slid.bs.carousel', function () {
        const carouselElement = document.querySelector('#carouselExampleIndicators');
        new bootstrap.Carousel(carouselElement, {
            nextWhenVisible: true 
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('organizadorEventos');
    const alertContainer = document.getElementById('alert_container');

    if (checkbox && alertContainer) {
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                alertContainer.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">¿Estás seguro?</h4>
                        <p>Marcar esta casilla te permitirá crear eventos, pero no te permitirá añadir participantes a los eventos usando este correo.</p>
                        <hr>
                        <p class="mb-0">Si representa a una empresa, institución educativa o grupo y desea registrar una cuenta, puede hacerlo accediendo a 
                        <a href="https://example.com" target="_blank">este enlace</a>.</p>
                    </div>
                `;
            } else {
                alertContainer.innerHTML = '';
            }
        });
    }
});


// Cargar cards de eventos dinámicamente
window.addEventListener('DOMContentLoaded', async function () {
  const row = document.getElementById('eventos-cards-row');
  if (!row) return;
  try {
    const response = await fetch('php/get_eventos.php');
    const data = await response.json();
    if (data && Array.isArray(data.datos) && data.datos.length > 0) {
      row.innerHTML = '';
      // Mostrar todos los eventos
      data.datos.forEach(evento => {
        row.innerHTML += `
          <div class="col-md-4 d-flex">
            <div class="card h-100 d-flex flex-column">
              <img src="${evento.url_imagen}" class="card-img-top" alt="${evento.nombre}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${evento.nombre}</h5>
                <p class="card-text">${evento.descripcion}</p>
                <button type="button" class="btn btn-lg btn-bd-cards mt-auto" data-bs-toggle="popover" data-bs-trigger="manual" title="Más información" data-bs-html="true" data-bs-content="" onclick="mostrarPopoverMasInfo(this, ${evento.id})">Más información</button>
                <button type="button" class="btn btn-bd-cards btn-secondary mt-2" onclick="mostrarPopoverPases(this, ${evento.id})">Pases</button>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      row.innerHTML = '<div class="col-12"><div class="alert alert-warning">No hay eventos para mostrar.</div></div>';
    }
  } catch (e) {
    row.innerHTML = '<div class="col-12"><div class="alert alert-danger">Error al cargar los eventos.</div></div>';
  }
  // Inicializar popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl, { html: true });
  });
});

// Función para formatear la fecha a dd/mm/yyyy
function formateaFecha(fecha) {
  if (!fecha) return '';
  const dateObj = new Date(fecha);
  if (isNaN(dateObj)) return fecha;
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

// --- NUEVO: Popover de más información con ubicación, precio y plazas ---
window.mostrarPopoverMasInfo = async function(btn, eventoId) {
  // Cerrar cualquier popover abierto en la página
  document.querySelectorAll('[data-popover-visible="true"]').forEach(el => {
    if (el._popoverInstance) {
      el._popoverInstance.hide();
      el.removeAttribute('data-popover-visible');
      el._popoverInstance = null;
    }
  });
  // Obtener los datos del evento por AJAX
  const res = await fetch('php/get_eventos.php?id=' + eventoId);
  const data = await res.json();
  let content = '';
  if (data.datos && data.datos.length > 0) {
    const evento = data.datos[0];
    content = `<div><strong>Ubicación:</strong> ${evento.ubicacion}<br><strong>Precio:</strong> ${evento.precio} €</div>`;
  } else {
    content = '<span class="text-danger">No se encontró el evento</span>';
  }
  // Crear el popover
  const popover = new bootstrap.Popover(btn, {
    content: content,
    html: true,
    trigger: 'manual',
    placement: 'bottom',
    container: 'body'
  });
  popover.show();
  btn.setAttribute('data-popover-visible', 'true');
  // Cerrar el popover solo al hacer clic fuera
  const onDocClick = (e) => {
    const popoverEl = document.querySelector('.popover');
    if (!popoverEl) return;
    if (!popoverEl.contains(e.target) && !btn.contains(e.target)) {
      if (btn._popoverInstance) {
        btn._popoverInstance.hide();
        btn.removeAttribute('data-popover-visible');
        btn._popoverInstance = null;
      }
      document.removeEventListener('mousedown', onDocClick);
    }
  };
  setTimeout(() => {
    document.addEventListener('mousedown', onDocClick);
  }, 0);
}

// Función para mostrar el popover de pases disponibles
window.mostrarPopoverPases = async function(btn, eventoId) {
    // Cerrar cualquier popover abierto en la página
    document.querySelectorAll('[data-popover-visible="true"]').forEach(el => {
        if (el._popoverInstance) {
            el._popoverInstance.hide();
            el.removeAttribute('data-popover-visible');
            el._popoverInstance = null;
        }
    });

    // Obtener los pases del evento por AJAX
    const res = await fetch(`php/get_pases.php?evento_id=${eventoId}`);
    const data = await res.json();
    let pases = [];
    let content = '';

    // Soporta ambos formatos: array (data.pases) o objeto único (data.pase)
    if (data.success) {
        if (Array.isArray(data.pases)) {
            pases = data.pases;
        } else if (data.pase) {
            pases = [data.pase];
        }
    }

    if (pases.length > 0) {
        // Generar la lista de pases con fecha y hora
        content = '<ul class="list-group list-group-flush">';
        pases.forEach(pase => {
            console.log('Renderizando pase:', pase); // DEBUG
            if (pase.id) { // solo si el id existe
                // Asegura que data-pase-id es exactamente igual al id del pase (como string)
                const paseIdStr = String(pase.id);
                console.log('Generando botón con ID:', paseIdStr); // NUEVO DEBUG
                content += `<li class='list-group-item p-1'>
                    <a class="btn btn-outline-primary btn-sm w-100 d-block mb-1 pase-popover-btn" data-pase-id="${paseIdStr}">
                        ${formateaFecha(pase.fecha)} - ${pase.hora}
                    </a>
                </li>`;
            }
        });
        content += '</ul>';
    } else {
        content = '<span class="text-danger">No hay pases disponibles</span>';
    }

    // Crear el popover
    const popover = new bootstrap.Popover(btn, {
        content: content,
        html: true,
        trigger: 'manual',
        placement: 'bottom',
        container: 'body'
    });
    popover.show();
    btn.setAttribute('data-popover-visible', 'true');
    btn._popoverInstance = popover;

    // NUEVO: Asignar handler directamente a los botones del popover
    setTimeout(() => {
        const popoverEl = document.querySelector('.popover.show');
        if (popoverEl) {
            popoverEl.querySelectorAll('.pase-popover-btn').forEach(el => {
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const paseId = this.getAttribute('data-pase-id');
                    console.log('Click en pase-popover-btn (directo):', this); // DEBUG
                    console.log('data-pase-id:', paseId); // DEBUG
                    if (paseId && paseId !== 'null' && paseId !== '') {
                        window.abrirModalReserva(paseId);
                    } else {
                        alert('Error: No se ha podido obtener el ID del pase.');
                        console.error('data-pase-id no válido:', paseId, this);
                    }
                });
            });
        }
    }, 0);

    // Manejo del cierre del popover al hacer clic fuera
    const onDocClick = (e) => {
        const popoverEl = document.querySelector('.popover');
        if (!popoverEl) return;
        if (!popoverEl.contains(e.target) && !btn.contains(e.target)) {
            if (btn._popoverInstance) {
                btn._popoverInstance.hide();
                btn.removeAttribute('data-popover-visible');
                btn._popoverInstance = null;
            }
            document.removeEventListener('mousedown', onDocClick);
        }
    };

    setTimeout(() => {
        document.addEventListener('mousedown', onDocClick);
    }, 0);
};

// Función para abrir el modal de reserva y pasar el pase seleccionado
function abrirModalReserva(paseId) {
  console.log('abrirModalReserva called with paseId:', paseId);
  // Cerrar cualquier popover abierto antes de mostrar el modal
  document.querySelectorAll('[data-popover-visible="true"]').forEach(el => {
    if (el._popoverInstance) {
      el._popoverInstance.hide();
      el.removeAttribute('data-popover-visible');
      el._popoverInstance = null;
    }
  });
  const paseInput = document.getElementById('paseIdReserva');
  if (!paseInput) {
    alert('Error: No se encontró el campo oculto para el ID del pase.');
    return;
  }
  paseInput.value = paseId;
  const msgDiv = document.getElementById('reservaMensaje');
  if (msgDiv) msgDiv.innerHTML = '';
  var modalEl = document.getElementById('modalRegistroReserva');
  if (!modalEl) {
    alert('Error: No se encontró el modal de reserva.');
    return;
  }
  var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
  setTimeout(() => {
    console.log('Modal visible?', modalEl.classList.contains('show'), 'clases:', modalEl.className);
  }, 500);
}
window.abrirModalReserva = abrirModalReserva;

// Enviar reserva por AJAX
if (document.getElementById('formReservaPase')) {
  document.getElementById('formReservaPase').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pase_id = document.getElementById('paseIdReserva').value;
    const usuario_correo = document.getElementById('usuarioCorreoReserva').value;
    const usuario_pass = document.getElementById('usuarioPassReserva').value;
    const formData = new FormData();
    formData.append('pase_id', pase_id);
    formData.append('usuario_correo', usuario_correo);
    formData.append('usuario_pass', usuario_pass);
    const resp = await fetch('php/reserva_pase.php', {method: 'POST', body: formData});
    const data = await resp.json();
    const msgDiv = document.getElementById('reservaMensaje');
    msgDiv.innerHTML = `<div class='alert ${data.success ? 'alert-success' : 'alert-danger'}'>${data.message}</div>`;
    if (data.success) setTimeout(()=>location.reload(), 1500);
  });
}

