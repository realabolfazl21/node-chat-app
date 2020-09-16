 
       var socket =io();

       socket.on('connect' ,function() {
           console.log('Connected to server');
           
    //    socket.emit('creteMessage' ,{
    //        from: "Abolfazl" , 
    //        text: "Hey, This is work" 
    //    })



       })
     socket.on("disconnect" , function(){
         console.log("Disconnecte from server")
     })
  

     socket.on('newMessage' , function(message){
         console.log('New Message' ,message)

   
         var li=jQuery('<li></li>')
         li.text(`${message.from} : ${message.text}`)
              
         jQuery('#messages').append(li)
     })
   
      
     jQuery('#message-from').on('submit' , function(e){
         e.preventDefault();
                
         socket.emit('creatMessage' , {
             from: 'User' , 
             text: jQuery('[name=message]').val()
         })
     })
  