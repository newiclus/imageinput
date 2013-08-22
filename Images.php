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
		
		$this->opt = array_merge($this->opt, $options);

		// $file_size              = $_FILES[$name]['size'];
		// $file_type              = $_FILES[$name]['type'];
		$this->opt['file_temp']    = $_FILES[$name]['tmp_name']; 
		
		//getting extention
		$ext = explode(".",$_FILES[$name]['name']);
		$this->opt['extension']    = strtolower($ext[sizeof($ext)-1]);

		//name
		$this->opt['file'] = ($this->opt['file']=='auto')?$_FILES[$name]['name']:$this->opt['file'];

		if(substr($this->opt['file'],-4,4)!=".".$this->opt['extension'])
			$this->opt['file']=$this->opt['file'].".".$this->opt['extension'];

		//fixing extention
		$this->opt['path'] = str_replace("//","/",$this->opt['path']."/");
		$this->opt['path'] = ($this->opt['path']=="/")?"":$this->opt['path'];

		//get file dest
    	$this->opt['dest'] =$this->opt['path'].$this->opt['file'];

    	$validate=$this->validate();
		if($validate!=1)
			return $validate;

		if(!($coyping=$this->store()))
		if($coyping!=1)	
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

		// RESIZING
        if($this->opt['sizerule'] == 'proportion')
        {
			$coyping=$this->reduce($this->opt['height'],"","dest");
			if($coyping!=1)
				return $copying;

        }
        elseif($this->opt['sizerule'] == 'proportion')
        {
        	if( $this->opt['img_w']/$this->opt['img_h'] > $this->opt['width']/$this->opt['height'] )
        	{
        		$height_dest=$this->opt['height']*($this->opt['img_w']/$this->opt['img_h']);
				$coyping=$this->reduce($height_dest,"","dest");
        	} 
        	else 
        	{
        		$height_dest=$this->opt['height'];
				$coyping=$this->reduce($height_dest,"","dest");
        	}

			if($coyping!=1)
				return $copying;

        }
        elseif($this->opt['sizerule'] == 'fit')
        {
        	if( $this->opt['img_w']/$this->opt['img_h'] > $this->opt['width']/$this->opt['height'] )
        	
        		$height_dest=$this->opt['width']*($this->opt['img_h']/$this->opt['img_w']);

        	else 
        	
        		$height_dest=$this->opt['height'];
        	
			$coyping=$this->reduce($height_dest,"","dest");

			if($coyping!=1)
				return $copying;

        }  
        elseif($this->opt['sizerule'] == 'overflow')
        {
        	if( $this->opt['img_w']/$this->opt['img_h'] > $this->opt['width']/$this->opt['height'] )
        	
        		$height_dest=$this->opt['height'];
        	 
        	else 
        	
        		$height_dest=$this->opt['width']*($this->opt['img_h']/$this->opt['img_w']);
        	
			$coyping=$this->reduce($height_dest,"","dest");

			if($coyping!=1)
				return $copying;

        }  
        elseif($this->opt['sizerule'] == 'crop')
        {
        	if( $this->opt['img_w']/$this->opt['img_h'] > $this->opt['width']/$this->opt['height'] )
        	{
        		$height_dest=$this->opt['height'];
				$coyping=$this->reduce($height_dest,"","dest");

				$this->opt['img_w']=$height_dest*($this->opt['img_w']/$this->opt['img_h']);
				$this->opt['img_h']=$height_dest;

        	} 
        	else 
        	{
        		$height_dest=$this->opt['width']*($this->opt['img_h']/$this->opt['img_w']);
				$coyping=$this->reduce($height_dest,"","dest");

				$this->opt['img_w']=$this->opt['width'];
				$this->opt['img_h']=$height_dest;

        	}

			$coyping=$this->reduce($this->opt['height'],"","dest",TRUE,$this->opt['width']);

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
        		return "copying error : ".$this->opt['dest'];
        	
        	return TRUE;

        }

	}

	function reduce($height,$subfij,$index,$crop=FALSE,$width=NULL)
	{

		$file_dest=str_replace(".".$this->opt['extension'],$subfij.".".$this->opt['extension'],$this->opt['dest']);

		$width=($width==NULL)?intval($height*($this->opt['img_w']/$this->opt['img_h'])):$width;

		$this->opt[$index]=$file_dest;

		$quality=100;

		$reduced=FALSE; 

		switch($this->opt['extension'])
		{
		    case "jpg":

		    	$img=imagecreatefromjpeg($this->opt['dest']);

				$miniature = ImageCreateTrueColor($width, $height);

				if($crop)
					imagecopyresampled($miniature,$img,0 -($this->opt['img_w']-$width)/2 ,0 -($this->opt['img_h']-$height)/2,0,0,$this->opt['img_w'],$this->opt['img_h'],$this->opt['img_w'],$this->opt['img_h']);
				else
					imagecopyresampled($miniature,$img,0,0,0,0,$width,$height,$this->opt['img_w'],$this->opt['img_h']);

		        $reduced = imagejpeg($miniature,$file_dest,$quality);

		    break;
		    case "gif":

		    	$img=imagecreatefromgif($this->opt['dest']);

				$miniature = ImageCreateTrueColor($width, $height);

				if($crop)
					imagecopyresampled($miniature,$img,0 -($this->opt['img_w']-$width)/2 ,0 -($this->opt['img_h']-$height)/2,0,0,$this->opt['img_w'],$this->opt['img_h'],$this->opt['img_w'],$this->opt['img_h']);
				else
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

				if($crop)
					imagecopyresampled($miniature,$img,0 -($this->opt['img_w']-$width)/2 ,0 -($this->opt['img_h']-$height)/2,0,0,$this->opt['img_w'],$this->opt['img_h'],$this->opt['img_w'],$this->opt['img_h']);
				else
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
			
	    	if(!@imagecreatefromjpeg($this->opt['file_temp'])) return "Error reading jpg file";

	    elseif($this->opt['extension']=="gif")

	    	if(!@imagecreatefromgif($this->opt['file_temp'])) return "Error reading gif file";

	    elseif($this->opt['extension']=="png")

	    	if(!@imagecreatefrompng($this->opt['file_temp'])) return "Error reading png file";	 
				
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

