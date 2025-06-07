<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger el id del usuario (puede ser por GET o POST, aquí GET)
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$datos = [];

if ($id > 0) {
    // Recuperar un usuario concreto por id
    $sql = "SELECT * FROM usuarios WHERE id = $id";
    $resultado = mysqli_query($conexion, $sql);
    if ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
        $mensaje = "Usuario recuperado correctamente";
        $error = false;
    } else {
        $mensaje = "Usuario no encontrado";
        $error = true;
    }
} else {
    // Recuperar todos los usuarios
    $sql = "SELECT * FROM usuarios";
    $resultado = mysqli_query($conexion, $sql);
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }
    $mensaje = "Usuarios recuperados correctamente";
    $error = false;
}

// Respuesta estándar
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

responder($datos, $error, $mensaje, $conexion);
?>