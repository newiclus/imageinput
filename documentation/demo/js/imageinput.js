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

    /* Default options  */
    var defaults = {
        image_dir  : 'www/public',   // absolute path to the directory
        upload_msg : 'Click to Upload',
        img_width  : '300',
        img_height : '180',
        thumbnail_height : "100",
        preview_height   : "150",
        img_name   : "auto",
        img_path   : "/",
        img_rule   : "strict",
        img_format : "all"
    };
    
    /* 
      Variables
    */    
    var input   = document.getElementsByClassName('imageinput'),   /* Filter Inputs */    
        content = input[0].parentNode,   /* Search node father (DOM) */
        frag    = document.createDocumentFragment(),   /* HTML Constructor Wrap */    
        father  = document.createElement('dl'),   // Wrapper Blocks
        son     = [],   /* Array input Upload */

        /*  TagNode   */
        file = document.createElement('input'),   /* Create Input File */
        text = document.createElement('p'),   /* Create P tagNode */ 
        a    = document.createElement('a');


    /*  Wrapp ID */
    father.id = 'cont-imageUpload';        
    
    /*  Node File Attributes */
    file.setAttribute('type', 'file');
    file.setAttribute('name', 'imagefile');        
    file.setAttribute('enctype', 'multipart/form-data');
    
    /* Asign ClassName */
    a.className = 'link-upload'; 
    

    /* Constructor Blocks */
    function addBlock( attr ) {

        file.setAttribute('accept', 'image/jpeg,image/png,image/jpg,image/gif');

        text.innerHTML = attr.getAttribute('data-width') +' x '+ attr.getAttribute('data-height') +' <br> <cite>Click to Upload</cite>';

        a.style.width  = attr.getAttribute('data-width') +'px';
        a.style.height = attr.getAttribute('data-height') +'px';
        a.appendChild(file);
        a.appendChild(text);

        return a.cloneNode(true);
    }


    /* Insert Blocks to father */
    for (var i = 0, len = input.length; i < len; i++ ) {
        
        son[i] = document.createElement('dd');
        son[i].id ='upload_' + i;
        son[i].className ='upload-item';

        /* Insert to sons(DD) */
        son[i].appendChild( addBlock( input[i] ) );

        /* Insert to Father(DL) */
        father.appendChild(son[i]);
    } 

    /* Insert to Fragment */
    frag.appendChild(father);
    

    /* Insert Node father (DOM) */
    content.appendChild(frag);


    /*  Event Click  into Block  */
    var block = document.getElementsByClassName('link-upload');

    for ( var i = 0, len = block.length; i < len; i++ ) { 

        block[i].onclick = function() {
            console.log(this);
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
        callback()
    }, false )
}

onReady();