<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once("config.php");
$conexion = obtenerConexion();

// Obtener filtros de precio si existen
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$precio_min = isset($_GET['precio_min']) ? floatval($_GET['precio_min']) : null;
$precio_max = isset($_GET['precio_max']) ? floatval($_GET['precio_max']) : null;

// Construir consulta SQL con filtros SOLO para los campos generales
$sql = "SELECT id, nombre, url_imagen, descripcion, ubicacion, precio FROM eventos WHERE 1=1";
if ($id !== null && $id > 0) {
    $sql .= " AND id = " . $id;
} else {
    if ($precio_min !== null && $precio_min !== '') {
        $sql .= " AND precio >= " . $precio_min;
    }
    if ($precio_max !== null && $precio_max !== '') {
        $sql .= " AND precio <= " . $precio_max;
    }
}
$sql .= ";";

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
