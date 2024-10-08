const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const socketio=require('socket.io');
const { log } = require('console');
const port=3000;
const server=http.createServer(app);
const io=socketio(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket){
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data});
    });
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    })
})

app.get("/",(req,res)=>{
    res.render('index');
});

server.listen(process.env.PORT||port,()=>{
    console.log(`Server listening on http://localhost:${process.env.PORT||port}`);
})