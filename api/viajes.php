<?php
require_once('conexion.php');

try {
    // Obtener la conexión usando tu clase Database
    $db = Database::getInstance();
    $mysqli = $db->getConnection();
    
    // Consulta para obtener el conteo total de viajes
    $query = "SELECT COUNT(*) as total_viajes FROM viajes";
    $resultado = $mysqli->query($query);

    if ($resultado) {
        $fila = $resultado->fetch_assoc();
        echo number_format($fila['total_viajes'], 0, '.', ',');
    } else {
        echo "Error al contar viajes";
    }
} catch (Exception $e) {
    error_log("Error en viajes.php: " . $e->getMessage());
    echo "Error en el servidor";
}
?>