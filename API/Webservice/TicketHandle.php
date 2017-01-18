
<?php
  //handle several function of admin, to handle a ticket or mark solve a ticket
  // count is the listing of numbers in ticketdashboard
	include("connect.php"); 
	

	 $action = $_GET['action'];
		switch($_GET['action']){
		case 'Handle':
		HandleStuff($data,$sqlconn);
        break;
		case 'Solve':
		SolveStuff($data,$sqlconn);
        break;
		case 'Count':
		CountStuff($data,$sqlconn);
        break;

		
	}
	
	

	
	function  HandleStuff($data, $sqlconn){
	
	$TicketID = $data->ticID;
	$sender = $data->user_ID;
	
	//$TicketID = "1009";
	//$sender = "1001";
	
			$result = mysqli_query( $sqlconn,"UPDATE `mobiradeon`.`ticket` SET `TIC_Status` = 'PENDING',  `Admin_ID` = '$sender' WHERE `ticket`.`TIC_ID` = '$TicketID';");

	
			if( $result){
				$output = array('status' => true);
			}
			else{
				$output = array('status' => false);
			}
			
			echo json_encode($output);
		
	
	}
	function  SolveStuff($data, $sqlconn){
	
	$TicketID = $data->ticID;
	$sender = $data->user_ID;
	
	//$TicketID = "1009";
	//$sender = "1001";
	
			$result = mysqli_query( $sqlconn,"UPDATE `mobiradeon`.`ticket` SET `TIC_Status` = 'SOLVED' WHERE `ticket`.`TIC_ID` = '$TicketID';");

	
			if( $result){
				$output = array('status' => true);
			}
			else{
				$output = array('status' => false);
			}
			
			echo json_encode($output);
		
	
	}	
	
		function  CountStuff($data, $sqlconn){
		
		$sender = $data->user_ID;
		$acz =  $data->acs;
		
		$NEWt = 0;
		$Pending = 0;
		$OPending = 0;
		$solved =0;
		
		$dataquery = mysqli_query( $sqlconn,"SELECT * FROM ticket");
		if(mysqli_num_rows($dataquery) >= 1){
		$check = 1;
			while($row = mysqli_fetch_assoc($dataquery)) {
				   
				   
					if($acz == "ADMIN"){
						if ($row["TIC_Status"] == "NEW"){ $NEWt++;}
						if ( ($row["TIC_Status"] == "PENDING") && ($row["Admin_ID"] == $sender)  ){ $Pending++;}
						if ($row["TIC_Status"] == "PENDING") { $OPending++;}
						if ($row["TIC_Status"] == "SOLVED"){ $solved++;}
					}
				    if($acz == "USER"){
						if ( ($row["TIC_Status"] == "NEW") && ($row["User_ID"] == $sender)  ){ $Pending++;}
						if ( ($row["TIC_Status"] == "PENDING") && ($row["User_ID"] == $sender)  ){ $Pending++;}
						if ( ($row["TIC_Status"] == "SOLVED") && ($row["User_ID"] == $sender) ){ $solved++;}
					}
			}
		}
		
			$output = array('new' =>$NEWt,
							'pending' => $Pending,
							'opending' => $OPending,
							'solved' => $solved,
							);
		   
		   
			 echo json_encode($output);
		
		

	}
		
		mysqli_close($sqlconn);
	//	echo $howmany; 
	?>
	
