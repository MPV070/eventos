<?php
// Devuelve una conexión mysqli a la base de datos LyricMenu
function obtenerConexion() {
    // Configuración de la base de datos
    $host = "db";         // Cambia a "db" si usas Docker con ese nombre de servicio
    $usuario = "root";
    $password = "test";
    $baseDatos = "LyricMenu";

    // Crear conexión
    $conexion = new mysqli($host, $usuario, $password, $baseDatos);

    // Comprobar conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    // Establecer charset a utf8mb4 para compatibilidad total con emojis y caracteres especiales
    $conexion->set_charset("utf8mb4");

    return $conexion;
}
?>