<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once("config.php");
$conexion = obtenerConexion();

// Obtener todos los eventos
$sql = "SELECT * FROM eventos;";
$resultado = mysqli_query($conexion, $sql);

if (!$resultado) {
    responder(null, true, "Error al obtener los eventos", $conexion);
}

$eventos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $eventos[] = $fila;
}

responder($eventos, false, "Eventos obtenidos correctamente", $conexion);

// Función de respuesta estándar
function responder($datos, $error, $mensaje, $conexion) {
    header('Content-Type: application/json');
    echo json_encode([
        "datos" => $datos,
        "error" => $error,
        "mensaje" => $mensaje
    ]);
    mysqli_close($conexion);
    exit;
}
