// Mostrar eventos en tabla (si existe)
document.addEventListener('DOMContentLoaded', async function () {
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
                // Intenta crear un objeto Date
                const dateObj = new Date(fechaFormateada);
                if (!isNaN(dateObj)) {
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = dateObj.getFullYear();
                    fechaFormateada = `${day}/${month}/${year}`;
                }
            }
            tbody.innerHTML += `
                <tr>
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
                        <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i> Eliminar</button>
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
                                <button class="btn btn-danger btn-sm mt-2"><i class="bi bi-trash"></i> Eliminar</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="11">No hay eventos en la base de datos.</td></tr>`;
    }
});
