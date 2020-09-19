const path =require('path')
const express =require('express')
const socketIO=require('socket.io')
const http=require('http')
var {generateMessage , generateLocationMessage} =require('./utils/message')
var {isRealString} =require('./utils/validation')
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
    


socket.on('join' ,(params,callback)=>{
if(!isRealString(params.name) || !isRealString(params.room)){
    callback('نام خود و اتاق مورد نظر را وارد کنید ')

} 
socket.join(params.room)
socket.emit('newMessage' ,generateMessage('Admin', 'welcome to chat app'))
socket.broadcast.to(params.room).emit('newMessage' , generateMessage('Admin' , `${params.name} has joined`))

callback();
})


socket.on('creatMessage', (message , callback) =>{
    console.log('creatMessage' , message)
    io.emit('newMessage' ,generateMessage(message.from , message.text));
    callback();
})
socket.on('createLocationMessage' ,(coords) =>{
    io.emit('newLocationMessage' , generateLocationMessage('Admin' , coords.latitude ,coords.longitude))
})
    socket.on('disconeconnect' ,() =>{
        console.log("User Was Disconnect!")
    })
})

app.use(express.static(publicPath))



server.listen(port , () =>{
    console.log(`server is up on ${port}`)
})

