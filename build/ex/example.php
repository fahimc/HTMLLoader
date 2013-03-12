<?php
$file = "example.html";
$dom = new DOMDocument();
$dom -> loadHTMLFile($file);
$data = file_get_contents('data.json');
$data = json_decode($data);

$body = $dom -> getElementsByTagName('body');

if ($body && 0 < $body -> length) {
	$body = $body -> item(0);
	$template = $dom -> createDocumentFragment();
	$template -> appendXML('<script>window.php = "true";</script>');
	$body -> appendChild($template);
	
	foreach ($data as $page) {
		for($a=0;$a<sizeof($page);$a++)
		{
			$id= $page[$a]->id;
			switch($page[$a]->type)
			{
				case "text":
					echo $id;
					var_dump($dom->getElementById($id));
					$dom->getElementById($id)->nodeValue=$page[$a]->value;
					break;
			}
			
		}
		
	}
}

echo $dom -> saveHTML();
?>