<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos del evento desde POST (esperando JSON en 'evento')
$evento = json_decode($_POST['evento']);

if (!$evento) {
    responder(null, true, "No se han recibido datos del evento", $conexion);
}
// Sanitizar y preparar los datos
$nombre = mysqli_real_escape_string($conexion, $evento->nombre);
$url_imagen = mysqli_real_escape_string($conexion, $evento->url_imagen);
$descripcion = mysqli_real_escape_string($conexion, $evento->descripcion);
$ubicacion = mysqli_real_escape_string($conexion, $evento->ubicacion);
$fecha = mysqli_real_escape_string($conexion, $evento->fecha);
$hora = mysqli_real_escape_string($conexion, $evento->hora);
$precio = floatval($evento->precio);
$plazas_totales = intval($evento->plazas_totales);
$plazas_disponibles = $plazas_totales;

// Insertar evento en la tabla 'eventos'
$sql = "INSERT INTO eventos (nombre, url_imagen, descripcion, ubicacion, fecha, hora, precio, plazas_disponibles, plazas_totales) VALUES ('$nombre', '$url_imagen', '$descripcion', '$ubicacion', '$fecha', '$hora', $precio, $plazas_disponibles, $plazas_totales);";

// Verificador/log para depuración
file_put_contents(__DIR__ . '/log_alta_eventos.txt', date('Y-m-d H:i:s') . "\nSQL: $sql\n", FILE_APPEND);

$result = mysqli_query($conexion, $sql);

if (!$result) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    file_put_contents(__DIR__ . '/log_alta_eventos.txt', date('Y-m-d H:i:s') . "\nERROR $numerror: $descrerror\n", FILE_APPEND);
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    file_put_contents(__DIR__ . '/log_alta_eventos.txt', date('Y-m-d H:i:s') . "\nINSERT OK\n", FILE_APPEND);
    responder(null, false, "Se ha dado de alta el evento correctamente", $conexion);
}

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
