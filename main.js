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
    const alertContainer = document.getElementById('alert-container');

    console.log("Checkbox encontrado:", checkbox); // Para verificar si lo encuentra

    checkbox.addEventListener('change', function () {
        console.log("Checkbox cambiado, estado:", checkbox.checked);
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
});

