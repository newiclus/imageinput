/*
    

*/

(function () {
    'use strict';

    /* Default options  */
    var options = {
        image_dir  : 'www/public',   // absolute path to the directory
        upload_msg : 'Click to Upload',
        img_width  : 300,
        img_height : 180,
        thumbnail_height : "",
        preview_height   : 180,
        img_name   : "auto",
        img_path   : "/",
        img_rule   : "free",
        img_format : "jpg,png,gif",
        php_path   : 'imageinput.php'
    };
    
    /* 
      Variables
    */    
    var input   = document.querySelectorAll('.imageinput'),   /* Filter Inputs */
        son     = [],   /* Array blocks Upload */
        iframes = [],   /* Array form - iframe */

        /*  TagNode   */
        div   = document.createElement('div'),   /* Wrapper forms */
        iframe = document.createElement('iframe'),   /* Wrapper forms */
        form  = document.createElement('form'),   /* forms */
        file  = document.createElement('input'),   /* Create Input File */
        text  = document.createElement('p'),   /* Create P tagNode */
        msg   = document.createElement('p'),   /* Create P tagNode */
        img   = document.createElement('img'),
        a     = document.createElement('a');
           
    
    /*  Node File Attributes */
    file.setAttribute('type', 'file');
    file.setAttribute('name', 'file');

    /* Node form Attributes */
    form.setAttribute('enctype', 'multipart/form-data');
    form.setAttribute('action', options.php_path);
    form.setAttribute('method', 'post');
    
    /* Asign ClassName */
    a.className     = 'link-upload'; 
    file.className  = 'input-file';
    text.className  = "text-upload";
    msg.className   = 'msgError';
    img.className   = 'img-preview';
    iframe.className = "iframe-upload";    

    /* Div wrapper for form and iframe */
    var resp    = div.cloneNode(true);
        resp.id = 'resAJAXimage';
        document.body.appendChild(resp);

    var contIframe = document.getElementById('resAJAXimage');        


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
                return options[def];
            }
        }           

        switch (attr) {
            case 'data-height':
                result = parseInt( check('img_height') );                

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? options.img_height : result;
                    return value;
                } else
                    return result;

            break;

            case 'data-width':
                result = parseInt( check('img_width') );

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? options.img_width : result;
                    return value;
                } else
                    return result;
                
            break;

            case 'data-thumbnail-height':
                result = parseInt( check('thumbnail_height') );                

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? options.thumbnail_height : result;
                    return value;
                } else {
                    return '';
                }
            break;

            case 'data-preview-height':
                result = parseInt( check('preview_height') );                

                if ( pass === true ) {
                    var value = ( isNaN(result) ) ? options.preview_height : result;
                    return value;
                } else {
                    return result;
                }
            break;

            case 'data-path':
                return check('image_dir');
            break;

            case 'data-name':
                return check('img_name');
            break;

            case 'data-sizerule':
                result = check('img_rule');
                if ( pass === true ) {
                    var value = result === 'strict' ? 'strict' :
                                result === 'proportion' ? 'proportion' :
                                result === 'free' ? 'free' :
                                options.img_rule;
                    return value;
                } else
                    return result;

            break;

            case 'data-formats':
                result = check('img_format');
                if ( pass === true ) {
                    var value = result === 'jpg' ? 'jpg' :
                                result === 'jpg,gif' ? 'jpg,gif' :
                                result === 'png' ? 'png' :
                                result === 'jpg,png' ? 'jpg,png' :
                                options.img_format;
                    return value;
                } else
                    return options.img_format;

            break;

            case 'data-text':
                return check('upload_msg');
            break;
        }
    }


    /* Constructor Blocks */
    function addBlock( node, id ) {

        var width  = validator(node, 'data-width'),
            height = validator(node, 'data-height'),
            texto  = validator(node, 'data-text');

        /* Create Block */
        text.innerHTML = '<span>'+ width +' x '+ height +'</span> <br> <cite>'+ texto +'</cite>';

        a.style.width  = width +'px';
        a.style.height = height +'px';
        a.setAttribute('data-target', 'frame-'+id);       
        a.appendChild(text);        
        a.appendChild(img);
        
        /* return node */
        return a.cloneNode(true);
    }

    /* Constructor Forms */
    function addForm( node, id ) {

        var format = validator(node, 'data-formats'),
            frag = '<input type="hidden" name="width" value="'+ validator(node, 'data-width') +'">\
                    <input type="hidden" name="height" value="'+ validator(node, 'data-height') +'">\
                    <input type="hidden" name="thumbnail-height" value="'+ validator(node, 'data-thumbnail-height')  +'">\
                    <input type="hidden" name="preview-height" value="'+ validator(node, 'data-preview-height') +'">\
                    <input type="hidden" name="path" value="'+ validator(node, 'data-path') +'">\
                    <input type="hidden" name="formats" value="'+ format +'">\
                    <input type="hidden" name="name" value="'+ validator(node, 'data-name') +'">\
                    <input type="hidden" name="sizerule" value="'+ validator(node, 'data-sizerule') +'">';


        /* create block Iframe */        
        form.setAttribute('target', 'iframe_upload_'+id);  
        form.innerHTML = frag;      
        
        var accept = format === 'jpg' ? 'image/jpeg' :
                                format === 'jpg,gif' ? 'image/jpeg,image/gif' :
                                format === 'png' ? 'image/png' :
                                format === 'jpg,png' ? 'image/jpeg,image/png' :
                                'image/jpeg,image/png,image/gif';

        file.setAttribute('accept', accept);

        form.appendChild( file );

        /* return node */
        return form.cloneNode(true);
    }

    /* Constructor Iframe */
    function addIframe(id) {
        iframe.setAttribute('name', 'iframe_upload_'+id);
        iframe.setAttribute('data-callback', 'upload_'+id);
        iframe.id = 'iframe_upload_'+id;

        /* return node */
        return iframe.cloneNode(true);
    }


    /*  Insert the new block After every ".imageinput" */
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }


    /* Check image file extension */
    /*function CheckFileImage() {
        
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
    }   // */
    

    /* Insert Blocks to father */
    for (var i = 0, len = input.length; i < len; i++ ) {
        
        son[i] = document.createElement('div');
        son[i].id ='upload_' + i;
        son[i].className ='upload-item';

        /* Insert sons(div) */
        son[i].appendChild( addBlock( input[i], i ) );
        son[i].appendChild(msg.cloneNode(true));

        /* Call inserAfter */
        insertAfter(input[i], son[i]);

        /* Insert form/iframe to div#resAJAXimage */
        iframes[i]    = div.cloneNode(true);
        iframes[i].id = 'frame-' + i;
        iframes[i].className = 'cont-form';

        /* Insert Iframe */
        iframes[i].appendChild( addForm( input[i], i ) );
        iframes[i].appendChild( addIframe( i ) );
        contIframe.appendChild(iframes[i]);
    } 


    /*  
      Events into Block

      @triger
      @onchange

    */

    // Event Click
    var block = document.querySelectorAll('.link-upload');

    for ( var i = 0, len = block.length; i < len; i++ ) { 

        block[i].onclick = function() {

            var id       = this.getAttribute('data-target');
            var callForm = document.getElementById(id);
            var callFile = callForm.querySelector(".input-file");
                callFile.click();
        }
    }


    // Event Onchange
    var image = document.querySelectorAll('.input-file');

    for ( var i = 0, len = image.length; i < len; i++ ) {

        image[i].onchange = function() {

            var id    = this.parentNode.getAttribute('target'),
                frame = document.getElementById(id);

            frame.setAttribute('onLoad', 'callbackData(this);');
            this.form.submit();
        }
    };   //*/
    

    //console.log(content);
})();


/* Callback data from server */
function callbackData( id ) {   
    
    var responseText;   // response data from server

    if( id.contentWindow ) {
         responseText = id.contentWindow.document.body ? JSON.parse(id.contentWindow.document.body.innerHTML) : null;
         
    } else if(id.contentDocument) {
        responseText = id.contentDocument.document.body ? JSON.parse(id.contentDocument.document.body.innerHTML) : null;       
    }   

    var blockId = id.getAttribute('data-callback'),
        block   = document.getElementById(blockId).querySelector(".link-upload");
        blockParent = document.getElementById(blockId);        

    var p   = blockParent.querySelector('.msgError');        
    var img = block.querySelector('.img-preview');
    

    if ( responseText.status === 'success' ) {
        p.style.display = 'none';
        block.firstChild.style.display = "none";

        img.src = responseText.file;
        img.style.display = 'inline-block';

    } else {
        img.style.display = 'none';
        block.firstChild.style.display = "block";

        p.innerHTML = responseText.msg;
        p.style.display = 'block';
    }        
    
}   // */


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


