<?php
include_once("config.php");
$conexion = obtenerConexion();

$pase_id = isset($_POST['pase_id']) ? intval($_POST['pase_id']) : 0;
$usuario_correo = isset($_POST['usuario_correo']) ? trim($_POST['usuario_correo']) : '';
$usuario_pass = isset($_POST['usuario_pass']) ? trim($_POST['usuario_pass']) : '';

if ($pase_id <= 0 || empty($usuario_correo) || empty($usuario_pass)) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

// Validar usuario por correo y contraseña
$sql = "SELECT id FROM usuarios WHERE correo = ? AND contraseña = ?";
$stmt = $conexion->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en la consulta de usuario']);
    exit;
}
$stmt->bind_param('ss', $usuario_correo, $usuario_pass);
$stmt->execute();
$stmt->bind_result($usuario_id);
$stmt->fetch();
$stmt->close();

if (empty($usuario_id)) {
    echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos']);
    exit;
}

// Verificar plazas disponibles
$sql = "SELECT plazas_disponibles FROM pases WHERE id = $pase_id";
$res = mysqli_query($conexion, $sql);
$row = mysqli_fetch_assoc($res);
if (!$row || $row['plazas_disponibles'] <= 0) {
    echo json_encode(['success' => false, 'message' => 'No hay plazas disponibles']);
    exit;
}

// Insertar reserva
$sql = "INSERT INTO reservas (usuario_id, pase_id) VALUES ($usuario_id, $pase_id)";
if (mysqli_query($conexion, $sql)) {
    // Actualizar plazas
    mysqli_query($conexion, "UPDATE pases SET plazas_disponibles = plazas_disponibles - 1 WHERE id = $pase_id");
    echo json_encode(['success' => true, 'message' => 'Reserva realizada con éxito']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al reservar']);
}
mysqli_close($conexion);
?>