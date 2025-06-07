class Usuario {
    #id;
    #nombre;
    #correo;
    #contraseña;
    #tipo_usuario_id;

    constructor(id, nombre, correo, contraseña, tipo_usuario_id) {
        this.#id = id;
        this.#nombre = nombre;
        this.#correo = correo;
        this.#contraseña = contraseña;
        this.#tipo_usuario_id = tipo_usuario_id;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get correo() { return this.#correo; }
    get contraseña() { return this.#contraseña; }
    get tipo_usuario_id() { return this.#tipo_usuario_id; }

    set id(id) { this.#id = id; }
    set nombre(nombre) { this.#nombre = nombre; }
    set correo(correo) { this.#correo = correo; }
    set contraseña(contraseña) { this.#contraseña = contraseña; }
    set tipo_usuario_id(tipo_usuario_id) { this.#tipo_usuario_id = tipo_usuario_id; }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            correo: this.#correo,
            contraseña: this.#contraseña,
            tipo_usuario_id: this.#tipo_usuario_id
        };
    }
}

class Evento {
    #id;
    #nombre;
    #url_imagen;
    #descripcion;
    #ubicacion;
    #fecha;
    #hora;
    #precio;
    #plazas_disponibles;
    #plazas_totales;

    constructor(id, nombre, url_imagen, descripcion, ubicacion, fecha, hora, precio, plazas_disponibles, plazas_totales) {
        this.#id = id;
        this.#nombre = nombre;
        this.#url_imagen = url_imagen;
        this.#descripcion = descripcion;
        this.#ubicacion = ubicacion;
        this.#fecha = fecha;
        this.#hora = hora;
        this.#precio = precio;
        this.#plazas_disponibles = plazas_disponibles;
        this.#plazas_totales = plazas_totales;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get url_imagen() { return this.#url_imagen; }
    get descripcion() { return this.#descripcion; }
    get ubicacion() { return this.#ubicacion; }
    get fecha() { return this.#fecha; }
    get hora() { return this.#hora; }
    get precio() { return this.#precio; }
    get plazas_disponibles() { return this.#plazas_disponibles; }
    get plazas_totales() { return this.#plazas_totales; }

    set id(id) { this.#id = id; }
    set nombre(nombre) { this.#nombre = nombre; }
    set url_imagen(url_imagen) { this.#url_imagen = url_imagen; }
    set descripcion(descripcion) { this.#descripcion = descripcion; }
    set ubicacion(ubicacion) { this.#ubicacion = ubicacion; }
    set fecha(fecha) { this.#fecha = fecha; }
    set hora(hora) { this.#hora = hora; }
    set precio(precio) { this.#precio = precio; }
    set plazas_disponibles(plazas_disponibles) { this.#plazas_disponibles = plazas_disponibles; }
    set plazas_totales(plazas_totales) { this.#plazas_totales = plazas_totales; }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            url_imagen: this.#url_imagen,
            descripcion: this.#descripcion,
            ubicacion: this.#ubicacion,
            fecha: this.#fecha,
            hora: this.#hora,
            precio: this.#precio,
            plazas_disponibles: this.#plazas_disponibles,
            plazas_totales: this.#plazas_totales
        };
    }
}

class GestorEventos {
    // Alta de usuario
    async altaUsuario(oUsuario) {
        let datos = new FormData();
        datos.append("usuario", JSON.stringify(oUsuario));
        let respuesta = await fetch("php/alta_usuario.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Modificar usuario
    async modificarUsuario(oUsuario) {
        let datos = new FormData();
        datos.append("usuario", JSON.stringify(oUsuario));
        let respuesta = await fetch("php/modificar_usuario.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Borrar usuario
    async borrarUsuario(idUsuario) {
        let datos = new FormData();
        datos.append("id", idUsuario);
        let respuesta = await fetch("php/borrar_usuario.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Obtener todos los usuarios
    async getUsuarios() {
        let respuesta = await fetch("php/get_usuarios.php");
        return await respuesta.json();
    }

    // Buscar usuario por ID
    async buscarUsuario(idUsuario) {
        let datos = new FormData();
        datos.append("id", idUsuario);
        let respuesta = await fetch("php/buscar_usuario.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Alta de evento
    async altaEvento(oEvento) {
        let datos = new FormData();
        datos.append("evento", JSON.stringify(oEvento));
        let respuesta = await fetch("php/alta_evento.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Modificar evento
    async modificarEvento(oEvento) {
        let datos = new FormData();
        datos.append("evento", JSON.stringify(oEvento));
        let respuesta = await fetch("php/modificar_evento.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Borrar evento
    async borrarEvento(idEvento) {
        let datos = new FormData();
        datos.append("id", idEvento);
        let respuesta = await fetch("php/borrar_evento.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }

    // Obtener todos los eventos
    async getEventos() {
        let respuesta = await fetch("php/get_eventos.php");
        return await respuesta.json();
    }

    // Buscar evento por ID
    async buscarEvento(idEvento) {
        let datos = new FormData();
        datos.append("id", idEvento);
        let respuesta = await fetch("php/buscar_evento.php", {
            method: "POST",
            body: datos
        });
        return await respuesta.json();
    }
}