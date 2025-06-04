<?php
// config.php

// Configuración de la base de datos
define('DB_HOST', 'localhost'); // o la IP/host de tu servidor MySQL
define('DB_NAME', 'LyricMenu'); // nombre de la base de datos según tu SQL
define('DB_USER', 'root');      // tu usuario de MySQL (por defecto suele ser 'root')
define('DB_PASS', 'test');          // tu contraseña de MySQL (vacía por defecto en XAMPP/MAMP)

// Conexión a la base de datos usando PDO
try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
        DB_USER,
        DB_PASS
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Error de conexión: ' . $e->getMessage());
}
?>