<?php
include_once("config.php");
$conexion = obtenerConexion();

// Obtener filtro por ID si existe
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Construir consulta SQL con filtro por ID
if ($id !== null && $id > 0) {
    $sql = "SELECT * FROM usuarios WHERE id = $id;";
} else {
    $sql = "SELECT * FROM usuarios;";
}

$resultado = mysqli_query($conexion, $sql);

if (!$resultado) {
    responder(null, true, "Error al obtener los usuarios", $conexion);
}

$usuarios = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $usuarios[] = $fila;
}

responder($usuarios, false, "Usuarios obtenidos correctamente", $conexion);

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
?>
