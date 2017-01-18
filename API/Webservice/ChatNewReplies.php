<?php    //posting new reply in Chat
	include("connect.php"); 

	$reply = $data->MSG;
	$sender = $data->ME;
    $receiver   = $data->THEM;
	$currenttime = date('Y-m-d H:i:s');
	

	
	
	$result = mysqli_query( $sqlconn,"	INSERT 
										INTO chat (Chat_Sender,Chat_Receiver,Chat_MSG,Chat_Time) 
										VALUES ('$sender','$receiver','$reply', '$currenttime ');");

	
	
	
	if( $result){
		$output = array('status' => true);
	}
	else{
		$output = array('status' => false);
	}
	
	echo json_encode($output);
		
	mysqli_close($sqlconn);
?>		
	