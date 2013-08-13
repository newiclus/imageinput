<?php

/**
 *
 * Input Image
 *
*/
class Images
{
	var $opt=array();

	function upload($name,$options=array())
	{

		// var_dump($options);
		
		$this->opt = array_merge($this->opt, $options);

		// $file_size              = $_FILES[$name]['size'];
		// $file_type              = $_FILES[$name]['type'];
		$this->opt['file_temp']    = $_FILES[$name]['tmp_name']; 
		
		//getting extention
		$ext = explode(".",$_FILES[$name]['name']);
		$this->opt['extension']    = strtolower($ext[sizeof($ext)-1]);


		if(substr($this->opt['name'],-4,4)!=".".$this->opt['extension'])
			$this->opt['name']=$this->opt['name'].".".$this->opt['extension'];

		$this->opt['path'] = str_replace("//","/",$this->opt['path']."/");

		$this->opt['path'] = ($this->opt['path']=="/")?"":$this->opt['path'];

    	$this->opt['dest'] =$this->opt['path'].$this->opt['name'];

    	$validate=$this->validate();
		if($validate!=1)
			return $validate;

		if(!($coyping=$this->store()))
		return $copying;


		if(!empty($this->opt['thumbnail_height']))
		{
			$coyping=$this->reduce($this->opt['thumbnail_height'],"_thumbnail","thumbnail");
			if($coyping!=1)
				return $copying;
		}

		if(!empty($this->opt['preview_height']))
		{
			$coyping=$this->reduce($this->opt['preview_height'],"_preview","preview");
			if($coyping!=1)
				return $copying;
		}

		return TRUE;

	}

	function file()
	{
		return $this->opt['dest'];
	}

	function file_preview()
	{
		return $this->opt['preview'];
	}

	function file_thumbnail()
	{
		return $this->opt['thumbnail'];
	}		


	function store()
	{

        if (is_uploaded_file($this->opt['file_temp']))
        {	

        	if(!copy($this->opt['file_temp'], $this->opt['dest']))
        		return "copying error";
        	
        	return TRUE;

        }

	}

	function reduce($height,$subfij,$index)
	{

		$file_dest=str_replace(".".$this->opt['extension'],$subfij.".".$this->opt['extension'],$this->opt['dest']);

		$width=intval($height*($this->opt['img_w']/$this->opt['img_h']));

		$this->opt[$index]=$file_dest;

		$quality=90;

		$reduced=FALSE; 

		switch($this->opt['extension'])
		{
		    case "jpg":

		    	$img=imagecreatefromjpeg($this->opt['dest']);

				$miniature = ImageCreateTrueColor($width, $height);

				imagecopyresampled($miniature,$img,0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);

		        $reduced = imagejpeg($miniature,$file_dest,$quality);

		    break;
		    case "gif":

		    	$img=imagecreatefromgif($this->opt['dest']);		    

				$miniature = ImageCreateTrueColor($width, $height);

				imagecopyresampled($miniature,$img,0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);

		        $reduced = imagegif($miniature,$file_dest,$quality);

	        break;
		    case "png":

		    	$img=imagecreatefrompng($this->opt['dest']);

				$miniature = ImageCreateTrueColor($width, $height);

				imagealphablending($miniature, false);
				$colorTransparent = imagecolorallocatealpha($miniature, 0, 0, 0, 127);
				imagefill($miniature, 0, 0, $colorTransparent);
				imagesavealpha($miniature, true);

				imagecopyresampled($miniature,$img,0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);

		        $reduced = imagepng($miniature,$file_dest);

	        break;
		}

    	if(!$reduced)
    		echo "Error minimizing the $subfij file";
    	
    	return TRUE;

	}	

	function validate()
	{

		//validating formats
		if(!($this->opt['formats'] == 'all')){
			
			$this->opt['formats_array'] = explode(",",$this->opt['formats']);

			if(!(in_array($this->opt['extension'],$this->opt['formats_array'])))

				return "The file extension must be ".str_replace(","," or ",$this->opt['formats']);

		}		

	    if($this->opt['extension']=="jpg")
			
	    	if(!@imagecreatefromjpeg($this->opt['file_temp'])) return "error reading jpg file";

	    elseif($this->opt['extension']=="gif")

	    	if(!@imagecreatefromgif($this->opt['file_temp'])) return "error reading gif file";

	    elseif($this->opt['extension']=="png")

	    	if(!@imagecreatefrompng($this->opt['file_temp'])) return "error reading png file";	 
				
	    else 
	    	return "Invalid extension";


	    //validating sizerule
		list($this->opt['img_w'], $this->opt['img_h'], $tipo, $atr) = getimagesize($this->opt['file_temp']);
	
		if(!($this->opt['sizerule'] == 'free')){

			if($this->opt['sizerule'] == 'strict')

				if(!($this->opt['img_w']==$this->opt['width'] and $this->opt['img_h']=$this->opt['height'] ))

					return "The dimensions of the image should be strictly ".$this->opt['width']."x".$this->opt['height'];

			if($this->opt['sizerule'] == 'proportion')

				if(!($this->opt['img_w']/$this->opt['img_h']==$this->opt['width']/$this->opt['height'] ))

					return "The image must have the proportions ".$this->opt['width']."x".$this->opt['height'];

		}

		return TRUE;

	}

}

