<?php

$data = $_POST['data'];
if (isset($data)) {
	$saveData = new SaveData();
	$saveData -> checkData($data);
	$myFile = "../../data.json";
	$fh = fopen($myFile, 'w') or die("can't open file");

	fwrite($fh, json_encode($saveData -> data));
	fclose($fh);
	echo "done";
} else {
	echo "error";
}

Class SaveData {
	const DATA_URL = "../../data.json";
	const IMAGE_FOLDER = "../resource/image/";
	public $data;
	public function checkData($val) {
		$this -> data = json_decode($val);

		//var_dump($this->data);

		foreach ($this->data as $site) {
			for ($a = 0; $a < sizeof($site); $a++) {
				$this -> checkType($site[$a]);
			}

		}
	}

	private function checkType($obj) {
		switch($obj->type) {
			case "image" :
				$this -> saveImage($obj);
				break;
		}
	}

	private function saveImage($obj) {
		if ($_FILES[$obj -> id]["error"] && $_FILES[$obj -> id]["error"] > 0) {
			echo "Error: " . "<br>";
		} else if($_FILES[$obj -> id]) {
			if ($obj -> value && file_exists($obj -> value))
				unlink($obj -> value);
			move_uploaded_file($_FILES[$obj -> id]["tmp_name"], SaveData::IMAGE_FOLDER . $_FILES[$obj -> id]['name']);
			echo "<script>parent.setImageName({'id':'" . $obj -> id . "','name':'" . $_FILES[$obj -> id]["name"] . "'});</script>";
			$obj -> value = $_FILES[$obj -> id]["name"];
		}
	}

	

}
?>