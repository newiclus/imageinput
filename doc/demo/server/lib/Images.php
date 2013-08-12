<?php

/**
 *
 * Input Image
 *
*/
class Images
{
	var $extension;
	var $size;
	var $type;
	var $formats;
	var $width;
	var $height;
	var $path;

	var $thumbnail_height;
	var $preview_height;

	function __construct()
	{

	}

	function upload($name)
	{

		$_POST['width']         = 223;
		$_POST['height']        = 118;

		$_POST['thumbnail-height'] = "100";
		$_POST['preview-height']   = "150";
		$_POST['path']             = "/";
		$_POST['name']             = "auto"; //auto|fixed_name
		$_POST['sizerule']         = "strict"; //strict|proportion|free
		$_POST['formats']          = "all"; //all|jpg,png,gif
		// $_POST['text']          = "message";
		

		$this->width               = $_POST['width'];
		$this->height              = $_POST['height'];			
		$this->thumbnail_height    = $_POST['thumbnail-height'];
		$this->preview_height      = $_POST['preview-height'];
		$this->path                = $_POST['path'];
		$this->name                = $_POST['name'];
		$this->sizerule            = $_POST['sizerule'];

		$this->formats             = $_POST['formats'];
		
		// $file_size              = $_FILES[$name]['size'];
		// $file_type              = $_FILES[$name]['type'];
		$this->file_temp           = $_FILES[$name]['tmp_name']; 
		
		$exA = explode(".",$_FILES[$name]['name']);
		$this->extension           = strtolower($exA[sizeof($exA)-1]);

		echo $this->validate();

	}

	function validate(){

		if(!($this->formats == 'all')){
			
			$this->formats_array = explode(",",$this->formats);

			if(!(in_array($this->extension,$this->formats_array)))

				return "the extension must be ".str_replace(","," or ",$this->formats);

		}		

	    if($this->extension=="jpg")
			
	    	if(!@imagecreatefromjpeg($this->file_temp)) return "error jpg";

	    elseif($this->extension=="gif")

	    	if(!@imagecreatefromgif($this->file_temp)) return "error gif";

	    elseif($this->extension=="png")

	    	if(!@imagecreatefrompng($this->file_temp)) return "error png";	 
				
	    else 
	    	return "invalid extension";


		list($this->img_w, $this->img_h, $tipo, $atr) = getimagesize($this->file_temp);
	
		if(!($this->sizerule == 'free')){

			if($this->sizerule == 'strict')

				if(!($this->img_w==$this->width and $this->img_h=$this->height ))

					return "Image must be strict ".$this->width."x".$this->height;

			if($this->sizerule == 'proportion')

				if(!($this->img_w/$this->img_h==$this->width/$this->height ))

					return "Image must be proportion of ".$this->width."x".$this->height;

		}

		return TRUE;

	}

}

