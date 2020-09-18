 
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
      

     socket.on('newMessage', function(message){
        var formatedTime = moment(message.createdAt).format('hh:mm a')
        var template = jQuery('#message-template').html()  
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formatedTime
        })
       
         jQuery('#messages').append(html)
     })
   
      
     jQuery('#message-from').on('submit' , function(e){
         e.preventDefault();
         var message = jQuery('[name=message]');  
         socket.emit('creatMessage' , {
             from: 'User' , 
             text: message.val()
         } , function(){
           message.val('')
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
    var formatedTime = moment(message.createdAt).format('hh:mm a')


    var template = jQuery('#location-message-template').html()  
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    })

    jQuery('#messages').append(html)
})
