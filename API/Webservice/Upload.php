<?php
header('Access-Control-Allow-Origin: *');


$location = $_POST['directory'];
//$location = "upload";
$uploadfile = $_POST['fileName'];
$uploadfilename = $_FILES['file']['tmp_name'];
$newname = $_POST["rename"];
//$newname = "goblin";


if (file_exists( $location.'/'.$newname.'.png')) {
    unlink( $location.'/'.$newname.'.png');
    echo 'File has been deleted';
 } 

 
if(move_uploaded_file($uploadfilename, $location.'/'.$newname.'.png')){
      echo 'File Uploaded';
} else {
        echo 'Upload error!';
}



?>