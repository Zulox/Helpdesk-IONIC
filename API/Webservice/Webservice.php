<?php   // for login fucntionality
// ##############config##############
	include("connect.php"); 

   $action = $_GET['action'];
	switch($_GET['action']){
		case 'login':
		loginStuff($data, $sqlconn);
        break;
	}
	
	
	
	
	function loginStuff($data, $sqlconn){
	
	    $username = $data->user_name; 
		$password = $data->pass_word;
		$access   = $data->access;
		
		//sample data from apps
		//$username =  "Ariff";
		//$password =  "1234qwer";
		//$access = "ADMIN";
		
		$dataquery = mysqli_query( $sqlconn,"SELECT * FROM user WHERE  User_Name = '$username' and User_Pass = '$password' and User_Access = '$access'");
		
		// Let's say everything is in order
		if(mysqli_num_rows($dataquery) >= 1){
		
		for ($set = array(); $row = $dataquery->fetch_assoc(); $set[] = $row);
			   
			$output = array('status' => true, 'ID' => $set[0]["User_ID"]  , 'NICK' => $set[0]["User_Nick"] , 'ACCESS' => $set[0]["User_Access"],  'STATUS' => $set[0]["User_Status"] );
		
		echo json_encode($output);
	
		}
		else{
			$output = array('status' => false );
			echo json_encode($output);
		
		}
	}
	
	
	mysqli_close($sqlconn);
	
	
?>