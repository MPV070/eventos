<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger el id del evento desde POST (esperando 'id')
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id <= 0) {
    responder(null, true, "ID de evento no válido", $conexion);
}

// Eliminar el evento de la base de datos
$sql = "DELETE FROM eventos WHERE id = $id";
$result = mysqli_query($conexion, $sql);

if (!$result) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, true, "Error $numerror: $descrerror", $conexion);
} else {
    responder(null, false, "Evento eliminado correctamente", $conexion);
}

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
?>