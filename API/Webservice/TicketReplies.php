
<?php // get replies in the ticket
	include("connect.php"); 

	
	$TicketID = $data->Ticket;
	
	
	//$TicketID = "1003";
	//$sender = "1002";
	$check1 = 0;
	$check2 = 0;
	
	$awesomequery  = mysqli_query( $sqlconn,"SELECT * 
										  FROM ticket
										  WHERE  TIC_ID = '$TicketID'");
										  
		if(mysqli_num_rows($awesomequery) >= 1){
		while($row = mysqli_fetch_assoc($awesomequery)) {
			   
			$sender = $row["User_ID"];
		    $receiver = $row["Admin_ID"];
		}
	}
	
	
	$dataquery  = mysqli_query( $sqlconn,"SELECT * 
										  FROM ticket_reply
										  INNER JOIN user
										  ON ticket_reply.TReply_Sender=user.User_ID
										  WHERE  TIC_ID = '$TicketID' and TReply_Sender = '$sender'");
	
	
	$dataquery2 = mysqli_query( $sqlconn,"SELECT * 
										  FROM ticket_reply
										  INNER JOIN user
										  ON ticket_reply.TReply_Sender=user.User_ID
										  WHERE  TIC_ID = '$TicketID' and TReply_Sender = '$receiver'");
	
	if(mysqli_num_rows($dataquery) >= 1){
		$check1 = 1;
		while($row = mysqli_fetch_assoc($dataquery)) {
			   
			$output = array('ID' => $row["TReply_ID"],
							'Name' => $row["User_Nick"],
							'PersonID' => $row["User_ID"],
							'MSG' => $row["TReply_Message"],
							'Time' => $row["TReply_Date"],
							'Type' => "A"
							);
		   
			 $results1[] = $output;
	
		}
	}
		
	if(mysqli_num_rows($dataquery2) >= 1){
		$check2 = 1;
		
		while($row = mysqli_fetch_assoc($dataquery2)) {
			   
			$output = array('ID' => $row["TReply_ID"],
							'Name' => $row["User_Nick"],
							'PersonID' => $row["User_ID"],
							'MSG' => $row["TReply_Message"],
							'Time' => $row["TReply_Date"],
							'Type' => "B"
							);
		   
			 $results2[] = $output;
	
		}
		//echo json_encode($results);
		//echo $results[1]["ID"]; 
		
	}
		
		if( $check1 == 1 && $check2 == 1){
			$results = array_merge($results1,$results2);
			$howmany = count($results);
			
			
			function cmp($a, $b)
			{
				return strcmp($a["ID"], $b["ID"]);
			}

			usort($results, "cmp");
		/*	for($x = 0; $x <  $howmany; $x++) {
			 echo $results[$x]["ID"] . "  " . $results[$x]["Name"]. "  " . $results[$x]["MSG"] . "  " . $results[$x]["Time"]. "  " . $results[$x]["Type"] ;
			 echo "<br>";
			}
		*/	
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
	//	echo $howmany; 
	?>