/**
 * Created by dell on 2016/4/11.
 */
//要显示express，所以要借助express
//socket.io是一个websocket的库，包括了客户端的js和服务器端的
//node.js，具有自适应性，可以实现优雅降级。永不了就用http
var express=require('express');
var app=express();
var path=require('path');
app.use(express.static(__dirname));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});

var server=require('http').createServer(app);
//websocket握手需借助http
var io = require('socket.io')(server);
var clients={};
io.on('connection',function(socket){
    var username;
    socket.send({user:'系统',content:'请输入用户名'});
//socket代表与某个客户端的连接对象
    //clients.push(socket);
    socket.on('message',function(msg){
        var result=msg.match(/^@(.+)\s(.+)$/); ///s是空格之类的
        if(result){
            console.log(result[0],result[1])
            var toUser=result[1];
            var content=result[2];//第0个是匹配到的字符串，第1个是第一个分组
            if(clients[toUser]){
                clients[toUser].send({user:username,content:'[私聊]'+content});
            }else{
                socket.send({user:'系统',content:'你想私聊的人不在线'});
            }
        }else{
            if(username){
                for(var s in clients){
                    clients[s].send({user:username,content:msg});
                }
            }else{
                username=msg;
                clients[username]=socket;
                socket.send({user:'系统',content:'你的用户名已改为:'+username});
            }
        }
    })
});
server.listen(80);