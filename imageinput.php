<?php 
$dirs=explode("/",$_SERVER['SCRIPT_NAME']);
unset($dirs[sizeof($dirs)-1]);
// var_dump($dirs);
$path=$_SERVER['HTTP_HOST'].implode("/",$dirs);

require("Images.php");

$options=array(
	'path'				=>	$_POST['path'],
	'file'				=>	(isset($_POST['file']))?$_POST['file']:'auto',
	'name'				=>	$_POST['name'],	
	'width'				=>	$_POST['width'],
	'height'			=>	$_POST['height'],	
	'thumbnail_height'	=>	(isset($_POST['thumbnail-height']))?$_POST['thumbnail-height']:'',
	'preview_height'	=>	(isset($_POST['preview-height']))?$_POST['preview-height']:$_POST['height'],
	'sizerule'			=>	(isset($_POST['sizerule']))?$_POST['sizerule']:'free',
	'formats'			=>	(isset($_POST['formats']))?$_POST['formats']:'all'
);

$image= new Images();
$msg=$image->upload('file',$options);



if(($msg==1))
	$json=array('status'=>'success','file'=>'http://'.$path."/".$image->file()."?".rand(),'file_rel'=>$image->file(),'preview'=>$image->file_preview());
else
	$json=array('status'=>'error','msg'=>$msg);

echo json_encode($json);


