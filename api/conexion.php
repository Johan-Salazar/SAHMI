<?php
class Database {
    private static $instance = null;
    private $connection;
    
    private function __construct() {
        $this->connection = new mysqli(
            'localhost', 
            'root', 
            '', 
            'db_sahmi'
        );
        
        if ($this->connection->connect_errno) {
            error_log("Error de conexión: " . $this->connection->connect_error);
            throw new Exception("Error en el servidor");
        }
        
        $this->connection->set_charset("utf8mb4");
    }
    
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    public function __destruct() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
}

// Uso:
// $db = Database::getInstance()->getConnection();
?>