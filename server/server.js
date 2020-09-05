const path =require('path')
const express =require('express')
const socketIO=require('socket.io')
const http=require('http')
const { Socket } = require('dgram')



const publicPath = path.join(__dirname ,'../public' )  
const port =process.env.PORT || 3000;

var app=express();
var server = http.createServer(app)
var io= socketIO(server)

io.on('connection' , (Socket)=>{
    console.log('New User Connection!')


    Socket.on('disconeconnect' ,() =>{
        console.log("User Was Disconnect!")
    })
})

app.use(express.static(publicPath))



server.listen(port , () =>{
    console.log(`server is up on ${port}`)
})