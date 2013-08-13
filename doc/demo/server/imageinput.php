<?php 
require("lib/Images.php");


// $_POST['width']            = 223;
// $_POST['height']           = 118;

// $_POST['thumbnail-height'] = "100";
// $_POST['preview-height']   = "50";
// $_POST['path']             = "imagenes/prueba";
// $_POST['name']             = "auto"; //auto|fixed_name
// $_POST['sizerule']         = "strict"; //strict|proportion|free
// $_POST['formats']          = "all"; //all|jpg,png,gif
// $_POST['text']          = "message";


$FOTOS= new Images();
$FOTOS->upload('file',array(
	'width'            =>$_POST['width'],
	'height'           =>$_POST['height'],
	'thumbnail_height' =>$_POST['thumbnail-height'],
	'preview_height'   =>$_POST['preview-height'],
	'path'             =>$_POST['path'],
	'name'             =>$_POST['name'],
	'sizerule'         =>$_POST['sizerule'],
	'formats'          =>$_POST['formats'],
));



