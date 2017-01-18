<?php // for user to request of posting new ticket
		include("connect.php"); 
		
	    $Status = "NEW";
		$currenttime = date('Y-m-d H:i:s');
		$Tic_sub = $data->Tic_sub; 
		$Tic_body = $data->Tic_body;
		$UserID = $data->user_ID;
		
		//Sample data from apps
		//$Tic_sub = "Cannot Connect"; 
		//$Tic_body = "we sometimes i cannot connect to this this this and this???";
		//$UserID = "1001";
	
		
		
		
		
	
		
	
		$result = mysqli_query( $sqlconn,"INSERT INTO ticket (TIC_ID, TIC_Status, TIC_Date, TIC_Subject , TIC_Body ,  User_ID , Admin_ID) 
		VALUES (NULL,'$Status','$currenttime','$Tic_sub', '$Tic_body' , '$UserID ' , NULL );");
		
		
	if( $result){
		$output = array('status' => true);
	}
	else{
		$output = array('status' => false);
	}
	
	echo json_encode($output);
		
	mysqli_close($sqlconn);
?>