<?php
$data = $_POST['data'];
if(isset($data))
{
	$myFile = "../../data.json";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, $data);
	fclose($fh);
	echo "done";
}else{
	echo "error";
}
?>