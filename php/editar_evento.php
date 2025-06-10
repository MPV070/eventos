<?php
// php/editar_evento.php
header('Content-Type: application/json');
include_once("config.php");
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $url_imagen = isset($_POST['url_imagen']) ? trim($_POST['url_imagen']) : '';
    $descripcion = isset($_POST['descripcion']) ? trim($_POST['descripcion']) : '';
    $ubicacion = isset($_POST['ubicacion']) ? trim($_POST['ubicacion']) : '';
    $precio = isset($_POST['precio']) ? floatval($_POST['precio']) : 0;

    if ($id <= 0 || empty($nombre) || empty($url_imagen) || empty($descripcion) || empty($ubicacion)) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
        exit;
    }

    $sql = "UPDATE eventos SET nombre = ?, url_imagen = ?, descripcion = ?, ubicacion = ?, precio = ? WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('ssssdi', $nombre, $url_imagen, $descripcion, $ubicacion, $precio, $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Evento actualizado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar evento.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
    }
    $conexion->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
