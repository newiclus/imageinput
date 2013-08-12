/*upclick ({
    element: uploader,
    action  : '/path_to/you_server_script.php', 
    onstart : function(filename) {
        alert('Start upload: '+filename);
    },
    oncomplete: function(response_data) {
        alert(response_data);
    }
    If activated, a new hidden input name "thumb-[name-of-your-imageinput]" will be added to your form with the thumnail path as a 
});*/


/* 

*/



(function () {
    'use strict';

    /* Default options  */
    var defaults = {
        image_dir  : 'www/public',   // absolute path to the directory
        upload_msg : 'Click to Upload',
        img_width  : 300,
        img_height : 180,
        thumbnail_height : "",
        preview_height   : 180,
        img_name   : "auto",
        img_path   : "/",
        img_rule   : "free",
        img_format : "image/jpeg,image/png,image/gif"
    };
    
    /* 
      Variables
    */    
    var input   = document.querySelectorAll('.imageinput'),   /* Filter Inputs */
        son     = [],   /* Array input Upload */

        /*  TagNode   */
        file = document.createElement('input'),   /* Create Input File */
        text = document.createElement('p'),   /* Create P tagNode */ 
        a    = document.createElement('a');
           
    
    /*  Node File Attributes */
    file.setAttribute('type', 'file');
    file.setAttribute('name', 'imagefile');        
    file.setAttribute('enctype', 'multipart/form-data');
    
    /* Asign ClassName */
    a.className = 'link-upload'; 
    text.className = "text-upload";
        
    

    /*
      Functions and Class
    */    
    /* Validate input attributes */
    function validator ( node, attr ) {

        var pass, result;

        function check(def) {
            var output;
            var validator = node.getAttribute(attr);

            if ( validator !== null && validator !== '' ) {
                output = validator;
                pass   = true;
                return output;
            } else {
                return defaults[def]; 
            }
            
        }           

        switch (attr) {
            case 'data-height':
                result = parseInt( check('img_height') );                

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? defaults.img_height : result;
                    return value;
                } else
                    return defaults.img_height;

            break;


            case 'data-width':
                result = parseInt( check('img_width') );

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? defaults.img_width : result;
                    return value;
                } else
                    return defaults.img_width;
                
            break;

            case 'data-thumbnail-height':
            break;

            case 'data-preview-height':
            break;

            case 'data-path':
            break;

            case 'data-name':
            break;

            case 'data-sizerule':

            break;

            case 'data-formats':
                result = check('img_format');
                if ( pass === true ) {
                    var value = result === 'jpg' ? 'image/jpeg' :
                                result === 'jpg,gif' ? 'image/jpeg,image/gif' :
                                result === 'png' ? 'image/png' :
                                result === 'jpg,png' ? 'image/jpeg,image/png' :
                                defaults.img_format;
                    return value;
                } else
                    return defaults.img_format;

            break;

            case 'data-text':
                return check('upload_msg');
            break;
        }
    }


    /* Constructor Blocks */
    function addBlock( node ) {

        var width  = validator(node, 'data-width'),
            height = validator(node, 'data-height'),
            texto  = validator(node, 'data-text'),
            format = validator(node, 'data-formats');

        file.setAttribute('accept', format);

        text.innerHTML = '<span>'+ width +' x '+ height +'</span> <br> <cite>'+ texto +'</cite>';

        a.style.width  = width +'px';
        a.style.height = height +'px';
        a.appendChild(file);
        a.appendChild(text);

        return a.cloneNode(true);
    }


    /*  Insert the new block After every ".imageinput" */
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    /* Check image file extension */
    function CheckFileImage() {
        
        var fileName = document.getElementById("uploadFile").value;

        if (fileName == "") {
            alert("Browse to upload a valid File with png extension");
            return false;
        }
        else if (fileName.split(".")[1].toUpperCase() == "PNG")
            return true;
        else {
            alert("File with " + fileName.split(".")[1] + " is invalid. Upload a validfile with png extensions");
            return false;
        }

        return true;
    }



    /* Insert Blocks to father */
    for (var i = 0, len = input.length; i < len; i++ ) {
        
        son[i] = document.createElement('div');
        son[i].id ='upload_' + i;
        son[i].className ='upload-item';

        /* Insert to sons(DD) */
        son[i].appendChild( addBlock( input[i] ) );

        /* Call inserAfter */
        insertAfter(input[i], son[i]);
    } 



    /*  
      Events into Block
    */
    var block = document.querySelectorAll('.link-upload');

    for ( var i = 0, len = block.length; i < len; i++ ) { 

        block[i].onclick = function() {
            
            var callFile = this.getElementsByTagName('input');
            callFile[0].click();
            //console.log(callFile);
        }
    }
    

    //console.log(content);
})();



/* Document Ready ?  */
function onReady ( callback ) {
    var addListener = document.addEventListener || document.attachEvent,
        removeListener =  document.removeEventListener || document.detachEvent
        eventName = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"

    addListener.call(document, eventName, function(){
        removeListener( eventName, arguments.callee, false )
        callback();
    }, false )
}

//onReady();