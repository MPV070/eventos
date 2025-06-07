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
                <button type="button" class="btn btn-lg btn-bd-cards mt-auto" data-bs-toggle="popover" data-bs-trigger="focus" title="Pases" data-bs-content="<strong>Pase:</strong> ${formateaFecha(evento.fecha)} ${evento.hora}">Más información</button>
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

