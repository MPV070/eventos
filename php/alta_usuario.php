<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos del usuario desde POST (esperando JSON en 'usuario')
$usuario = json_decode($_POST['usuario']);
// var_dump($_POST['componente']); // <-- ELIMINADO

if (!$usuario) {
    responder(null, true, "No se han recibido datos del usuario", $conexion);
}
// Sanitizar y preparar los datos
$nombre = mysqli_real_escape_string($conexion, $usuario->nombre);
$correo = mysqli_real_escape_string($conexion, $usuario->correo);
$contraseña = mysqli_real_escape_string($conexion, $usuario->contraseña);
$tipo_usuario_id = intval($usuario->tipo_usuario_id);

// Insertar usuario en la tabla 'usuarios'
$sql = "INSERT INTO usuarios VALUES (null, '$nombre', '$correo', '$contraseña', $tipo_usuario_id);";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    responder(null, false, "Se ha dado de alta el usuario correctamente", $conexion);
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
?>