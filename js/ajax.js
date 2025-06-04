const rutbackend = "https://backend.example.com/api"

async function getEventos() {
    try {
        const response = await fetch(`${rutbackend}/eventos`);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos');
        }
        const eventos = await response.json();
        return eventos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function crearEvento(evento) {
    try {
        const response = await fetch(`${rutbackend}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(evento)
        });
        if (!response.ok) {
            throw new Error('Error al crear el evento');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}