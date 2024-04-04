
        var files       = {};
        files.read      = filename=>localStorage[filename];
        files.clear     = ()=>localStorage.clear();
        files.list      = ()=>{for(var key in {...localStorage})console.log(key)};
        
        
        //files.clear();
        files.list();
        
        
        var input               = document.createElement('input');
        input.value             = 'select files';
        input.type              = 'button';
        input.onclick           = onclick;
        input.style.display     = 'block';
        input.style.margin      = '25px';
        document.body.append(input);
        
        function onclick(e){
        
              var input         = document.createElement('input');
              input.type        = 'file';
              input.multiple    = true;
              input.onchange    = onchange;
              input.click();
              
              function onchange(e){
              
                    [...input.files].forEach(async file=>{
                    
                          var url                   = await datauri(file);
                          localStorage[file.name]   = url;
                          
                    });
                    
              }//onchange
              
        }//onclick
        
        async function datauri(file){
        
              var i       = file.name.lastIndexOf('.');
              var ext     = file.name.slice(i);
              var mime    = 'image/'+ext;
              
              var buf     = await file.arrayBuffer();
              var bytes   = new Uint8Array(buf);
              var binary  = '';
              var len     = bytes.byteLength;
              for(var i=0;i<len;i++){
              
                    binary   += String.fromCharCode(bytes[i]);
                    
              }//for
              var b64       = window.btoa( binary );
              
              var datauri   = 'data:'+mime+';base64,'+b64;
              return datauri;
              
        }//datauri







