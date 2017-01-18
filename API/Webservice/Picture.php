<?php
header('Access-Control-Allow-Origin: *');


$uploadfilename = $_FILES['file']['tmp_name'];
//get the file from input type file <input type="file" name="file" >


$location = $_POST['directory'];
// $location is my target directory target directory =    temp/    


$newname = $_POST["rename"];
// $newname is for renaming the file



//if newname exist then delete the old one ,depends dkt kau nak jadi ape, do nothing or do something
if (file_exists( $location.'/'.$newname.'.png')) {
    unlink( $location.'/'.$newname.'.png');
    echo 'File has been deleted';
 } 

 
 // move ($uploadfilename, 'temp/newimage.png')
if(move_uploaded_file($uploadfilename, $location.'/'.$newname.'.png')){
      echo 'File Uploaded';
} else {
        echo 'Upload error!';
}



//how to select 

    $sqlconn = mysqli_connect('localhost', 'root', '' , 'mobiradeon') or die(mysqli_error());
    $dataquery = mysqli_query( $sqlconn,"SELECT * FROM visitorinfo WHERE 
										 name = 'test' 
										 and companyname='error' 
										 and staffname = 'shit is coming'
										 and staffdepartment = 'google' ");
						
   
   // jalan query and check kalau dpt result, kalau dapat then mysqli_num_rows($dataquery) >= 1
	if(mysqli_num_rows($dataquery) >= 1){
	
	// if all okay then we run below
	
	while($row = mysqli_fetch_assoc($dataquery)) {	  
		//saje2 masuk array, cuz good practice	
		$output = array('Nama' => $row["name"],
						'CompName' => $row["companyname"],
						'StafName' => $row["staffname"],
						'Department' => $row["staffdepartment"],				
						);
	   
		 $results[] = $output;

	}
	
// so kau maybe boleh call balik degan $results[0]["Nama"] (kot?, x sure, something like this la)
		
		
}



?>