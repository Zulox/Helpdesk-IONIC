<?php   // for account handdling change pass or name etc
// ##############config##############
	include("connect.php"); 

   $action = $_GET['action'];
	switch($_GET['action']){
		case 'Name':
		NameStuff($data, $sqlconn);
        break;
		case 'Pass':
		PassStuff($data, $sqlconn);
        break;
		case 'Status':
		StatusStuff($data, $sqlconn);
        break;			
	}
	
	
	
	
	function NameStuff($data, $sqlconn){
	
	    $userID = $data->user_ID; 
		$Newname = $data->newname;
	
		
		//sample data from apps
		//$userID =  "1003";
		//$Newname =  "Kylo Ren";

		
			$result = mysqli_query( $sqlconn,"UPDATE `mobiradeon`.`user` SET `User_Nick` = '$Newname' WHERE `User_ID` = '$userID';");

	
			if( $result){
				$output = array('status' => true);
			}
			else{
				$output = array('status' => false);
			}
			
			echo json_encode($output);
		
	
	}
	
	function PassStuff($data, $sqlconn){
	
	    $userID = $data->user_ID; 
		$Oldpass = $data->oldpass;
		$Newpass = $data->newpass;
		$check1 = 0;

		$dataquery = mysqli_query( $sqlconn,"SELECT * FROM user WHERE  User_ID = '$userID' and User_Pass = '$Oldpass'");
		
		if(mysqli_num_rows($dataquery) >= 1){
		$check1 = 1;
		$result = mysqli_query( $sqlconn,"UPDATE `mobiradeon`.`user` SET `User_Pass` = '$Newpass' WHERE `User_ID` = '$userID';");
	
		}

			if( $check1 == 1){
				$output = array('status' => true);
			}
			else{
				$output = array('status' => false);
			}
			
			echo json_encode($output);

	
	}
	
		function StatusStuff($data, $sqlconn){
	
	    $userID = $data->user_ID; 
		$Newstatus = $data->newstatus;
	
		
		//sample data from apps
		//$userID =  "1003";
		//$Newname =  "Kylo Ren";

		
			$result = mysqli_query( $sqlconn,"UPDATE `mobiradeon`.`user` SET `User_Status` = '$Newstatus' WHERE `User_ID` = '$userID';");

	
			if( $result){
				$output = array('status' => true);
			}
			else{
				$output = array('status' => false);
			}
			
			echo json_encode($output);
		
	
	}
	
	
	mysqli_close($sqlconn);
	
	
?>