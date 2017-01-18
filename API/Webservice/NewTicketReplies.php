
<?php  //post repliest in TICKET
	include("connect.php"); 

	$reply = $data->Replied;
	$sender = $data->user_ID;
	$ticID = $data->ticID;
	$currenttime = date('Y-m-d H:i:s');
	
	
	//sample input from aps
	//	$reply = "Mushi2 arigato gozaimasu";
	// $sender = "1003";
	//  $ticID = "1009";

	$check1 = 0;
	$check2 = 0;
	
	
	$result = mysqli_query( $sqlconn,"INSERT 
							INTO ticket_reply (TIC_ID,TReply_Date,TReply_Message,TReply_Sender) 
							VALUES ('$ticID','$currenttime','$reply', '$sender');");

	
	
	
	if( $result){
		$output = array('status' => true);
	}
	else{
		$output = array('status' => false);
	}
	
	echo json_encode($output);
		
	mysqli_close($sqlconn);
?>		
	
		
