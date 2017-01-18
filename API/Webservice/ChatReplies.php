
<?php
	//list out all the replies in that particular chat
	
	include("connect.php"); 

	//	$sender   = "1003";
	//  $receiver = "1001";
	
	
	$sender =  $data->ME;
	$receiver = $data->THEM;
	
	
	
	
	$dataquery = mysqli_query( $sqlconn,"SELECT * FROM Chat WHERE  Chat_Sender = '$sender' and Chat_Receiver = '$receiver'");
	$dataquery2 = mysqli_query( $sqlconn,"SELECT * FROM Chat WHERE  Chat_Sender = '$receiver' and Chat_Receiver = '$sender'");
	
	$check1 = 0;
	$check2 = 0;
	
	
	if(mysqli_num_rows($dataquery) >= 1){
		$check1 = 1;
		while($row = mysqli_fetch_assoc($dataquery)) {
			   
			$output = array('ID' => $row["Chat_ID"],
							'SenderID' => $row["Chat_Sender"],
							'ReceiverID' => $row["Chat_Receiver"],
							'MSG' => $row["Chat_MSG"],
							'Time' => $row["Chat_Time"],
							'Type' => "A"
							);
		   
			 $results1[] = $output;
	
		}
	}
		
	if(mysqli_num_rows($dataquery2) >= 1){
		$check2 = 1;
		while($row = mysqli_fetch_assoc($dataquery2)) {
			   
			$output = array('ID' => $row["Chat_ID"],
							'SenderID' => $row["Chat_Sender"],
							'ReceiverID' => $row["Chat_Receiver"],
							'MSG' => $row["Chat_MSG"],
							'Time' => $row["Chat_Time"],
							'Type' => "B"
							);
		   
			 $results2[] = $output;
	
		}

		
	}
		
		
			if( $check1 == 1 && $check2 == 1){
			$results = array_merge($results1,$results2);
			$howmany = count($results);
			
			
			function cmp($a, $b)
			{
				return strcmp($a["ID"], $b["ID"]);
			}

			usort($results, "cmp");
			echo json_encode($results);
			
		}		
		else if( $check1 == 1 && $check2 == 0){
			echo json_encode($results1);
		}
		else if( $check1 == 0 && $check2 == 1){
			echo json_encode($results2);
		}
		else if( $check1 == 0 && $check2 == 0){
			$none = false;
			echo json_encode($none);
		}
		
		mysqli_close($sqlconn);

	?>