<?php	//configs
	header('content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");

	
	$sqlconn = mysqli_connect('localhost', 'root', '' , 'mobiradeon') or die(mysqli_error());
	$data = json_decode(file_get_contents("php://input")); 

?>