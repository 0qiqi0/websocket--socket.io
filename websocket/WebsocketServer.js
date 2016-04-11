/**
 * Created by dell on 2016/4/11.
 */
var server=require('ws').Server;
var wss=new server({
    port:8080
});
//服务器具备的条件：1在特定的IP和端口上监听客户端的请求
//2能够根据客户端的请求进行响应

wss.on('connection',function(ws){
    ws.on('message',function(message){
        console.log('服务器收到:%s',message);
        ws.send('服务器回复：'+message)
    })
})