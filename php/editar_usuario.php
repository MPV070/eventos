<?php
// php/editar_usuario.php
header('Content-Type: application/json');
include_once("config.php");
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $correo = isset($_POST['correo']) ? trim($_POST['correo']) : '';
    $tipo_usuario_id = isset($_POST['tipo_usuario_id']) ? intval($_POST['tipo_usuario_id']) : 1;

    if ($id <= 0 || empty($nombre) || empty($correo)) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
        exit;
    }

    $sql = "UPDATE usuarios SET nombre = ?, correo = ?, tipo_usuario_id = ? WHERE id = ?";
    $stmt = $conexion->prepare($sql);
    if ($stmt) {
        $stmt->bind_param('ssii', $nombre, $correo, $tipo_usuario_id, $id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Usuario actualizado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar usuario.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
    }
    $conexion->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
