<?php 
require("lib/Images.php");


// $_POST['width']            = 223;
// $_POST['height']           = 118;

// $_POST['thumbnail-height'] = "100";
// $_POST['preview-height']   = "50";
// $_POST['path']             = "imagenes/prueba";
// $_POST['name']             = "auto"; //auto|fixed_name
// $_POST['sizerule']         = "strict"; //strict|proportion|free
// $_POST['formats']          = "jpg"; //all|jpg,png,gif
// $_POST['text']          = "message";

$options['width']			=$_POST['width'];
$options['height']			=$_POST['height'];
$options['thumbnail_height']=(isset($_POST['thumbnail-height']))?$_POST['thumbnail-height']:'';
$options['preview_height']	=(isset($_POST['preview-height']))?$_POST['preview-height']:'';
$options['path']			=$_POST['path'];
$options['name']			=$_POST['name'];
$options['sizerule']		=$_POST['sizerule'];
$options['formats']			=$_POST['formats'];

$FOTOS= new Images();
$msg=$FOTOS->upload('file',$options);

echo "<!DOCTYPE html><html><body><script>";
echo "function successImage(msg){ alert('success: '+msg); }";
echo "function errorImage(msg){ alert('error: '+msg); }";
// echo "parent.";
echo ($msg==1)?"successImage('".$FOTOS->file()."','".$FOTOS->file_preview()."');":"errorImage('".$msg."');";
echo "</script></body></html>";


