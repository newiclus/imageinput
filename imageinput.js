/*
    

*/
'use strict';

/* Function run script */
(function () {

    /*  Variables  */
    var input   = document.querySelectorAll('.imageinput'),   /* Filter Inputs */
        son     = [],   /* Array blocks Upload */
        iframes = [],   /* Array form - iframe */

        /*  TagNode   */
        div   = document.createElement('div'),   /* Wrapper forms */
        iframe = document.createElement('iframe'),   /* Wrapper forms */
        form  = document.createElement('form'),   /* forms */
        file  = document.createElement('input'),   /* Create Input File */
        hidd  = document.createElement('input'),   /* Create Input File */
        text  = document.createElement('p'),   /* Create P tagNode */
        msg   = document.createElement('p'),   /* Create P tagNode */        
        a     = document.createElement('a');


    var imageInput = {

        /*  Default options  */
        init : function() {

            /*  Node File Attributes */
            file.setAttribute('type', 'file');
            file.setAttribute('name', 'file');
            hidd.setAttribute('type', 'hidden');

            /* Node form Attributes */
            form.setAttribute('enctype', 'multipart/form-data');
            form.setAttribute('action', imageInput.options['php_path']);
            form.setAttribute('method', 'post');
            
            /* Asign ClassName */             
            file.className   = 'input-file';
            hidd.className   = 'img-hidden';
            text.className   = 'text-upload';
            msg.className    = 'msgError';
            iframe.className = 'iframe-upload';        

            /* Div wrapper for form and iframe */
            var resp    = div.cloneNode(true);
                resp.id = 'resAJAXimage';
                document.body.appendChild(resp);

            var contIframe = document.getElementById('resAJAXimage');

            /* Insert Blocks to father */
            for (var i = 0, len = input.length; i < len; i++ ) {
                
                son[i]    = document.createElement('div');
                son[i].id = 'upload_' + i;
                son[i].className ='upload-item';

                /* Insert sons(div) */
                son[i].appendChild( imageInput.addBlock( input[i], i ) );
                son[i].appendChild( msg.cloneNode(true) );

                /* Call inserAfter */
                imageInput.insertAfter(input[i], son[i]);

                /* Insert form/iframe to div#resAJAXimage */
                iframes[i]    = div.cloneNode(true);
                iframes[i].id = 'frame-' + i;
                iframes[i].className = 'cont-form';

                /* Insert Iframe */
                iframes[i].appendChild( imageInput.addForm( input[i], i ) );
                iframes[i].appendChild( imageInput.addIframe( i ) );
                contIframe.appendChild(iframes[i]);
            }

            /*  
              Events into Block
              @click
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

                    frame.setAttribute('onLoad', 'callbackInput(this);');
                    this.form.submit();
                }
            };   //*/        
        },   // --> end method init


        /*  Default options  */
        options : {
            upload_msg : 'Click to Upload',
            img_width  : 180,
            img_height : 180,            
            img_filename   : "auto",
            img_path   : "www/public",
            img_rule   : "free",
            img_format : "jpg,png,gif",
            img_class  : "",
            input_name : "",
            thumbnail_height : "",
            preview_height   : 180,
            php_path   : 'imageinput.php'
        },   // --> end method options


        /* Validador de atributos */
        validator : function( node, attr ) {

            var pass, result;

            function check(def) {
                var output;
                var validator = node.getAttribute(attr);

                if ( validator !== null && validator !== '' ) {
                    output = validator;
                    pass   = true;
                    return output;
                } else {
                    return imageInput.options[def];
                }
            }           

            switch (attr) {
                case 'data-height':
                    result = parseInt( check('img_height') );                

                    if ( pass === true ) {
                        var value = ( isNaN(result) ) ? imageInput.options['img_height'] : result;
                        return value;
                    } else
                        return result;

                break;

                case 'data-width':
                    result = parseInt( check('img_width') );

                    if ( pass === true ) {
                        var value = ( isNaN(result) ) ? imageInput.options['img_width'] : result;
                        return value;
                    } else
                        return result;
                    
                break;

                case 'data-thumbnail-height':
                    result = parseInt( check('thumbnail_height') );                

                    if ( pass === true ) {
                        var value = ( isNaN(result) ) ? imageInput.options['thumbnail_height'] : result;
                        return value;
                    } else {
                        return '';
                    }
                break;

                case 'data-preview-height':
                    result = parseInt( check('preview_height') );                

                    if ( pass === true ) {
                        var value = ( isNaN(result) ) ? imageInput.options['preview_height'] : result;
                        return value;
                    } else {
                        return result;
                    }
                break;

                case 'data-path':
                    return check('img_path');
                break;

                case 'data-filename':
                    return check('img_filename');
                break;

                case 'data-sizerule':
                    result = check('img_rule');
                    if ( pass === true ) {
                        var value = result === 'strict' ? 'strict' :
                                    result === 'proportion' ? 'proportion' :
                                    result === 'free' ? 'free' :
                                    result === 'fit' ? 'fit' :
                                    result === 'overflow' ? 'overflow' :
                                    result === 'crop' ? 'crop' :
                                    imageInput.options['img_rule'];
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
                                    imageInput.options['img_format'];
                        return value;
                    } else
                        return imageInput.options['img_format'];

                break;

                case 'data-text':
                    return check('upload_msg');
                break;

                case 'data-name':
                    return check('input_name');
                break;

                case 'data-class':
                    return check('img_class');
                break;
            }
        },   // --> end method validator


        /* Constructor Blocks */
        addBlock : function ( node, id ) {

            var width  = imageInput.validator(node, 'data-width'),
                height = imageInput.validator(node, 'data-height'),
                texto  = imageInput.validator(node, 'data-text'),
                size   = imageInput.validator(node, 'data-sizerule'),
                name   = imageInput.validator(node, 'data-name'),
                Class  = imageInput.validator(node, 'data-class');

            /* Create Block */
            if ( name !== '' )
                text.innerHTML = '<span>'+ width +' x '+ height +'</span> <br> <cite>'+ texto +'</cite>';
            else
                text.innerHTML = '<cite> "data-name" is undefined </cite>';


            a.style.width  = width +'px';
            a.style.height = height +'px';
            a.style.lineHeight = height +'px';
            a.setAttribute('data-target', 'frame-'+id);
            a.setAttribute('data-size', size);
            hidd.setAttribute('name', name);
            a.className    = 'link-upload '+Class;
            a.appendChild(text);
            a.appendChild(hidd);
            
            /* return node */
            return a.cloneNode(true);
        },   // --> end method addBlock


        /* Constructor Forms */
        addForm : function ( node, id ) {

            var format = imageInput.validator(node, 'data-formats'),
                frag = '<input type="hidden" name="width" value="'+ imageInput.validator(node, 'data-width') +'">\
                        <input type="hidden" name="height" value="'+ imageInput.validator(node, 'data-height') +'">\
                        <input type="hidden" name="thumbnail-height" value="'+ imageInput.validator(node, 'data-thumbnail-height')  +'">\
                        <input type="hidden" name="preview-height" value="'+ imageInput.validator(node, 'data-preview-height') +'">\
                        <input type="hidden" name="path" value="'+ imageInput.validator(node, 'data-path') +'">\
                        <input type="hidden" name="formats" value="'+ format +'">\
                        <input type="hidden" name="filename" value="'+ imageInput.validator(node, 'data-filename') +'">\
                        <input type="hidden" name="sizerule" value="'+ imageInput.validator(node, 'data-sizerule') +'">';


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
        },   // --> end method addForm


        /* Constructor Iframe */
        addIframe : function ( id ) {
            iframe.setAttribute('name', 'iframe_upload_'+id );
            iframe.setAttribute('data-callback', 'upload_'+id );
            iframe.id = 'iframe_upload_'+id;

            /* return node */
            return iframe.cloneNode(true);
        },   // --> end method addIframe


        /*  Insert the new block After every ".imageinput" */
        insertAfter : function ( referenceNode, newNode ) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },


        /* Check image file extension */
        checkFileImage : function () {
            
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
        }   // --> end method checkFileImage
        
    };

    imageInput.init();

})();

