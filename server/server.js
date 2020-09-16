const path =require('path')
const express =require('express')
const socketIO=require('socket.io')
const http=require('http')
var {generateMessage} =require('./utils/message')

// const { socket } = require('dgram')
// const { text } = require('express')


 
const publicPath = path.join(__dirname ,'../public' )  
const port =process.env.PORT || 3000;


var app=express();
var server = http.createServer(app)
var io= socketIO(server)


//brodcasting event


io.on('connection' , (socket)=>{
    console.log('New User Connection!')
    

socket.emit('newMessage' ,generateMessage('Admin', 'welcome to chat app'))

socket.broadcast.emit('newMessage' , generateMessage('Admin' , 'New User Joined'))


socket.on('creatMessage', (message) =>{
    console.log('creatMessage' , message)
    io.emit('newMessage' ,generateMessage(message.from , message.text));
        




// socket.broadcast.emit('newMessage' ,{
//     from: message.from , 
//     text:message.text , 
//     createAt: new Date().getTime()
// })
})

    socket.on('disconeconnect' ,() =>{
        console.log("User Was Disconnect!")
    })
})

app.use(express.static(publicPath))



server.listen(port , () =>{
    console.log(`server is up on ${port}`)
})

