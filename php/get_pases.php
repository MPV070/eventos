<?php
include_once("config.php");
$conexion = obtenerConexion();

$evento_id = isset($_GET['evento_id']) ? intval($_GET['evento_id']) : 0;
if ($evento_id <= 0) {
    echo json_encode(['success' => false, 'message' => 'ID de evento no válido']);
    exit;
}

$sql = "SELECT p.id, p.evento_id, p.fecha, p.hora, p.plazas_disponibles, p.plazas_totales FROM pases p WHERE p.evento_id = $evento_id";
$result = mysqli_query($conexion, $sql);

$pases = [];
while ($row = mysqli_fetch_assoc($result)) {
    $pases[] = $row;
}

echo json_encode(['success' => true, 'pases' => $pases]);
mysqli_close($conexion);
?>