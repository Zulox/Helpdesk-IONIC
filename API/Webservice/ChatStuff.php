<?php // for listing of people available for chat? 
// ##############config##############
		include("connect.php"); 


	$check = 0;
	$access   = $data->access;
	$ME = $data->ME;
	//sample data from apps
	// $access = "USER"    or $access = "ADMIN"
	// $ME = 1001     <--|| user id
	

	if($access == "USER"){
				$dataquery = mysqli_query( $sqlconn,"SELECT * FROM user WHERE  User_Access = 'ADMIN'");
			
				if(mysqli_num_rows($dataquery) >= 1){
				$check = 1;
					while($row = mysqli_fetch_assoc($dataquery)) {
						   
						$output = array('User_ID' => $row["User_ID"],
										'User_Name' => $row["User_Nick"],
										'User_Status' => $row["User_Status"],
										);
					   
						 $results[] = $output;
				
					}
			
				}	
	}
	
	
		if($access == "ADMIN"){
				$dataquery = mysqli_query( $sqlconn,"SELECT * FROM user WHERE  User_Access = 'USER'");
			
				if(mysqli_num_rows($dataquery) >= 1){
				$check = 1;
					while($row = mysqli_fetch_assoc($dataquery)) {
						   
						$output = array('User_ID' => $row["User_ID"],
										'User_Name' => $row["User_Nick"],
										'User_Status' => $row["User_Status"],
										);
					   
						 $results[] = $output;
				
					}
			
				}	
	}
		

	if($check == 1){		
	echo json_encode($results);
	}
	else
	{
	$output = array('gotdata' => false);
	echo json_encode($output);
	}
	
	mysqli_close($sqlconn);
	
?>