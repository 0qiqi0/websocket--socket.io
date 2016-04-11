/**
 * Created by dell on 2016/4/11.
 */
//要显示express，所以要借助express
//socket.io是一个websocket的库，包括了客户端的js和服务器端的
//node.js，具有自适应性，可以实现优雅降级。永不了就用http
var express=require('express');
var app=express();
var path=require('path');
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});

var server=require('http').createServer(app);
//websocket握手需借助http
var io = require('socket.io')(server);
io.on('connection',function(socket){
//socket代表与某个客户端的连接对象
    socket.on('message',function(msg){
        console.log(msg)
        socket.send('server:'+msg)
    })
});
server.listen(80);