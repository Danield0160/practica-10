<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST"); 
header("Access-Control-Allow-Headers: Content-Type");

// $_GET['q']

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    
    $servername = "localhost";
    $username = "practica_10_user_DRM";
    $password = "password";
    $dbname = "practica_10_DRM";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = 'SELECT * FROM productos;';
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
      // output data of each row
        $resultado = [];
        while($row = $result->fetch_assoc()) {
            $resultado[] = $row;
        }
        echo json_encode($resultado);
    } else {
        echo json_encode([]);
    }
    $conn->close();



//TODO: Apartado de login y registro
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {



    $servername = "localhost";
    $username = "practica_10_user_DRM";
    $password = "password";
    $dbname = "practica_10_DRM";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "INSERT INTO usuarios (nombre,apellidos,dni,nacimiento,postal,email,fijo,movil,iban,credito,password,password_repeat) VALUES(" .'"'. $_POST['nombre'] .'",' .'"'. $_POST['apellidos'] .'",'.'"'. $_POST['dni'] .'",'.'"'. $_POST['nacimiento'] .'",'.'"'. $_POST['postal'] .'",'.'"'. $_POST['email'] .'",'.'"'.$_POST['fijo'] .'",'.'"'.$_POST['movil'] .'",'.'"'.$_POST['iban'] .'",'.'"'.$_POST['credito'] .'",'.'"'.$_POST['password'] .'",'.'"'.$_POST['password_repeat'] .'"'.   ")";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();


}



?> 