/* Callback data from server */
function callbackInput ( id ) {
    
    var responseText;   // response data from server

    /* validate content Iframe methods */
    if ( id.contentWindow ) {
        responseText = id.contentWindow.document.body ? JSON.parse(id.contentWindow.document.body.innerHTML) : null;
         
    } else if ( id.contentDocument ) {
        responseText = id.contentDocument.document.body ? JSON.parse(id.contentDocument.document.body.innerHTML) : null;       
    }   

    var blockId = id.getAttribute('data-callback'),
        block   = document.getElementById(blockId).querySelector(".link-upload"),
        blockParent = document.getElementById(blockId);            

    var p   = blockParent.querySelector('.msgError');       
    var delImg = block.querySelector('.img-preview');
    var input = block.querySelector('.img-hidden');

    if ( delImg !== null )
        delImg.parentNode.removeChild(delImg);


    if ( responseText.status === 'success' ) {
        p.style.display = 'none';
        block.firstChild.style.display = "none";
        input.setAttribute('value', responseText.file_rel);

        var img  = document.createElement('img');
            img.className = 'img-preview';
            img.src = responseText.file;
            img.style.display = 'inline';
        
        block.appendChild(img);            

    } else {        
        block.firstChild.style.display = "block";

        p.innerHTML = responseText.msg;
        p.style.display = 'block';
    }        
}   // --> end method callbackData