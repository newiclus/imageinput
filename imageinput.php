<?php 

require("Images.php");

$options['width']			=$_POST['width'];
$options['height']			=$_POST['height'];
$options['thumbnail_height']=(isset($_POST['thumbnail-height']))?$_POST['thumbnail-height']:'';
$options['preview_height']	=(isset($_POST['preview-height']))?$_POST['preview-height']:$_POST['height'];
$options['path']			=$_POST['path'];
$options['name']			=$_POST['name'];
$options['sizerule']		=(isset($_POST['sizerule']))?$_POST['sizerule']:'free';
$options['formats']			=(isset($_POST['formats']))?$_POST['formats']:'all';


$image= new Images();
$msg=$image->upload('file',$options);

if(($msg==1))
	$json=array('status'=>'success','file'=>$image->file(),'preview'=>$image->file_preview());
else
	$json=array('status'=>'error','msg'=>$msg);

echo json_encode($json);





// echo "<!DOCTYPE html><html><body><script>";
// // echo "function successImage(msg){ alert('success: '+msg); }";
// // echo "function errorImage(msg){ alert('error: '+msg); }";
// echo "parent.";
// echo ($msg==1)?"successImage('".$image->file()."','".$image->file_preview()."');":"errorImage('".$msg."');";
// echo "</script></body></html>";

