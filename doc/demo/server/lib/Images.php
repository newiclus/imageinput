<?php

/**
 *
 * Input Image
 *
*/
class Images
{
	var $opt=array();

	function __construct()
	{

	}

	function upload($name,$options=array())
	{
		
		$this->opt = array_merge($this->opt, $options);

		// $file_size              = $_FILES[$name]['size'];
		// $file_type              = $_FILES[$name]['type'];
		$this->opt['file_temp']    = $_FILES[$name]['tmp_name']; 
		
		$ext = explode(".",$_FILES[$name]['name']);
		$this->opt['extension']    = strtolower($ext[sizeof($ext)-1]);


		if(substr($this->opt['name'],-4,4)!=".".$this->opt['extension'])
			$this->opt['name']=$this->opt['name'].".".$this->opt['extension'];

		$this->opt['path'] = str_replace("//","/",$this->opt['path']."/");

    	$this->opt['dest'] =$this->opt['path'].$this->opt['name'];


		if(!($validate=$this->validate()))
			return $validate;

		if(!($coyping=$this->store()))
			return $copying;


		if(!empty($this->opt['thumbnail_height']))
			if(!($coyping=$this->mini($this->opt['thumbnail_height'],"_thumbnail")))
				return $copying;


		if(!empty($this->opt['preview_height']))
			if(!($coyping=$this->mini($this->opt['preview_height'],"_preview")))
				return $copying;

		return TRUE;

	}

	function file()
	{
		return $this->opt['dest'];
	}

	function store()
	{

		// var_dump($this->opt);
        if (is_uploaded_file($this->opt['file_temp']))
        {	

        	if(!copy($this->opt['file_temp'], $this->opt['dest']))
        		return "copying error";
        	
        	return TRUE;
        	// var_dump($_SERVER);
        	// var_dump(getcwd());
        }

	}

	function mini($height,$subfij)
	{

		$file_dest=str_replace(".".$this->opt['extension'],$subfij.".".$this->opt['extension'],$this->opt['dest']);

		$width=intval($height*($this->opt['img_w']/$this->opt['img_h']));

		$quality=90;

		switch($this->opt['extension'])
		{
		    case "jpg":
		        // $img = imagecreatefromjpeg($this->opt['dest']);
				// crear papel de imágen, ImageCreateTrueColor para no perder colores
				$miniature = ImageCreateTrueColor($width, $height);
				// imprimir la imagen redimensionada
				imagecopyresampled($miniature,$this->opt['img'],0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);
				// guardar la imagen como $file_dest
		        $bool = imagejpeg($miniature,$file_dest,$quality);
		    break;
		    case "gif":
		        // $img = imagecreatefromgif($this->opt['dest']);
				// crear papel de imágen, ImageCreateTrueColor para no perder colores
				$miniature = ImageCreateTrueColor($width, $height);
				// imprimir la imagen redimensionada
				imagecopyresampled($miniature,$this->opt['img'],0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);
				// guardar la imagen como $file_dest
		        $bool = imagegif($miniature,$file_dest,$quality);
	        break;
		    case "png":
		        // $img = imagecreatefrompng($this->opt['dest']);
				// crear papel de imágen, ImageCreateTrueColor para no perder colores
				$miniature = ImageCreateTrueColor($width, $height);

				imagealphablending($miniature, false);
				$colorTransparent = imagecolorallocatealpha($miniature, 0, 0, 0, 127);
				imagefill($miniature, 0, 0, $colorTransparent);
				imagesavealpha($miniature, true);

				imagecopyresampled($miniature,$this->opt['img'],0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);
				// guardar la imagen como $file_dest
		        $bool = imagepng($miniature,$file_dest);
	//	        imagepng($miniature,$file_dest);
	        break;
		}

    	if(!$bool)
    		echo "minimizing $subfij error";
    	
    	return TRUE;
    	// var_dump($_SERVER);
    	// var_dump(getcwd());

	}	

	function validate()
	{

		//validating formats
		if(!($this->opt['formats'] == 'all')){
			
			$this->opt['formats_array'] = explode(",",$this->opt['formats']);

			if(!(in_array($this->opt['extension'],$this->opt['formats_array'])))

				return "the extension must be ".str_replace(","," or ",$this->opt['formats']);

		}		

	    if($this->opt['extension']=="jpg")
			
	    	if(!@$this->opt['img']=imagecreatefromjpeg($this->opt['file_temp'])) return "error jpg";

	    elseif($this->opt['extension']=="gif")

	    	if(!@$this->opt['img']=imagecreatefromgif($this->opt['file_temp'])) return "error gif";

	    elseif($this->opt['extension']=="png")

	    	if(!@$this->opt['img']=imagecreatefrompng($this->opt['file_temp'])) return "error png";	 
				
	    else 
	    	return "invalid extension";


	    //validating sizerule
		list($this->opt['img_w'], $this->opt['img_h'], $tipo, $atr) = getimagesize($this->opt['file_temp']);
	
		if(!($this->opt['sizerule'] == 'free')){

			if($this->opt['sizerule'] == 'strict')

				if(!($this->opt['img_w']==$this->opt['width'] and $this->opt['img_h']=$this->opt['height'] ))

					return "Image must be strict ".$this->opt['width']."x".$this->opt['height'];

			if($this->opt['sizerule'] == 'proportion')

				if(!($this->opt['img_w']/$this->opt['img_h']==$this->opt['width']/$this->opt['height'] ))

					return "Image must be proportion of ".$this->opt['width']."x".$this->opt['height'];

		}

		return TRUE;

	}

}

