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
    #precio;

    constructor(id, nombre, url_imagen, descripcion, ubicacion, precio) {
        this.#id = id;
        this.#nombre = nombre;
        this.#url_imagen = url_imagen;
        this.#descripcion = descripcion;
        this.#ubicacion = ubicacion;
        this.#precio = precio;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get url_imagen() { return this.#url_imagen; }
    get descripcion() { return this.#descripcion; }
    get ubicacion() { return this.#ubicacion; }
    get precio() { return this.#precio; }

    set id(id) { this.#id = id; }
    set nombre(nombre) { this.#nombre = nombre; }
    set url_imagen(url_imagen) { this.#url_imagen = url_imagen; }
    set descripcion(descripcion) { this.#descripcion = descripcion; }
    set ubicacion(ubicacion) { this.#ubicacion = ubicacion; }
    set precio(precio) { this.#precio = precio; }

    toJSON() {
        return {
            id: this.#id,
            nombre: this.#nombre,
            url_imagen: this.#url_imagen,
            descripcion: this.#descripcion,
            ubicacion: this.#ubicacion,
            precio: this.#precio
        };
    }

    static fromFormFields({nombre, url_imagen, descripcion, ubicacion, precio}) {
        return new Evento(null, nombre, url_imagen, descripcion, ubicacion, precio);
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