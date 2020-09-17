 
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
                var message = jQuery('[name=message]');  
         socket.emit('creatMessage' , {
             from: 'User' , 
             text: message.val()
         } , function(){
            jQuery('[name=message]').val('')
        })
     })
  

     
var loactionButton = jQuery('#send-location');
loactionButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }


     
    loactionButton.attr('disabled', 'disabled').text('Sending Location ...')
    navigator.geolocation.getCurrentPosition(function(position){
        loactionButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        loactionButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location')
    });
})


socket.on('newLocationMessage' , function(message){
    var li =jQuery('<li></li>')
    var a =jQuery('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}: `)
    a.attr('href' , message.url);
    li.append(a);
    jQuery('#messages').append(li)
})