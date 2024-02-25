<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST"); 
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'GET' &&  $_GET['modo']== "productos") {

    
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
    $result_prod = $conn->query($sql);

    $sql = 'SELECT * FROM productos_info;';
    $result_info = $conn->query($sql);
    
    if ($result_prod->num_rows > 0) {
      // output data of each row
        $resultado_prod = [];
        while($row = $result_prod->fetch_assoc()) {
            $resultado_prod[] = $row;
        }

        $resultado_info = [];
        while($row = $result_info->fetch_assoc()) {
            $resultado_info[] = $row;
        }

        echo json_encode(array("productos"=>$resultado_prod,"info"=>$resultado_info));
    } else {
        echo json_encode([]);
    }
    $conn->close();




} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['modo'] ==  "registro") {



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
    
    $sql = "INSERT INTO usuarios (nombre,fecha_nacimiento,passw,correo,banco,telefono) VALUES(" .'"'. $_POST['nombre'] .'",' .'"'. $_POST['fecha'] .'",'.'"'. $_POST['passw'] .'",'.'"'. $_POST['correo'] .'",'.'"'. $_POST['banco'] .'","'. $_POST['telefono'] .'"'.  ")";
    
    if ($conn->query($sql) === TRUE) {
        echo True;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();


}elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['modo'] ==  "login") {



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
    
    $sql = "select * from usuarios where correo='".$_POST['correo']."' and passw='".$_POST['passw']."';";
    $result = $conn->query($sql)->fetch_assoc();
    if ($result) {
        // echo json_encode($result->fetch_assoc());
        echo true;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();


}elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['modo'] ==  "comprar") {



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

    $datos = $_POST["datos"];
    for ($i=0; $i < count($datos); $i++) { 
        echo json_encode($datos[array_keys($datos)[$i]]);
        
        $cantidad = $datos[array_keys($datos)[$i]]['cantidad'];
        $id = $datos[array_keys($datos)[$i]]['id'] +1;
        $sql = "update productos set disponibilidad = disponibilidad - $cantidad where id = $id;";
        
        
        $result = $conn->query($sql);
        if ($result) {
            // echo json_encode($result->fetch_assoc());
            echo true;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    
    $conn->close();


}



?> 