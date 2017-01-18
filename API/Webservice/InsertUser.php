<?php // for user to request of posting new ticket
		include("connect.php"); 
		

		$username = $data->username; 
     	$password = $data->password;
		$display = $data->display;
		
		//Sample data from apps
	//	$username = "Aliusop"; 
	//	$password = "usop123";
	//	$display = "usop sontorian";
	
		
		
		
	$dataquery = mysqli_query( $sqlconn,"SELECT * FROM user WHERE  User_Name = '$username'");
	if(mysqli_num_rows($dataquery) >= 1){
		$output = array('ID' => 0 ,
						'status' => "taken"
				  );
	}
	else{
		
	
		$result = mysqli_query( $sqlconn,"INSERT INTO user (User_ID, User_Name, User_Pass, User_Nick , User_Access ,  User_Status ) 
		VALUES (NULL,'$username','$password','$display', 'USER' , NULL );");
		$last_id = mysqli_insert_id($sqlconn);
			
		if( $result){
		$output = array('ID' => $last_id ,
						'status' => true
				  );
		}
		else{
		$output = array('ID' => 0 ,
						'status' => false
				  );
		}
	
	echo json_encode($output);
	}	
	mysqli_close($sqlconn);
?>