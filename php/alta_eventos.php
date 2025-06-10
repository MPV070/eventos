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
$precio = floatval($evento->precio);

// Insertar evento en la tabla 'eventos' (sin fecha, hora ni plazas)
$sql = "INSERT INTO eventos (nombre, url_imagen, descripcion, ubicacion, precio) VALUES ('$nombre', '$url_imagen', '$descripcion', '$ubicacion', $precio);";

// Verificador/log para depuración
file_put_contents(__DIR__ . '/log_alta_eventos.txt', date('Y-m-d H:i:s') . "\nSQL: $sql\n", FILE_APPEND);

$result = mysqli_query($conexion, $sql);

if (!$result) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Aquí podrías devolver el id del evento para que luego se creen los pases asociados
    responder(mysqli_insert_id($conexion), false, "Se ha dado de alta el evento correctamente", $conexion);
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
